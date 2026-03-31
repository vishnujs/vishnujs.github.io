const fs = require("fs");
const https = require("https");
require("dotenv").config();

// Prefer a non-CRA-prefixed env var for secrets.
// Keep backward compatibility for existing setups.
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || process.env.REACT_APP_GITHUB_TOKEN;
const GITHUB_USERNAME = process.env.GITHUB_USERNAME;
const USE_GITHUB_DATA = (process.env.USE_GITHUB_DATA || "false").toLowerCase();
const MEDIUM_USERNAME = process.env.MEDIUM_USERNAME;

const ERR = {
  noUserName:
    "Github Username was found to be undefined. Please set all relevant environment variables.",
  requestFailed:
    "The request to GitHub didn't succeed. Check if GitHub token in your .env file is correct.",
  requestFailedMedium:
    "The request to Medium didn't succeed. Check if Medium username in your .env file is correct."
};
if (USE_GITHUB_DATA === "true") {
  if (GITHUB_USERNAME === undefined) {
    throw new Error(ERR.noUserName);
  }
  if (!GITHUB_TOKEN) {
    throw new Error(
      "GitHub token was found to be undefined. Please set GITHUB_TOKEN in your .env file."
    );
  }

  if (process.env.REACT_APP_GITHUB_TOKEN && !process.env.GITHUB_TOKEN) {
    console.warn(
      "DEPRECATION: REACT_APP_GITHUB_TOKEN is used by fetch.js for backward compatibility. Please migrate to GITHUB_TOKEN."
    );
  }

  console.log(`Fetching profile data for ${GITHUB_USERNAME}`);
  const query = `
query ($login: String!) {
  user(login: $login) {
    name
    bio
    avatarUrl
    location
    pinnedItems(first: 6, types: [REPOSITORY]) {
      totalCount
      edges {
          node {
            ... on Repository {
              name
              description
              forkCount
              stargazers {
                totalCount
              }
              url
              id
              diskUsage
              primaryLanguage {
                name
                color
              }
            }
          }
        }
      }
    }
  }
}
`;

  const data = JSON.stringify({
    query,
    variables: {login: GITHUB_USERNAME}
  });
  const default_options = {
    hostname: "api.github.com",
    path: "/graphql",
    port: 443,
    method: "POST",
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      "User-Agent": "Node"
    }
  };

  const req = https.request(default_options, res => {
    let responseBody = "";

    console.log(`statusCode: ${res.statusCode}`);
    if (res.statusCode !== 200) {
      console.error(`${ERR.requestFailed} (HTTP ${res.statusCode})`);
      process.exitCode = 1;
      res.resume();
      return;
    }

    res.on("data", d => {
      responseBody += d;
    });
    res.on("end", () => {
      fs.writeFile("./public/profile.json", responseBody, function (err) {
        if (err) return console.log(err);
        console.log("saved file to public/profile.json");
      });
    });
  });

  req.on("error", error => {
    throw error;
  });

  req.write(data);
  req.end();
}

// if (MEDIUM_USERNAME !== undefined) {
//   console.log(`Fetching Medium blogs data for ${MEDIUM_USERNAME}`);
//   const options = {
//     hostname: "api.rss2json.com",
//     path: `/v1/api.json?rss_url=https://medium.com/feed/@${MEDIUM_USERNAME}`,
//     port: 443,
//     method: "GET"
//   };

//   const req = https.request(options, res => {
//     let mediumData = "";

//     console.log(`statusCode: ${res.statusCode}`);
//     if (res.statusCode !== 200) {
//       throw new Error(ERR.requestMediumFailed);
//     }

//     res.on("data", d => {
//       mediumData += d;
//     });
//     res.on("end", () => {
//       fs.writeFile("./public/blogs.json", mediumData, function (err) {
//         if (err) return console.log(err);
//         console.log("saved file to public/blogs.json");
//       });
//     });
//   });

//   req.on("error", error => {
//     throw error;
//   });

//   req.end();
// }
