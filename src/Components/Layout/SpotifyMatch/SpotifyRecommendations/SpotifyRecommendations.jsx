import React, { useEffect, useState, useCallback, useMemo } from "react";
import axios from "axios";
import "./style.scss";

function ArtistResult({
  artist,
  index,
  memoizedRenderArtist,
  setSelectedArtist,
}) {
  const handleClick = useCallback(
    (event) => {
      if (event.target.tagName !== "A" && event.target.tagName !== "BUTTON") {
        setSelectedArtist(artist);
      }
    },
    [artist, setSelectedArtist]
  );

  try {
    return (
      <tr key={artist.id + index} onClick={handleClick}>
        <td className="mobileHidden">{index + 1}</td>
        <td className="artistName">{memoizedRenderArtist(artist)}</td>
        <td>{artist.popularity}</td>
        <td className="mobileHidden">{artist.followers.total}</td>
        <td>{artist.genres.join(", ")}</td>
      </tr>
    );
  } catch {}
}

function TrackResult({
  track,
  index,
  memoizedRenderArtist,
  playTrack,
  memoizedPlaySVG,
  playingTrack,
  setSelectedTrack,
}) {
  const handleClick = useCallback(
    (event) => {
      if (event.target.tagName !== "A" && event.target.tagName !== "DIV") {
        setSelectedTrack(track);
      }
    },
    [setSelectedTrack, track]
  );

  try {
    return (
      <tr key={track.id + index} onClick={handleClick}>
        <td className="mobileHidden">{index + 1}</td>
        <td>{track.name}</td>
        <td>{track.popularity}</td>
        <td className="mobileHidden">
          {new Date(track.album.release_date).toLocaleDateString()}
        </td>
        <td className="artistName">
          {track.artists.map((artist, index) => (
            <span key={artist.id + index}>
              {memoizedRenderArtist(artist)}
              {index !== track.artists.length - 1 && ", "}
            </span>
          ))}
        </td>
        <td className="playColumn">
          <button
            onClick={() => {
              playTrack(`spotify:track:${track.id}`);
            }}
          >
            {memoizedPlaySVG}
            <div>{playingTrack === track.uri ? "Stop" : "Play"}</div>
          </button>
        </td>
      </tr>
    );
  } catch {}
}

