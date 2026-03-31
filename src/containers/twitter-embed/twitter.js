import React, {
  Suspense,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import "./twitter.scss";
import Loading from "../loading/Loading";
import {TwitterTimelineEmbed} from "react-twitter-embed";
import {twitterDetails} from "../../portfolio";
import StyleContext from "../../contexts/StyleContext";

const renderLoader = () => <Loading />;
const FALLBACK_TIMEOUT_MS = 10000;

function useScreenWidth() {
  const [width, setWidth] = useState(() => {
    // Guard in case of tests/non-browser env.
    if (typeof window === "undefined") return 600;
    return window.innerWidth || window.screen?.width || 600;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handler = () => setWidth(window.innerWidth || window.screen?.width);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return width;
}

export default function Twitter() {
  const {isDark} = useContext(StyleContext);
  const widthScreen = useScreenWidth();
  const [showFallback, setShowFallback] = useState(false);
  const fallbackTimerRef = useRef(null);

  // If the embed never loads (often due to privacy protection settings),
  // show a React-rendered fallback instead of mutating DOM via `innerHTML`.
  useEffect(() => {
    if (!twitterDetails.display) return;
    fallbackTimerRef.current = setTimeout(
      () => setShowFallback(true),
      FALLBACK_TIMEOUT_MS
    );
    return () => {
      if (fallbackTimerRef.current) clearTimeout(fallbackTimerRef.current);
    };
  }, []);

  const embedOptions = useMemo(
    () => ({height: 400, width: widthScreen}),
    [widthScreen]
  );

  if (!twitterDetails.display) {
    return null;
  }
  if (!twitterDetails.userName) {
    console.error("Twitter username for twitter section is missing");
  }
  if (twitterDetails.userName) {
    return (
      <Suspense fallback={renderLoader()}>
        <div className="tw-main-div" id="twitter">
          <div className="centerContent">
            {showFallback ? (
              <div className="centerContent">
                <h2>Can't load? Check privacy protection settings</h2>
              </div>
            ) : (
              <TwitterTimelineEmbed
                sourceType="profile"
                screenName={twitterDetails.userName}
                options={embedOptions}
                placeholder={renderLoader()}
                autoHeight={false}
                borderColor="#fff"
                key={isDark ? "1" : "2"}
                theme={isDark ? "dark" : "light"}
                noFooter={true}
                // Mark as loaded (so fallback doesn't appear) if the library calls onLoad.
                onLoad={() => {
                  if (fallbackTimerRef.current) {
                    clearTimeout(fallbackTimerRef.current);
                  }
                  setShowFallback(false);
                }}
              />
            )}
          </div>
        </div>
      </Suspense>
    );
  } else {
    return null;
  }
}
