import React from "react";
import ArtistTable from "./ArtistsTable";
import TrackTable from "./TrackTable";

function RenderData({ spotifyToken, timeSelected, shared }) {
  return (
    <div className="gridElem">
      <ArtistTable initialTime={timeSelected} spotifyToken={spotifyToken} />
      <TrackTable
        initialTime={timeSelected}
        spotifyToken={spotifyToken}
        shared={shared}
      />
    </div>
  );
}

export default RenderData;
