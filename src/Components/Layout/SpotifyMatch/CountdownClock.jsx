import React, { useEffect, useState } from "react";

function CountdownClock({ refreshAccessToken, spotifyTokenExpiration }) {
  const [refreshCountdown, setRefreshCountdown] = useState(0);

  const formatCountdown = (countdownSeconds) => {
    const minutes = Math.floor(countdownSeconds / 60);
    const seconds = countdownSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  useEffect(() => {
    const updateRefreshCountdown = () => {
      const remainingSeconds = Math.floor(
        (spotifyTokenExpiration - Date.now()) / 1000
      );
      setRefreshCountdown(remainingSeconds);
    };

    let countdownInterval;
    if (spotifyTokenExpiration) {
      updateRefreshCountdown();
      countdownInterval = setInterval(() => {
        updateRefreshCountdown();
        console.log(refreshCountdown);
        if (refreshCountdown === 0) {
          clearInterval(countdownInterval);
          refreshAccessToken();
        }
      }, 1000);
    }
    return () => {
      clearInterval(countdownInterval);
    };
  }, [spotifyTokenExpiration, refreshCountdown, refreshAccessToken]);

  return (
    <div>
      {refreshCountdown < 0 ? (
        <>Loading...</>
      ) : (
        <>Refresh In {formatCountdown(refreshCountdown)}</>
      )}
    </div>
  );
}

export default CountdownClock;
