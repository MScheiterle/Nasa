import React, { useEffect, useState } from "react";
import {
  addCustomFieldToCurrentUser,
  getCurrentUserData,
  getUserDataByUID,
  addCustomFieldToUserByUID,
} from "../../../../firebase.ts";
import SpotifyUserStats from "../SpotifyUserStats/SpotifyUserStats.jsx";
import "./style.scss";
import { encode } from "base-64";
import axios from "axios";

function EnableSharingComp({ setSharingEnabled }) {
  return (
    <div className="enableSharing">
      <div className="title">Enable Sharing?</div>
      <div className="desc">
        This will allow you to <span>Share Your Data With Friends</span> and{" "}
        <span>Create Playlists Together</span>
      </div>
      <button
        onClick={() => {
          setSharingEnabled(true);
          addCustomFieldToCurrentUser("sharingEnabled", true, "private");
        }}
      >
        <span>Sign Me Up!</span>
      </button>
    </div>
  );
}

function CreateNewConnection({ user, spotifyToken, handleAddConnection }) {
  const [profileData, setProfileData] = useState(null);
  const [profileResults, setProfileResults] = useState(null);
  const [matchCode, setMatchCode] = useState(null);
  const [matchLoading, setMatchLoading] = useState(false);

  const handleLookup = async () => {
    setMatchLoading(true);
    if (matchCode === user.uid) {
      setMatchLoading(false);
      return
    }
    const publicUserInfo = await getUserDataByUID(
      matchCode,
      "SpotifyPublic",
      "public"
    );
    setProfileResults(publicUserInfo);
    setMatchLoading(false);
  };

  const handleCopyClick = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${spotifyToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setProfileData(data);
      })
      .catch((error) => console.log(error));
  }, [spotifyToken]);

  return (
    <div className="newMatch">
      <div className="users">
        <div className="user">
          {profileData && profileData.display_name && (
            <>
              <div className="userName">{profileData.display_name}</div>
              <img
                className="profilePicture"
                src={profileData.images[0].url}
                alt={profileData.display_name}
              />
            </>
          )}
          <div className="searchBar">
            <span>{user.uid} </span>
            <label className="inputName">Your's</label>
            <div
              className="svgContainer"
              onClick={() => handleCopyClick(user.uid)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M272 0H396.1c12.7 0 24.9 5.1 33.9 14.1l67.9 67.9c9 9 14.1 21.2 14.1 33.9V336c0 26.5-21.5 48-48 48H272c-26.5 0-48-21.5-48-48V48c0-26.5 21.5-48 48-48zM48 128H192v64H64V448H256V416h64v48c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V176c0-26.5 21.5-48 48-48z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="user">
          {profileResults ? (
            <>
              <div className="userName">{profileResults[0]}</div>
              <img
                className="profilePicture"
                src={profileResults[2]}
                alt={profileResults[0]}
              />
            </>
          ) : (
            <svg
              className="profilePicture"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
            >
              <path d="M80 160c0-35.3 28.7-64 64-64h32c35.3 0 64 28.7 64 64v3.6c0 21.8-11.1 42.1-29.4 53.8l-42.2 27.1c-25.2 16.2-40.4 44.1-40.4 74V320c0 17.7 14.3 32 32 32s32-14.3 32-32v-1.4c0-8.2 4.2-15.8 11-20.2l42.2-27.1c36.6-23.6 58.8-64.1 58.8-107.7V160c0-70.7-57.3-128-128-128H144C73.3 32 16 89.3 16 160c0 17.7 14.3 32 32 32s32-14.3 32-32zm80 320a40 40 0 1 0 0-80 40 40 0 1 0 0 80z" />
            </svg>
          )}
          <div className="searchBar">
            <input
              id="matchCode"
              type="text"
              placeholder="Match Code"
              onChange={(e) => {
                setMatchCode(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleLookup();
                }
              }}
            />
            <label htmlFor="matchCode" className="inputName">
              Friend's
            </label>
            <div className="svgContainer" onClick={() => handleLookup()}>
              {!matchLoading ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 120 120"
                  className="loader"
                >
                  <circle
                    cx="60"
                    cy="60"
                    r="45"
                    strokeWidth="10"
                    fill="none"
                    className="mainCircle"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="45"
                    strokeWidth="10"
                    stroke="url(#gradient)"
                    fill="none"
                    className="animate secondCircle"
                  />
                </svg>
              )}
            </div>
          </div>
        </div>
      </div>
      {user.uid !== matchCode && profileResults && (
        <div
          className="shareText"
          onClick={(event) => {
            handleAddConnection(event, matchCode);
          }}
        >
          Share data with <span>{profileResults[0]}?</span>
        </div>
      )}
    </div>
  );
}

