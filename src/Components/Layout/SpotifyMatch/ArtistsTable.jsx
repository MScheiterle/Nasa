import React, { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";

function ArtistTable({ initialTime, spotifyToken }) {
  const [data, setData] = useState([]);
  const [sortOrder, setSortOrder] = useState("");
  const [sortColumn, setSortColumn] = useState("");

  useEffect(() => {
    console.log("Artists")
  }, [])

  useEffect(() => {
    const getTopArtists = async () => {
      const { data } = await axios.get(
        "https://api.spotify.com/v1/me/top/artists",
        {
          headers: {
            Authorization: `Bearer ${spotifyToken}`,
          },
          params: {
            limit: 50,
            time_range: initialTime,
          },
        }
      );

      setData(data.items);
    };

    if (spotifyToken) {
      getTopArtists();
    }
  }, [initialTime, spotifyToken]);

  const handleSort = useCallback(
    (column) => {
      const newOrder =
        sortOrder === "asc" ? "desc" : sortOrder === "desc" ? null : "asc";
      setSortOrder(newOrder);
      setSortColumn(column);
    },
    [sortOrder]
  );

  const sortedData = useMemo(() => {
    if (!sortColumn || !sortOrder) {
      return data;
    }

    return [...data].sort((a, b) => {
      const columnA = a[sortColumn];
      const columnB = b[sortColumn];

      if (sortOrder === "asc") {
        if (typeof columnA === "string") {
          return columnA.localeCompare(columnB);
        } else {
          return columnA - columnB;
        }
      } else {
        if (typeof columnB === "string") {
          return columnB.localeCompare(columnA);
        } else {
          return columnB - columnA;
        }
      }
    });
  }, [data, sortColumn, sortOrder]);

  const dsiclaimerSVG = (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
      </svg>{" "}
    </>
  );

  const memoizedRenderArtist = useCallback(
    (artist) => (
      <a href={artist.external_urls.spotify} target="_blank" rel="noreferrer">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
          <path
            fill="#1ed760"
            d="M248 8C111.1 8 0 119.1 0 256s111.1 248 248 248 248-111.1 248-248S384.9 8 248 8Z"
          />
          <path d="M406.6 231.1c-5.2 0-8.4-1.3-12.9-3.9-71.2-42.5-198.5-52.7-280.9-29.7-3.6 1-8.1 2.6-12.9 2.6-13.2 0-23.3-10.3-23.3-23.6 0-13.6 8.4-21.3 17.4-23.9 35.2-10.3 74.6-15.2 117.5-15.2 73 0 149.5 15.2 205.4 47.8 7.8 4.5 12.9 10.7 12.9 22.6 0 13.6-11 23.3-23.2 23.3zm-31 76.2c-5.2 0-8.7-2.3-12.3-4.2-62.5-37-155.7-51.9-238.6-29.4-4.8 1.3-7.4 2.6-11.9 2.6-10.7 0-19.4-8.7-19.4-19.4s5.2-17.8 15.5-20.7c27.8-7.8 56.2-13.6 97.8-13.6 64.9 0 127.6 16.1 177 45.5 8.1 4.8 11.3 11 11.3 19.7-.1 10.8-8.5 19.5-19.4 19.5zm-26.9 65.6c-4.2 0-6.8-1.3-10.7-3.6-62.4-37.6-135-39.2-206.7-24.5-3.9 1-9 2.6-11.9 2.6-9.7 0-15.8-7.7-15.8-15.8 0-10.3 6.1-15.2 13.6-16.8 81.9-18.1 165.6-16.5 237 26.2 6.1 3.9 9.7 7.4 9.7 16.5s-7.1 15.4-15.2 15.4z" />
        </svg>{" "}
        {artist.name}
      </a>
    ),
    []
  );

  const sortIcon = useCallback(
    (string) => {
      return (
        sortColumn === string && (
          <span>
            {sortOrder === "asc" ? "▲" : sortOrder === "desc" ? "▼" : "-"}
          </span>
        )
      );
    },
    [sortColumn, sortOrder]
  );

  const artistHeader = (
    <thead>
      <tr>
        <th className="mobileHidden">#</th>
        <th onClick={() => handleSort("name")} className="sortable">
          Name {sortIcon("name")}
        </th>
        <th onClick={() => handleSort("popularity")} className="sortable">
          Popularity {sortIcon("popularity")}
        </th>
        <th>Genres</th>
      </tr>
    </thead>
  );

  const artistBody = (
    <tbody>
      {sortedData.map((artist, index) => (
        <tr key={artist.id + index + Date.now()}>
          <td className="mobileHidden">{index + 1}</td>
          <td className="artistName">{memoizedRenderArtist(artist)}</td>
          <td>{artist.popularity}</td>
          <td>{artist.genres.join(", ")}</td>
        </tr>
      ))}
    </tbody>
  );

  return (
    <div className="section">
      <div className="legend">
        Displays the Spotify Artisits that you listen to the most.
        <br />
        {dsiclaimerSVG}
        The popularity of the artist. The value will be between 0 and 100, with
        100 being the most popular. The artist's popularity is calculated from
        the popularity of all the artist's tracks.
        <br />
        {dsiclaimerSVG} Sometimes artists dont have genres becuase they are too
        broad
      </div>
      <div className="sectionName">
        {sortedData.length < 1 ? (
          <>Loading...</>
        ) : (
          <>
            <>Your Top {sortedData.length} </>
            <span className="end">Artists</span>
          </>
        )}
      </div>
      <table>
        {artistHeader}
        {artistBody}
      </table>
    </div>
  );
}

export default React.memo(ArtistTable);
