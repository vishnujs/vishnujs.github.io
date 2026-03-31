import React, {useCallback, useEffect, useState} from "react";
import "./Top.scss";

export default function Top() {
  const [isVisible, setIsVisible] = useState(false);

  const onScroll = useCallback(() => {
    const top =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop;
    setIsVisible(top > 20);
  }, []);

  useEffect(() => {
    onScroll();
    window.addEventListener("scroll", onScroll, {passive: true});
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  function TopEvent() {
    window.scrollTo({top: 0, behavior: "smooth"});
  }

  return (
    <button
      onClick={TopEvent}
      id="topButton"
      title="Go to top"
      style={{visibility: isVisible ? "visible" : "hidden"}}
    >
      <i className="fas fa-hand-point-up" aria-hidden="true"></i>
    </button>
  );
}
