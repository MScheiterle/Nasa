import { useEffect, useState } from "react";
import CookieManager from "../../Utils/CookieManager";
import { addCustomFieldToCurrentUser } from "../../../firebase.ts";
import axios from "axios";

import "./style.scss";

const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const REDIRECT_URI = "http://localhost:3000/spotifymatch";
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const RESPONSE_TYPE = "token";
const SCOPE = "user-top-read user-library-read user-modify-playback-state";

function SpotifyMatch(props) {
  const [spotifyToken, setToken] = useState("");
  const [userName, setUserName] = useState("");
  const [topArtistsShort, setTopArtistsShort] = useState([]);
  const [topArtistsMedium, setTopArtistsMedium] = useState([]);
  const [topArtistsLong, setTopArtistsLong] = useState([]);
  const [topTracksShort, setTopTracksShort] = useState([]);
  const [topTracksMedium, setTopTracksMedium] = useState([]);
  const [topTracksLong, setTopTracksLong] = useState([]);
  //const [topTagsShort, setTopTagsShort] = useState([]);
  //const [topTagsMedium, setTopTagsMedium] = useState([]);
  //const [topTagsLong, setTopTagsLong] = useState([]);
  const [timeSelected, setTimeSelected] = useState("medium_term");

  const handleTimeChange = (event) => {
    setTimeSelected(event.target.value);
  };

  useEffect(() => {
    new CookieManager().setCookie(
      "Simpl1f1ed.com-viewedSpotifyMatch",
      `${Date.now()}`,
      {
        expires: 7,
      }
    );
    document.title = "Simpl1f1ed.com - SpotifyMatch";

    return () => {
      document.title = "Simpl1f1ed.com";
    };
  }, []);

  useEffect(() => {
    const hash = window.location.hash;

    if (hash && props.user) {
      const newToken = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      setToken(newToken);
      window.location.hash = "";
      addCustomFieldToCurrentUser("spotifyToken", newToken);
    } else if (props.user && props.spotifyToken) {
      setToken(props.spotifyToken);
    }
  }, [props.user, props.spotifyToken]);

  useEffect(() => {
    const getUserProfile = async () => {
      if (!props.user) {
        return;
      }

      try {
        const { data } = await axios.get("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: `Bearer ${spotifyToken}`,
          },
        });

        setUserName(data.display_name);
      } catch {
        await addCustomFieldToCurrentUser("spotifyToken", "");
        setToken(null);
      }
    };

    if (spotifyToken) {
      getUserProfile();
    }
  }, [props.user, spotifyToken]);

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
            time_range: timeSelected,
          },
        }
      );

      timeSelected === "short_term"
        ? setTopArtistsShort(data.items)
        : timeSelected === "medium_term"
        ? setTopArtistsMedium(data.items)
        : setTopArtistsLong(data.items);
    };

    if (spotifyToken) {
      switch (timeSelected) {
        case "short_term":
          if (topArtistsShort.length === 0) {
            getTopArtists();
          }
          break;
        case "medium_term":
          if (topArtistsMedium.length === 0) {
            getTopArtists();
          }
          break;
        case "long_term":
          if (topArtistsLong.length === 0) {
            getTopArtists();
          }
          break;
        default:
          break;
      }
    }
  }, [
    spotifyToken,
    timeSelected,
    topArtistsShort,
    topArtistsMedium,
    topArtistsLong,
  ]);

  useEffect(() => {
    const getTopTracks = async () => {
      const { data } = await axios.get(
        "https://api.spotify.com/v1/me/top/tracks",
        {
          headers: {
            Authorization: `Bearer ${spotifyToken}`,
          },
          params: {
            limit: 50,
            time_range: timeSelected,
          },
        }
      );

      timeSelected === "short_term"
        ? setTopTracksShort(data.items)
        : timeSelected === "medium_term"
        ? setTopTracksMedium(data.items)
        : setTopTracksLong(data.items);
    };

    if (spotifyToken) {
      switch (timeSelected) {
        case "short_term":
          if (topTracksShort.length === 0) {
            getTopTracks();
          }
          break;
        case "medium_term":
          if (topTracksMedium.length === 0) {
            getTopTracks();
          }
          break;
        case "long_term":
          if (topTracksLong.length === 0) {
            getTopTracks();
          }
          break;
        default:
          break;
      }
    }
  }, [
    spotifyToken,
    timeSelected,
    topTracksShort,
    topTracksMedium,
    topTracksLong,
  ]);

  const logout = async () => {
    setToken("");
    await addCustomFieldToCurrentUser("spotifyToken", "");
  };

  const RenderData = () => {
    const [playingTrack, setPlayingTrack] = useState(null);
    const [timeSelectedTracks, setTimeSelectedTracks] = useState(
      timeSelected === "short_term"
        ? topTracksShort
        : timeSelected === "medium_term"
        ? topTracksMedium
        : topTracksLong
    );
    const [timeSelectedArtists, setTimeSelectedArtists] = useState(
      timeSelected === "short_term"
        ? topArtistsShort
        : timeSelected === "medium_term"
        ? topArtistsMedium
        : topArtistsLong
    );
    const [artistSortOrder, setArtistSortOrder] = useState(null);
    const [artistSortColumn, setArtistSortColumn] = useState(null);
    const [trackSortOrder, setTrackSortOrder] = useState(null);
    const [trackSortColumn, setTrackSortColumn] = useState(null);

    const playTrack = (uri) => {
      if (!spotifyToken) {
        return;
      }

      if (!playingTrack) {
        // Start playback if it's not already started
        axios({
          method: "put",
          url: "https://api.spotify.com/v1/me/player/play",
          headers: {
            Authorization: `Bearer ${spotifyToken}`,
            "Content-Type": "application/json",
          },
          data: {
            uris: [uri],
          },
        }).then(() => {
          setPlayingTrack(uri);
        });
      } else if (playingTrack === uri) {
        // Pause playback if the track is already playing
        axios({
          method: "put",
          url: "https://api.spotify.com/v1/me/player/pause",
          headers: {
            Authorization: `Bearer ${spotifyToken}`,
          },
        }).then(() => {
          setPlayingTrack(null);
        });
      } else {
        // Change the track if a different one is selected
        axios({
          method: "put",
          url: "https://api.spotify.com/v1/me/player/play",
          headers: {
            Authorization: `Bearer ${spotifyToken}`,
            "Content-Type": "application/json",
          },
          data: {
            uris: [uri],
          },
        }).then(() => {
          setPlayingTrack(uri);
        });
      }
    };

    //const getSongGenres = (songID) => {};

    //let timeSelectedTags =
    //  timeSelected === "short_term"
    //    ? topTagsShort
    //    : timeSelected === "medium_term"
    //    ? topTagsMedium
    //    : topTagsLong;

    const handleSort = (table, column) => {
      if (table === "artists") {
        const newOrder =
          artistSortOrder === "asc"
            ? "desc"
            : artistSortOrder === "desc"
            ? null
            : "asc";
        setArtistSortOrder(newOrder);
        setArtistSortColumn(column);
        if (newOrder !== null) {
          const sortedArtists = [...timeSelectedArtists].sort((a, b) => {
            if (newOrder === "asc") {
              if (column === "name") {
                return a[column].localeCompare(b[column]);
              } else {
                return a[column] - b[column];
              }
            } else if (newOrder === "desc") {
              if (column === "name") {
                return b[column].localeCompare(a[column]);
              } else {
                return b[column] - a[column];
              }
            }
            return 0;
          });
          setTimeSelectedArtists(sortedArtists);
        } else {
          setTimeSelectedArtists(
            timeSelected === "short_term"
              ? topArtistsShort
              : timeSelected === "medium_term"
              ? topArtistsMedium
              : topArtistsLong
          );
        }
      } else if (table === "tracks") {
        const newOrder =
          trackSortOrder === "asc"
            ? "desc"
            : trackSortOrder === "desc"
            ? null
            : "asc";
        setTrackSortOrder(newOrder);
        setTrackSortColumn(column);
        if (newOrder !== null) {
          const sortedTracks = [...timeSelectedTracks].sort((a, b) => {
            if (newOrder === "asc") {
              if (column === "name") {
                return a[column].localeCompare(b[column]);
              } else if (column === "release_date") {
                return new Date(a.album[column]) - new Date(b.album[column]);
              } else {
                return a[column] - b[column];
              }
            } else if (newOrder === "desc") {
              if (column === "name") {
                return b[column].localeCompare(a[column]);
              } else if (column === "release_date") {
                return new Date(b.album[column]) - new Date(a.album[column]);
              } else {
                return b[column] - a[column];
              }
            }
            return 0;
          });

          setTimeSelectedTracks(sortedTracks);
        } else {
          setTimeSelectedTracks(
            timeSelected === "short_term"
              ? topTracksShort
              : timeSelected === "medium_term"
              ? topTracksMedium
              : topTracksLong
          );
        }
      }
    };

    return (
      <div className="gridElem">
        <div className="section">
          <div className="legend">
            Displays the Spotify Artisits that you listen to the most.
          </div>
          <div className="sectionName">
            Your Top {timeSelectedArtists.length}{" "}
            <span className="end">Artisits</span>
          </div>
          <table>
            <thead>
              <tr>
                <th className="mobileHidden">Index</th>
                <th
                  onClick={() => handleSort("artists", "name")}
                  className="sortable"
                >
                  Name{" "}
                  {artistSortColumn === "name" && (
                    <span>
                      {artistSortOrder === "asc"
                        ? "▲"
                        : artistSortOrder === "desc"
                        ? "▼"
                        : "-"}
                    </span>
                  )}
                </th>
                <th
                  onClick={() => handleSort("artists", "popularity")}
                  className="sortable"
                >
                  Popularity{" "}
                  {artistSortColumn === "popularity" && (
                    <span>
                      {artistSortOrder === "asc"
                        ? "▲"
                        : artistSortOrder === "desc"
                        ? "▼"
                        : "-"}
                    </span>
                  )}
                </th>
                <th>Genres</th>
              </tr>
            </thead>
            <tbody>
              {timeSelectedArtists.map((artist, index) => (
                <tr key={artist.id}>
                  <td className="mobileHidden">{index + 1}</td>
                  <td className="artistName">{artist.name}</td>
                  <td>{artist.popularity}</td>
                  <td>{artist.genres.join(", ")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="section">
          <div className="legend">
            Displays the Spotify Songs that you listen to the most.
          </div>
          <div className="sectionName">
            Your Top {timeSelectedTracks.length}{" "}
            <span className="end">Songs</span>
          </div>
          <table>
            <thead>
              <tr>
                <th className="mobileHidden">Index</th>
                <th
                  onClick={() => handleSort("tracks", "name")}
                  className="sortable"
                >
                  Song Name{" "}
                  {trackSortColumn === "name" && (
                    <span>
                      {trackSortOrder === "asc"
                        ? "▲"
                        : trackSortOrder === "desc"
                        ? "▼"
                        : "-"}
                    </span>
                  )}
                </th>
                <th
                  onClick={() => handleSort("tracks", "popularity")}
                  className="sortable"
                >
                  Popularity{" "}
                  {trackSortColumn === "popularity" && (
                    <span>
                      {trackSortOrder === "asc"
                        ? "▲"
                        : trackSortOrder === "desc"
                        ? "▼"
                        : "-"}
                    </span>
                  )}
                </th>
                <th
                  className="mobileHidden sortable"
                  onClick={() => handleSort("tracks", "release_date")}
                >
                  Release Date{" "}
                  {trackSortColumn === "release_date" && (
                    <span>
                      {trackSortOrder === "asc"
                        ? "▲"
                        : trackSortOrder === "desc"
                        ? "▼"
                        : "-"}
                    </span>
                  )}
                </th>
                <th>Artists In Song</th>
                <th>Play</th>
              </tr>
            </thead>
            <tbody>
              {timeSelectedTracks.map((track, index) => (
                <tr key={track.id} id={track.id}>
                  <td className="mobileHidden">{index + 1}</td>
                  <td>{track.name}</td>
                  <td>{track.popularity}</td>
                  <td className="mobileHidden">
                    {new Date(track.album.release_date).toLocaleDateString()}
                  </td>
                  <td>
                    {track.artists.map((artist, index) => (
                      <span key={artist.id}>
                        {artist.name}
                        {index !== track.artists.length - 1 && ", "}
                      </span>
                    ))}
                  </td>
                  <td className="playColumn">
                    <button
                      onClick={() => playTrack(`spotify:track:${track.id}`)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM188.3 147.1c-7.6 4.2-12.3 12.3-12.3 20.9V344c0 8.7 4.7 16.7 12.3 20.9s16.8 4.1 24.3-.5l144-88c7.1-4.4 11.5-12.1 11.5-20.5s-4.4-16.1-11.5-20.5l-144-88c-7.4-4.5-16.7-4.7-24.3-.5z" />
                      </svg>
                      <div>Play</div>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div id="SpotifyMatch">
      <div className="header page" id="Spotify Match Header">
        <div className="headerCard">
          <div className="title">Spotify Match</div>
          <div className="description">
            Get your <span>spotify stats</span> and compare them with{" "}
            <span>friends</span>
          </div>
          <div className="account">
            {!props.user ? (
              <p>
                <span>
                  <a href="/login">Login</a>
                </span>{" "}
                to connect your Spotify account
              </p>
            ) : (
              <div>
                <p>Welcome, {props.name}!</p>
                <div className="spotifyConnection">
                  {!spotifyToken ? (
                    <a
                      href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 496 512"
                      >
                        <path
                          fill="#1ed760"
                          d="M248 8C111.1 8 0 119.1 0 256s111.1 248 248 248 248-111.1 248-248S384.9 8 248 8Z"
                        />
                        <path d="M406.6 231.1c-5.2 0-8.4-1.3-12.9-3.9-71.2-42.5-198.5-52.7-280.9-29.7-3.6 1-8.1 2.6-12.9 2.6-13.2 0-23.3-10.3-23.3-23.6 0-13.6 8.4-21.3 17.4-23.9 35.2-10.3 74.6-15.2 117.5-15.2 73 0 149.5 15.2 205.4 47.8 7.8 4.5 12.9 10.7 12.9 22.6 0 13.6-11 23.3-23.2 23.3zm-31 76.2c-5.2 0-8.7-2.3-12.3-4.2-62.5-37-155.7-51.9-238.6-29.4-4.8 1.3-7.4 2.6-11.9 2.6-10.7 0-19.4-8.7-19.4-19.4s5.2-17.8 15.5-20.7c27.8-7.8 56.2-13.6 97.8-13.6 64.9 0 127.6 16.1 177 45.5 8.1 4.8 11.3 11 11.3 19.7-.1 10.8-8.5 19.5-19.4 19.5zm-26.9 65.6c-4.2 0-6.8-1.3-10.7-3.6-62.4-37.6-135-39.2-206.7-24.5-3.9 1-9 2.6-11.9 2.6-9.7 0-15.8-7.7-15.8-15.8 0-10.3 6.1-15.2 13.6-16.8 81.9-18.1 165.6-16.5 237 26.2 6.1 3.9 9.7 7.4 9.7 16.5s-7.1 15.4-15.2 15.4z" />
                      </svg>
                      <span>Connect Spotify Now</span>
                    </a>
                  ) : (
                    <>
                      <a
                        href="https://www.spotify.com/us/account/overview/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 496 512"
                        >
                          <path
                            fill="#1ed760"
                            d="M248 8C111.1 8 0 119.1 0 256s111.1 248 248 248 248-111.1 248-248S384.9 8 248 8Z"
                          />
                          <path d="M406.6 231.1c-5.2 0-8.4-1.3-12.9-3.9-71.2-42.5-198.5-52.7-280.9-29.7-3.6 1-8.1 2.6-12.9 2.6-13.2 0-23.3-10.3-23.3-23.6 0-13.6 8.4-21.3 17.4-23.9 35.2-10.3 74.6-15.2 117.5-15.2 73 0 149.5 15.2 205.4 47.8 7.8 4.5 12.9 10.7 12.9 22.6 0 13.6-11 23.3-23.2 23.3zm-31 76.2c-5.2 0-8.7-2.3-12.3-4.2-62.5-37-155.7-51.9-238.6-29.4-4.8 1.3-7.4 2.6-11.9 2.6-10.7 0-19.4-8.7-19.4-19.4s5.2-17.8 15.5-20.7c27.8-7.8 56.2-13.6 97.8-13.6 64.9 0 127.6 16.1 177 45.5 8.1 4.8 11.3 11 11.3 19.7-.1 10.8-8.5 19.5-19.4 19.5zm-26.9 65.6c-4.2 0-6.8-1.3-10.7-3.6-62.4-37.6-135-39.2-206.7-24.5-3.9 1-9 2.6-11.9 2.6-9.7 0-15.8-7.7-15.8-15.8 0-10.3 6.1-15.2 13.6-16.8 81.9-18.1 165.6-16.5 237 26.2 6.1 3.9 9.7 7.4 9.7 16.5s-7.1 15.4-15.2 15.4z" />
                        </svg>
                        <span>{userName}</span>
                      </a>
                      <div onClick={logout}>Disconnect</div>
                    </>
                  )}
                </div>
                <div className="disclaimer">
                  Connection Only Lasts 60 Minutes.
                  <br />
                  Only your Spotify token is stored, not any other data.
                </div>
              </div>
            )}
          </div>
          {spotifyToken ? (
            <>
              <button className="compareButton">Compare With Friends!</button>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>

      {spotifyToken ? (
        <div className="userStats page" id="User Stats">
          <div className="timeSelection">
            <input
              type="radio"
              id="weeks"
              name="timeChoice"
              value="short_term"
              checked={timeSelected === "short_term"}
              onChange={handleTimeChange}
            />
            <label htmlFor="weeks">4 Weeks</label>
            <input
              type="radio"
              id="months"
              name="timeChoice"
              value="medium_term"
              checked={timeSelected === "medium_term"}
              onChange={handleTimeChange}
            />
            <label htmlFor="months">6 Months</label>
            <input
              type="radio"
              id="years"
              name="timeChoice"
              value="long_term"
              checked={timeSelected === "long_term"}
              onChange={handleTimeChange}
            />
            <label htmlFor="years">Several Years</label>
          </div>

          {<RenderData />}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default SpotifyMatch;
