import React, { useEffect, useState, useCallback } from "react";

function CountdownClock(props) {
  const [logoutCountdown, setLogoutCountdown] = useState(0);

  const formatCountdown = (countdownSeconds) => {
    const minutes = Math.floor(countdownSeconds / 60);
    const seconds = countdownSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const updateLogoutCountdown = useCallback(() => {
    const remainingSeconds = Math.floor(
      (props.spotifyTokenExpiration - Date.now()) / 1000
    );
    setLogoutCountdown(remainingSeconds);
  }, [props.spotifyTokenExpiration]);

  useEffect(() => {
    let countdownInterval;
    if (props.spotifyTokenExpiration) {
      updateLogoutCountdown();
      countdownInterval = setInterval(() => {
        updateLogoutCountdown();
        if (logoutCountdown <= 0) {
          clearInterval(countdownInterval);
          props.logoutFunction();
        }
      }, 1000);
    }
    return () => clearInterval(countdownInterval);
  }, [
    props.spotifyTokenExpiration,
    updateLogoutCountdown,
    logoutCountdown,
    props.logoutFunction,
    props,
  ]);

  return (
    <div>
      Your Spotify token will expire in {formatCountdown(logoutCountdown)}
    </div>
  );
}

export default CountdownClock;