function SpotifyRecommendations(props) {
  const [artistName, setArtistName] = useState();
  const [trackName, setTrackName] = useState();
  const [trackResults, setTrackResults] = useState([]);
  const [artistResults, setArtistResults] = useState([]);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [playingTrack, setPlayingTrack] = useState(null);

  useEffect(() => {
    const searchTracks = async () => {
      const response = await axios.get(
        `https://api.spotify.com/v1/search?q=${trackName}&type=track&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${props.spotifyToken}`,
          },
        }
      );
      setTrackResults(response.data.tracks.items);
    };

    if (trackName) {
      searchTracks();
    }
  }, [trackName, props.spotifyToken]);

  useEffect(() => {
    const searchArtists = async () => {
      const response = await axios.get(
        `https://api.spotify.com/v1/search?q=${artistName}&type=artist&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${props.spotifyToken}`,
          },
        }
      );
      setArtistResults(response.data.artists.items);
    };

    if (artistName) {
      searchArtists();
    }
  }, [artistName, props.spotifyToken]);

  useEffect(() => {
    const getTrackRecommendations = async () => {
      const response = await axios.get(
        `https://api.spotify.com/v1/recommendations?seed_tracks=${selectedTrack.id}&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${props.spotifyToken}`,
          },
        }
      );
      setRecommendations(response.data.tracks);
    };

    if (selectedTrack) {
      setSelectedArtist(null);
      getTrackRecommendations();
    }
  }, [selectedTrack, props.spotifyToken]);

  useEffect(() => {
    const getArtistRecommendations = async () => {
      const response = await axios.get(
        `https://api.spotify.com/v1/artists/${selectedArtist.id}/related-artists`,
        {
          headers: {
            Authorization: `Bearer ${props.spotifyToken}`,
          },
        }
      );
      setSelectedTrack(null);
      setRecommendations(response.data.artists);
    };

    if (selectedArtist) {
      getArtistRecommendations();
    }
  }, [selectedArtist, props.spotifyToken]);

  const playTrack = (uri) => {
    if (!props.spotifyToken) {
      return;
    }

    axios({
      method: "get",
      url: "https://api.spotify.com/v1/me/player/devices",
      headers: {
        Authorization: `Bearer ${props.spotifyToken}`,
        "Content-Type": "application/json",
      },
    }).then((response) => {
      const activeDevice = response.data.devices.find(
        (device) => device.is_active
      );
      const deviceId = activeDevice ? activeDevice.id : null;

      if (uri === playingTrack) {
        // if the same song is playing, pause it
        axios({
          method: "put",
          url: "https://api.spotify.com/v1/me/player/pause",
          headers: {
            Authorization: `Bearer ${props.spotifyToken}`,
            "Content-Type": "application/json",
          },
          data: {
            device_id: deviceId,
          },
        }).then(() => {
          setPlayingTrack(null);
        });
      } else {
        // if a different song is requested, play it
        axios({
          method: "put",
          url: "https://api.spotify.com/v1/me/player/play",
          headers: {
            Authorization: `Bearer ${props.spotifyToken}`,
            "Content-Type": "application/json",
          },
          data: {
            uris: [uri],
            device_id: deviceId,
          },
        }).then(() => {
          setPlayingTrack(uri);
        });
      }
    });
  };

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

  const memoizedPlaySVG = useMemo(
    () => (
      <>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM188.3 147.1c-7.6 4.2-12.3 12.3-12.3 20.9V344c0 8.7 4.7 16.7 12.3 20.9s16.8 4.1 24.3-.5l144-88c7.1-4.4 11.5-12.1 11.5-20.5s-4.4-16.1-11.5-20.5l-144-88c-7.4-4.5-16.7-4.7-24.3-.5z" />
        </svg>{" "}
      </>
    ),
    []
  );

  const memoizedDisclaimerSVG = useMemo(
    () => (
      <>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
        </svg>{" "}
      </>
    ),
    []
  );

  const memoizedArtistHeader = useMemo(
    () => (
      <>
        <tr>
          <th className="mobileHidden">#</th>
          <th>Name</th>
          <th>Popularity</th>
          <th className="mobileHidden">Followers</th>
          <th>Genres</th>
        </tr>
      </>
    ),
    []
  );

  const memoizedTrackHeader = useMemo(
    () => (
      <>
        <tr>
          <th className="mobileHidden">#</th>
          <th>Name</th>
          <th>Popularity</th>
          <th className="mobileHidden">Release Date</th>
          <th>Artists</th>
        </tr>
      </>
    ),
    []
  );

  return (
    <div id="SpotifyRecommendations" className="page">
      <div className="pageHeader">
        Get recommendations based on <span>Artist</span> or <span>Song</span>
        <br />
        {memoizedDisclaimerSVG} Click the row to select the item.
      </div>
      <div className="searchPage">
        <div className="searchSection">
          <div className="searchBar">
            <label htmlFor="artist">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
              </svg>
            </label>
            <input
              id="artist"
              type="text"
              placeholder="Ex: Cody Fry"
              onChange={(e) => setArtistName(e.target.value)}
            />
            <label htmlFor="artist" className="inputName">
              Search Artist Name
            </label>
          </div>
          <table>
            <thead>{memoizedArtistHeader}</thead>
            <tbody>
              {artistResults.map((artist, index) => (
                <ArtistResult
                  artist={artist}
                  index={index}
                  memoizedRenderArtist={memoizedRenderArtist}
                  setSelectedArtist={setSelectedArtist}
                />
              ))}
            </tbody>
          </table>
        </div>
        <div className="searchSection">
          <div className="searchBar">
            <label htmlFor="track">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M499.1 6.3c8.1 6 12.9 15.6 12.9 25.7v72V368c0 44.2-43 80-96 80s-96-35.8-96-80s43-80 96-80c11.2 0 22 1.6 32 4.6V147L192 223.8V432c0 44.2-43 80-96 80s-96-35.8-96-80s43-80 96-80c11.2 0 22 1.6 32 4.6V200 128c0-14.1 9.3-26.6 22.8-30.7l320-96c9.7-2.9 20.2-1.1 28.3 5z" />
              </svg>
            </label>
            <input
              id="track"
              type="text"
              placeholder="Ex: Flying by Cody Fry"
              onChange={(e) => {
                setTrackName(e.target.value);
              }}
            />
            <label htmlFor="track" className="inputName">
              Search Track Name or Artist
            </label>
          </div>
          <table>
            <thead>{memoizedTrackHeader}</thead>
            <tbody>
              {trackResults.map((track, index) => (
                <TrackResult
                  track={track}
                  index={index}
                  memoizedRenderArtist={memoizedRenderArtist}
                  playTrack={playTrack}
                  memoizedPlaySVG={memoizedPlaySVG}
                  playingTrack={playingTrack}
                  setSelectedTrack={setSelectedTrack}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {selectedTrack && (
        <>
          <div className="pageHeader">
            Recommendations for <span>Track: {selectedTrack.name}</span>
          </div>
          <table>
            <thead>{memoizedTrackHeader}</thead>
            <tbody>
              {recommendations.map((track, index) => (
                <TrackResult
                  track={track}
                  index={index}
                  memoizedRenderArtist={memoizedRenderArtist}
                  playTrack={playTrack}
                  memoizedPlaySVG={memoizedPlaySVG}
                  playingTrack={playingTrack}
                  setSelectedTrack={setSelectedTrack}
                />
              ))}
            </tbody>
          </table>
        </>
      )}
      {selectedArtist && (
        <>
          <div className="pageHeader">
            Recommendations for <span>Artist: {selectedArtist.name}</span>
          </div>
          <table>
            <thead>{memoizedArtistHeader}</thead>
            <tbody>
              {recommendations.map((artist, index) => (
                <ArtistResult
                  artist={artist}
                  index={index}
                  memoizedRenderArtist={memoizedRenderArtist}
                  setSelectedArtist={setSelectedArtist}
                />
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default SpotifyRecommendations;
