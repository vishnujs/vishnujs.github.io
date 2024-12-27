/* Change this file to get your personal Portfolio */

// To change portfolio colors globally go to the  _globalColor.scss file

import emoji from "react-easy-emoji";
import splashAnimation from "./assets/lottie/splashAnimation"; // Rename to your file name for custom animation

// Splash Screen

const splashScreen = {
  enabled: true, // set false to disable splash screen
  animation: splashAnimation,
  duration: 2000 // Set animation duration as per your animation
};

// Summary And Greeting Section

const illustration = {
  animated: true // Set to false to use static SVG
};

const greeting = {
  username: "Vishnu Jalajakshannair Syamalathakumaridevi",
  title: "Hi all, I'm Vishnu",
  subTitle: emoji(
    "A passionate Full Stack Software Developer 🚀 having an experience of building Web and Mobile applications with Java / Springboot / Scala / Python / Reactjs / Nodejs / Angularjs and some other cool libraries and frameworks."
  ),
  resumeLink:
    "https://drive.google.com/file/d/1EJjBauJk21mwCC95ZKBbqyk1nFAJRTJs/view?usp=sharing", // Set to empty to hide the button
  displayGreeting: true // Set false to hide this section, defaults to true
};

// Social Media Links

const socialMediaLinks = {
  github: "https://github.com/vishnujs",
  linkedin: "https://www.linkedin.com/in/vishnu-j-s/",
  gmail: "jsvishnujs@gmail.com",
  // gitlab: "https://gitlab.com/saadpasta",
  facebook: "https://www.facebook.com/jsvishnujs",
  // medium: "https://medium.com/@saadpasta",
  stackoverflow: "https://stackoverflow.com/users/10422806/saad-pasta",
  // Instagram, Twitter and Kaggle are also supported in the links!
  // To customize icons and social links, tweak src/components/SocialMedia
  display: true // Set true to display this section, defaults to false
};

// Skills Section

const skillsSection = {
  title: "What I do",
  subTitle: "ENTHUSIASTIC FULL STACK DEVELOPER WHO WANTS TO EXPLORE EVERY TECH STACK",
  skills: [
    emoji(
      "⚡ Develop highly interactive Back end / Front end user interfaces for your highly scalable and performant applications"
    ),
    emoji("⚡ Develop highly efficient and scalable backend microservices"),
    emoji(
      "⚡ Integration of third party services such as AWS / GCP / Azure"
    )
  ],

  /* Make Sure to include correct Font Awesome Classname to view your icon
https://fontawesome.com/icons?d=gallery */

  softwareSkills: [
    {
      skillName: "Java",
      fontAwesomeClassname: "fa-brands fa-java"
    },
    {
      skillName: "Springboot",
      fontAwesomeClassname: "fa-solid fa-leaf"
    },
    {
      skillName: "sass",
      fontAwesomeClassname: "fab fa-sass"
    },
    {
      skillName: "JavaScript",
      fontAwesomeClassname: "fab fa-js"
    },
    {
      skillName: "reactjs",
      fontAwesomeClassname: "fab fa-react"
    },
    {
      skillName: "nodejs",
      fontAwesomeClassname: "fab fa-node"
    },
    {
      skillName: "swift",
      fontAwesomeClassname: "fab fa-swift"
    },
    {
      skillName: "npm",
      fontAwesomeClassname: "fab fa-npm"
    },
    {
      skillName: "sql-database",
      fontAwesomeClassname: "fas fa-database"
    },
    {
      skillName: "aws",
      fontAwesomeClassname: "fab fa-aws"
    },
    {
      skillName: "python",
      fontAwesomeClassname: "fab fa-python"
    },
    {
      skillName: "docker",
      fontAwesomeClassname: "fab fa-docker"
    },

  ],
  display: true // Set false to hide this section, defaults to true
};

// Education Section

