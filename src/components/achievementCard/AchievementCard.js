import React from "react";
import "./AchievementCard.scss";
import {openExternalLink} from "../../utils";

export default function AchievementCard({cardInfo, isDark}) {
  function openUrlInNewTab(url, name) {
    openExternalLink(url, name);
  }

  const footerLinks = Array.isArray(cardInfo.footer) ? cardInfo.footer : [];

  return (
    <div className={isDark ? "dark-mode certificate-card" : "certificate-card"}>
      <div className="certificate-image-div">
        <img
          src={cardInfo.image}
          alt={cardInfo.imageAlt || "Card Thumbnail"}
          className="card-image"
        ></img>
      </div>
      <div className="certificate-detail-div">
        <h5 className={isDark ? "dark-mode card-title" : "card-title"}>
          {cardInfo.title}
        </h5>
        <p className={isDark ? "dark-mode card-subtitle" : "card-subtitle"}>
          {cardInfo.description}
        </p>
      </div>
      {footerLinks.length ? (
        <div className="certificate-card-footer">
          {footerLinks.map((v, i) => {
            return (
              <span
                key={i}
                className={
                  isDark ? "dark-mode certificate-tag" : "certificate-tag"
                }
                onClick={() => openUrlInNewTab(v.url, v.name)}
              >
                {v.name}
              </span>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
