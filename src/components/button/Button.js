import React from "react";
import "./Button.scss";
import {sanitizeUrl} from "../../utils";

export default function Button({text, className, href, newTab}) {
  const safeHref = sanitizeUrl(href, ["http:", "https:", "mailto:", "tel:"]);
  return (
    <div className={className}>
      <a
        className="main-button"
        href={safeHref || "#"}
        target={newTab ? "_blank" : undefined}
        rel={newTab ? "noopener noreferrer" : undefined}
      >
        {text}
      </a>
    </div>
  );
}