const educationInfo = {
  display: true, // Set false to hide this section, defaults to true
  schools: [
    {
      schoolName: "ABJ Abdul Abdul Kalam Technological University",
      logo: require("./assets/images/ktuLogo.png"),
      subHeader: "Master of Science in Computer Science",
      duration: "June 2015 - June 2017",
      desc: "Completed advanced coursework in computer science, strengthening expertise in core and emerging technologies",
      descBullets: [
        "Specialized in Natural Language Processing (NLP) and Machine Learning (ML)",
        "Thesis: \"Sentiment Analysis on Social Media Tweets Using NLP Techniques\"",
        "Developed and implemented advanced ML algorithms for analyzing tweet sentiments",
        "Gained in-depth knowledge of text preprocessing, feature extraction, and classification methods in NLP",
        "Demonstrated proficiency in applying theoretical concepts to real-world data analysis challenges",
        "This educational experience has significantly enhanced my understanding of complex computer science concepts and provided hands-on experience with cutting-edge NLP and ML technologies, directly applicable to modern software engineering challenges."
      ]
    }/* ,
    {
      schoolName: "Stanford University",
      logo: require("./assets/images/stanfordLogo.png"),
      subHeader: "Bachelor of Science in Computer Science",
      duration: "September 2013 - April 2017",
      desc: "Ranked top 10% in the program. Took courses about Software Engineering, Web Security, Operating Systems, ...",
      descBullets: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit"]
    } */
  ]
};

// Your top 3 proficient stacks/tech experience

const techStack = {
  viewSkillBars: true, //Set it to true to show Proficiency Section
  experience: [
    {
      Stack: "Backend", //Insert stack or technology you have experience in
      progressPercentage: "90%" //Insert relative proficiency in percentage
    },
    {
      Stack: "FrontEnd",
      progressPercentage: "70%"
    },
    {
      Stack: "Java",
      progressPercentage: "90%"
    }
  ],
  displayCodersrank: false // Set true to display codersrank badges section need to changes your username in src/containers/skillProgress/skillProgress.js:17:62, defaults to false
};

// Work experience section

