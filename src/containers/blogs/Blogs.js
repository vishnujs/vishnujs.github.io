import React, {useState, useEffect, useContext} from "react";
import "./Blog.scss";
import BlogCard from "../../components/blogCard/BlogCard";
import {blogSection} from "../../portfolio";
import {Fade} from "react-reveal";
import StyleContext from "../../contexts/StyleContext";
export default function Blogs() {
  const {isDark} = useContext(StyleContext);
  const [mediumBlogs, setMediumBlogs] = useState([]);
  const [mediumError, setMediumError] = useState(false);
  const useMediumBlogs = Boolean(blogSection.displayMediumBlogs);
  //Medium API returns blogs' content in HTML format. Below function extracts blogs' text content within paragraph tags
  function extractTextContent(html) {
    return typeof html === "string"
      ? html
          .split(/<\/p>/i)
          .map(part => part.split(/<p[^>]*>/i).pop())
          .filter(el => el.trim().length > 0)
          .map(el => el.replace(/<\/?[^>]+(>|$)/g, "").trim())
          .join(" ")
      : "";
  }
  useEffect(() => {
    if (!useMediumBlogs) return;
    let cancelled = false;

    fetch("/blogs.json")
      .then(result => {
        if (!result.ok) {
          throw new Error(`Failed to load /blogs.json (HTTP ${result.status})`);
        }
        return result.json();
      })
      .then(response => {
        if (cancelled) return;
        setMediumBlogs(Array.isArray(response?.items) ? response.items : []);
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error(
          `${error} (because of this error Blogs section could not be displayed. Blogs section has reverted to default)`
        );
        if (cancelled) return;
        setMediumError(true);
        setMediumBlogs([]);
      });

    return () => {
      cancelled = true;
    };
  }, [useMediumBlogs]);
  if (!blogSection.display) {
    return null;
  }
  return (
    <Fade bottom duration={1000} distance="20px">
      <div className="main" id="blogs">
        <div className="blog-header">
          <h1 className="blog-header-text">{blogSection.title}</h1>
          <p
            className={
              isDark ? "dark-mode blog-subtitle" : "subTitle blog-subtitle"
            }
          >
            {blogSection.subtitle}
          </p>
        </div>
        <div className="blog-main-div">
          <div className="blog-text-div">
            {!useMediumBlogs || mediumError || mediumBlogs.length === 0
              ? blogSection.blogs.map((blog, i) => {
                  return (
                    <BlogCard
                      key={i}
                      isDark={isDark}
                      blog={{
                        url: blog.url,
                        image: blog.image,
                        title: blog.title,
                        description: blog.description
                      }}
                    />
                  );
                })
              : mediumBlogs.map((blog, i) => {
                  return (
                    <BlogCard
                      key={i}
                      isDark={isDark}
                      blog={{
                        url: blog.link,
                        title: blog.title,
                        description: extractTextContent(blog.content)
                      }}
                    />
                  );
                })}
          </div>
        </div>
      </div>
    </Fade>
  );
}