function ConnectedComp({ uid, setSelectedUser, handleRemoveConnection }) {
  const [loading, setLoading] = useState(false);
  const [connectionData, setConnectionData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const publicUserInfo = await getUserDataByUID(
        uid,
        "SpotifyPublic",
        "public"
      );
      setConnectionData(publicUserInfo);
      setLoading(false);
    };
    fetchData();
  }, [uid]);

  return (
    <div
      onClick={() => {
        !loading && setSelectedUser(uid);
      }}
    >
      {!loading ? (
        <div
          onClick={() => {
            setSelectedUser(uid);
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
          </svg>
          <span>{connectionData[0]}</span>
          <svg
            className="close"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 512"
            onClick={(event) => {
              handleRemoveConnection(event, uid);
            }}
          >
            <title>Close Connection</title>
            <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" />
          </svg>
        </div>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 120 120"
          className="loader"
        >
          <circle
            cx="60"
            cy="60"
            r="45"
            strokeWidth="10"
            fill="none"
            className="mainCircle"
          />
          <circle
            cx="60"
            cy="60"
            r="45"
            strokeWidth="10"
            stroke="url(#gradient)"
            fill="none"
            className="animate secondCircle"
          />
        </svg>
      )}
    </div>
  );
}

const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;
const authString = `${CLIENT_ID}:${CLIENT_SECRET}`;
const base64Auth = encode(authString);

function DisplayUserData({ userID }) {
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    async function fetchToken() {
      setLoading(true);
      const privateSpotifyTokenExpiration = await getUserDataByUID(
        userID,
        "spotifyTokenExpiration",
        "spotify"
      );
      if (privateSpotifyTokenExpiration < Date.now()) {
        const privateUserRefreshToken = await getUserDataByUID(
          userID,
          "spotifyRefreshToken",
          "spotify"
        );
        const response = await axios.post(
          "https://accounts.spotify.com/api/token",
          `grant_type=refresh_token&refresh_token=${privateUserRefreshToken}`,
          {
            headers: {
              Authorization: `Basic ${base64Auth}`,
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );
        addCustomFieldToUserByUID(
          userID,
          "spotifyToken",
          response.data.access_token,
          "spotify"
        );
        addCustomFieldToUserByUID(
          userID,
          "spotifyTokenExpiration",
          Date.now() + 60 * 55 * 1000,
          "spotify"
        );
        setToken(response.data.access_token);
        setLoading(false);
      } else {
        const privateUserSpotifyToken = await getUserDataByUID(
          userID,
          "spotifyToken",
          "spotify"
        );
        setToken(privateUserSpotifyToken);
        setLoading(false);
      }
    }

    fetchToken();
  }, [userID]);

  return (
    <div className={`DisplayUserData ${!token && "centered"}`}>
      {!loading ? (
        <>
          {token ? (
            <SpotifyUserStats spotifyToken={token} shared={true} />
          ) : (
            <div>You dont have this user's permission to view their data</div>
          )}
        </>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 120 120"
          className="loader"
        >
          <circle
            cx="60"
            cy="60"
            r="45"
            strokeWidth="10"
            fill="none"
            className="mainCircle"
          />
          <circle
            cx="60"
            cy="60"
            r="45"
            strokeWidth="10"
            stroke="url(#gradient)"
            fill="none"
            className="animate secondCircle"
          />
        </svg>
      )}
    </div>
  );
}

function SpotifyCompareStats({ user, spotifyToken }) {
  const [sharingEnabled, setSharingEnabled] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [sharedData, setSharedData] = useState([]);

  useEffect(() => {
    const fetchCall = async () => {
      setSharingEnabled(await getCurrentUserData("sharingEnabled", "private"));
      setSharedData(await getCurrentUserData("dataSharedWith", "public"));
    };

    if (document.readyState === "complete" && user) {
      fetchCall();
    } else {
      window.addEventListener("load", fetchCall, false);
      return () => window.removeEventListener("load", fetchCall);
    }
  }, [user]);

  const handleRemoveConnection = (event, uid) => {
    addCustomFieldToCurrentUser("dataSharedWith", uid, "public", true);
    setSharedData(sharedData.filter((elem) => elem !== uid));
    event.stopPropagation();
  };

  const handleAddConnection = (event, uid) => {
    addCustomFieldToCurrentUser("dataSharedWith", [uid], "public");
    !sharedData.includes(uid) && setSharedData([...sharedData, uid]);
    event.stopPropagation();
  };

  return (
    <div id="SpotifyCompareStats" className="page">
      <div className={`sideBar ${spotifyToken ? "" : "centered"}`}>
        {!spotifyToken ? (
          <>Connect Your Spotify Account</>
        ) : (
          <>
            <div
              className="toggler"
              onClick={(event) => {
                event.currentTarget.parentElement.classList.toggle("toggled");
                event.stopPropagation();
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <title>Collapse sidebar</title>
                <path d="M0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM241 377c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l87-87-87-87c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L345 239c9.4 9.4 9.4 24.6 0 33.9L241 377z" />
              </svg>
            </div>
            <div
              onClick={() => {
                setSelectedUser(null);
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
              </svg>
              <span>New Connection</span>
            </div>
            <div className="sep">
              <span>Shared With</span>
            </div>
            {sharedData &&
              Array.isArray(sharedData) &&
              sharedData.map((elem) => (
                <ConnectedComp
                  key={elem}
                  uid={elem}
                  setSelectedUser={setSelectedUser}
                  handleRemoveConnection={handleRemoveConnection}
                />
              ))}
          </>
        )}
      </div>
      <div
        className={`content ${
          !spotifyToken || !selectedUser || !sharingEnabled ? "centered" : ""
        }`}
      >
        {!spotifyToken || !user ? (
          <>Connect Your Spotify Account</>
        ) : !sharingEnabled ? (
          <EnableSharingComp setSharingEnabled={setSharingEnabled} />
        ) : selectedUser ? (
          <DisplayUserData userID={selectedUser} />
        ) : (
          <CreateNewConnection
            user={user}
            spotifyToken={spotifyToken}
            handleAddConnection={handleAddConnection}
          />
        )}
      </div>
    </div>
  );
}

export default SpotifyCompareStats;