const workExperiences = {
  display: true, //Set it to true to show workExperiences Section
  experience: [
    {
      role: "Java Developer 3",
      company: "Comcast(Contractor)",
      companylogo: require("./assets/images/ComcatsLogo.png"),
      date: "December 2022 – September 2024",
      desc: "",
      descBullets: [
        "Architected and led implementation of mission-critical Payment and Billing systems, driving \$100M annual revenue through high-volume solutions processing 39 billion transactions monthly",
        "Contributed to the entire software development lifecycle, from requirements gathering to maintenance.",
        "Successfully migrated 10+ microservices that was using RabbitMQ for interservice communication to amazon SQS",
        "Successfully migrated 10+ microservices to enable SSL for tools like Kafka, Elasticsearch to upgrade the security.",
        "Introduced new processes to enhance team efficiency and make more process oriented that handles an overwhelming 30+ microservices with just 5-member developer team which dramatically increase team morale and efficiency to 70%.",
        "Designed, Developed and deployed in production the Oracle SQL ETL package that can run daily, weekly and monthly to aggregate millions of records, along with a spring boot application for exposing APIs to expose this aggregated data and pushes the monthly aggregated data to kinesis to expose to external team for analysis and do analytics on the resultant data.",
        "Lead different patching and upgradation activities successfully with minimal downtime.",
        "Designed and developed python application that shows dashboard metrics by connecting with Elasticsearch server and analysing the logs.",
        "Developed and maintained scala applications that can be deployed in Kubernetes environments for data loading applications to MinioDB which is capable of handling billions of data",
        "Maintained scala application that integrates with spark jobs for processing and loading data from kinesis streams",
        "Migrating the scala application to Cloud services, had challenges with huge data that required extensive memory. This was fixed by analysing the performance of the application and based on the deductions by analysing the heap memory successfully upgraded to a highly memory conservative multi-threaded application.",
      ] 
    },
    {
      role: "Full Stack Software Engineer",
      company: "SSTech",
      companylogo: require("./assets/images/ssticon.PNG"),
      date: "March 2022 – Present",
      desc: "",
      descBullets:[
        "Designed and developed RESTful web services using JSON representation.",
        "Utilized HTML/HTML5, CSS/CSS3, and Angular for web page development and debugging.",
        "Coded business components using Java features like multithreading, exception handling, collections, generics, JDBC, lambda, and streams.",
        "Implemented a CRM solution, incorporating features and maintenance.",
        "Utilized Log4j for logging and Splunk for issue monitoring."
      ]
    },
    {
      role: "Senior Software Application Engineer",
      company: "Oracle",
      companylogo: require("./assets/images/Oracle-Logo.png"),
      date: "September 2021 – March 2022",
      desc: "",
      descBullets:[
        "Leveraged Spring IOC, AOP, MVC, and Boot for application development",
        "Utilized Kafka for asynchronous communication and integration of services",
        "Worked on object storage features for data storage and retrieval in OCI",
        "Deployed and tested applications in Docker and Kubernetes environments",
        "Designed and developed microservices using Spring Boot and RESTful APIs",
        "Implemented continuous integration and deployment using Jenkins and AWS",
        "Employed Log4j for logging and Splunk for monitoring",
        "Used Grafana for system log monitoring and pipeline management",
        "Utilized GitHub for build automation",
        "Proficient in Linux-based commands and shell scripting"
      ]
    },
    {
      role: "Full-stack Engineer",
      company: "QBurst",
      companylogo: require("./assets/images/QBurstLogo.png"),
      date: "April 2021 – August 2021",
      desc: "",
      descBullets:[
        "Implemented multithreading and concurrency for tasks like email generation",
        "Developed the persistence layer using Hibernate",
        "Utilized microservices to modernize a monolithic application",
        "Consumed and tested RESTful services using tools like Postman and Ready API",
        "Implemented data access layers using frameworks like Spring Data JPA, MongoDB, JDBC, ORM, and Hibernate",
        "Employed JMS and Kafka for asynchronous messaging",
        "Implemented continuous integration and deployment using AWS",
        "Worked with container-based technologies like Docker, Kubernetes, and OpenShift",
        "Utilized Elasticsearch and Kibana for log analysis",
        "Developed database objects like stored procedures, triggers, and sequences",
        "Provided production support and used AWS CloudWatch",
        "Wrote unit and integration tests using JUnit and Mockito"
      ]
    },
    {
      role: "Software Engineer",
      company: "Suntec Business Solutions",
      companylogo: require("./assets/images/SuntecLogo.png"),
      date: "August 2017 – April 2021",
      desc: "",
      descBullets:[
        "Worked on high-level and low-level system design, planning, estimation, implementation and testing and worked from scratch of billing product to delivery",
        "Created the Class diagrams, Flow diagrams, while using the UML to capture internal architectural diagrams as part of creating documentation",
        "Designed and developed business components using Spring Boot, Spring Dependency Injection (Core), Spring AOP and Spring Annotations using Java 8 including features like lambda, streams, multi-threading etc",
        "Used Spring Boot which is radically faster in building cloud Micro services and developing Spring based applications with very less configuration",
        "Implemented Java and J2EE Design patterns like Business Delegate and Data Transfer Object (DTO), Data Access Object and Service Locator",
        "Used Apache Kafka as the messaging infrastructure for asynchronous processing",
        "Designed and developed complex SQL queries, NoSQL and graph queries using MySQL, MSSQL, MongoDB and Neo4j",
        "Developed RESTful API's, which takes in an HTTP request and produces the HTTP response in JSON Format using micro services",
        "Integrated Spark for aggregation operations",
        "Implemented data ingestion and handling clusters in real time processing using Kafka",
        "Worked on creating the Docker containers and Docker consoles for managing the application life cycle",
        "Experience in Continuous Integration and automated build/deploy using Jenkins",
        "Involved in unit testing and system testing and responsible for preparing test scripts for the system testing",
        "Involves in Sprint planning for the estimation of efforts for user stories and bugs",
        "Worked with UI team for integration and maintenance activities on creating a platform based on Angular",
        "Worked with an internal team to create a chatbot by parsing internal documents and make a model using google-bert that model and data was persisted in the Hadoop cluster",
      ]
    }
  ]
};

/* Your Open Source Section to View Your Github Pinned Projects
To know how to get github key look at readme.md */

const openSource = {
  showGithubProfile: "false", // Set true or false to show Contact profile using Github, defaults to true
  display: false // Set false to hide this section, defaults to true
};

// Some big projects you have worked on

const bigProjects = {
  title: "Big Projects",
  subtitle: "SOME STARTUPS AND COMPANIES THAT I HELPED TO CREATE THEIR TECH",
  projects: [
    {
      image: require("./assets/images/saayaHealthLogo.webp"),
      projectName: "Saayahealth",
      projectDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      footerLink: [
        {
          name: "Visit Website",
          url: "http://saayahealth.com/"
        }
        //  you can add extra buttons here.
      ]
    },
    {
      image: require("./assets/images/nextuLogo.webp"),
      projectName: "Nextu",
      projectDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      footerLink: [
        {
          name: "Visit Website",
          url: "http://nextu.se/"
        }
      ]
    }
  ],
  display: false // Set false to hide this section, defaults to true
};

// Achievement Section
// Include certificates, talks etc

