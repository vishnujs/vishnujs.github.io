import React, {useEffect, useState, lazy, Suspense} from "react";
import {openSource} from "../../portfolio";
import Contact from "../contact/Contact";
import Loading from "../loading/Loading";

const renderLoader = () => <Loading />;
const GithubProfileCard = lazy(
  () => import("../../components/githubProfileCard/GithubProfileCard")
);
export default function Profile() {
  const [prof, setProf] = useState(null);
  const [showGithubProfile, setShowGithubProfile] = useState(
    Boolean(openSource.showGithubProfile)
  );

  useEffect(() => {
    if (!showGithubProfile) return;
    let cancelled = false;

    fetch("/profile.json")
      .then(result => {
        if (!result.ok) {
          throw new Error(
            `Failed to load /profile.json (HTTP ${result.status})`
          );
        }
        return result.json();
      })
      .then(response => {
        if (cancelled) return;
        setProf(response?.data?.user ?? null);
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error(
          `${error} (because of this error GitHub contact section could not be displayed. Contact section has reverted to default)`
        );
        if (cancelled) return;
        setProf(null);
        setShowGithubProfile(false);
      });

    return () => {
      cancelled = true;
    };
  }, [showGithubProfile]);

  if (openSource.display && showGithubProfile && prof) {
    return (
      <Suspense fallback={renderLoader()}>
        <GithubProfileCard prof={prof} key={prof.id} />
      </Suspense>
    );
  } else {
    return <Contact />;
  }
}
