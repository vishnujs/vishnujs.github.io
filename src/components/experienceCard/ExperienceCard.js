import React, {useMemo} from "react";
import "./ExperienceCard.scss";

export default function ExperienceCard({
  cardInfo,
  isDark,
  isExpanded = false,
  onToggle
}) {
  const detailsId = useMemo(
    () => `experience-details-${String(cardInfo.company).replace(/\s+/g, "-")}`,
    [cardInfo.company]
  );

  const textClass = isDark ? "dark-mode-text" : "";
  const rootClass = [
    isDark ? "experience-card-dark" : "experience-card",
    "experience-card-v2",
    isExpanded ? "experience-card--expanded" : "experience-card--collapsed"
  ]
    .filter(Boolean)
    .join(" ");

  const GetDescBullets = ({descBullets}) => {
    return descBullets
      ? descBullets.map((item, i) => (
          <li key={i} className={isDark ? `subTitle ${textClass}` : "subTitle"}>
            {item}
          </li>
        ))
      : null;
  };

  function onKeyDown(e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onToggle?.();
    }
  }

  return (
    <div
      className={rootClass}
      aria-expanded={isExpanded}
      aria-controls={detailsId}
      onClick={onToggle}
      role="button"
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      <div className="experience-card-summary">
        <img
          className="experience-card-logo"
          src={cardInfo.companylogo}
          alt={cardInfo.company}
          loading="lazy"
        />

        <h5 className={`experience-card-company ${textClass}`}>{cardInfo.company}</h5>
        <div className={`experience-card-tenure ${textClass}`}>{cardInfo.date}</div>

        <div className={`experience-card-cta ${textClass}`}>
          {isExpanded ? "Hide details" : "View details"}
        </div>
      </div>

      <div
        id={detailsId}
        className={
          isExpanded
            ? "experience-card-details experience-card-details--open"
            : "experience-card-details"
        }
        onClick={e => e.stopPropagation()}
        onKeyDown={e => e.stopPropagation()}
      >
        <h5 className={`experience-card-role ${textClass}`}>{cardInfo.role}</h5>
        {cardInfo.desc ? (
          <p className={`subTitle experience-card-desc ${textClass}`}>{cardInfo.desc}</p>
        ) : null}
        {cardInfo.descBullets && cardInfo.descBullets.length ? (
          <ul className="experience-card-bullets">
            <GetDescBullets descBullets={cardInfo.descBullets} />
          </ul>
        ) : null}
      </div>
    </div>
  );
}