const achievementSection = {
  title: emoji("Achievements And Certifications 🏆 "),
  subtitle:
    "Achievements, Certifications, Award Letters and Some Cool Stuff that I have done !",

  achievementsCards: [
    {
      title: "Software Architecture Case Studies",
      subtitle:
        "",
      image: require("./assets/images/Udemy-Logo.png"),
      imageAlt: "Google Code-In Logo",
      footerLink: [
        {
          name: "Certification",
          url: "https://drive.google.com/file/d/1-m90t3L7Gj9GcMlUp__8LtdDl-CGpP3d/view?usp=sharing"
        }
      ]
    },
    {
      title: "Learning Spring with Spring Boot",
      subtitle:
        "Completed certification from Linkedin Learning Spring with Spring Boot.",
      image: require("./assets/images/LinkedInLogo.png"),
      imageAlt: "LinkedIn Logo",
      footerLink: [
        {
          name: "Learning Spring with Spring Boot",
          url: "https://www.linkedin.com/learning/certificates/4a9a895d47f5c7eb56614218af53d02ef353ad0a9ac544f78918247b94e1b136?trk=backfilled_certificate"
        }
      ]
    },

    {
      title: "AWS Cloud Practitioner Essentials",
      subtitle: "Completed Certifcation from AWS Cloud Practitioner Essentials",
      image: require("./assets/images/awsLogo.png"),
      imageAlt: "PWA Logo",
      footerLink: [
        {
          name: "Certification",
          url: "https://www.aws.training/Transcript/CompletionCertificateHtml?transcriptid=jSaT-mIcaEmZmQN4cO8F4g2"
        }
      ]
    }
  ],
  display: true // Set false to hide this section, defaults to true
};

// Blogs Section

const blogSection = {
  title: "Blogs",
  subtitle:
    "With Love for Developing cool stuff, I love to write and teach others what I have learnt.",
  displayMediumBlogs: "true", // Set true to display fetched medium blogs instead of hardcoded ones
  blogs: [
    {
      url: "https://blog.usejournal.com/create-a-google-assistant-action-and-win-a-google-t-shirt-and-cloud-credits-4a8d86d76eae",
      title: "Win a Google Assistant Tshirt and $200 in Google Cloud Credits",
      description:
        "Do you want to win $200 and Google Assistant Tshirt by creating a Google Assistant Action in less then 30 min?"
    },
    {
      url: "https://medium.com/@saadpasta/why-react-is-the-best-5a97563f423e",
      title: "Why REACT is The Best?",
      description:
        "React is a JavaScript library for building User Interface. It is maintained by Facebook and a community of individual developers and companies."
    }
  ],
  display: false // Set false to hide this section, defaults to true
};

// Talks Sections

const talkSection = {
  title: "TALKS",
  subtitle: emoji(
    "I LOVE TO SHARE MY LIMITED KNOWLEDGE AND GET A SPEAKER BADGE 😅"
  ),

  talks: [
    {
      title: "",
      subtitle: "",
      slides_url: "",
      event_url: ""
    }
  ],
  display: false // Set false to hide this section, defaults to true
};

// Podcast Section

const podcastSection = {
  title: emoji("Podcast 🎙️"),
  subtitle: "I LOVE TO TALK ABOUT MYSELF AND TECHNOLOGY",

  // Please Provide with Your Podcast embeded Link
  podcast: [
    ""
  ],
  display: false // Set false to hide this section, defaults to true
};

// Resume Section
const resumeSection = {
  title: "Resume",
  subtitle: "Feel free to download my resume",

  // Please Provide with Your Podcast embeded Link
  display: true // Set false to hide this section, defaults to true
};

const contactInfo = {
  title: emoji("Contact Me ☎️"),
  subtitle:
    "Discuss a project or just want to say hi? My Inbox is open for all.",
  number: "+17209346218",
  email_address: "jsvishnujs@gmail.com"
};

// Twitter Section

const twitterDetails = {
  userName: "twitter", //Replace "twitter" with your twitter username without @
  display: false // Set true to display this section, defaults to false
};

const isHireable = false; // Set false if you are not looking for a job. Also isHireable will be display as Open for opportunities: Yes/No in the GitHub footer

export {
  illustration,
  greeting,
  socialMediaLinks,
  splashScreen,
  skillsSection,
  educationInfo,
  techStack,
  workExperiences,
  openSource,
  bigProjects,
  achievementSection,
  blogSection,
  talkSection,
  podcastSection,
  contactInfo,
  twitterDetails,
  isHireable,
  resumeSection
};
