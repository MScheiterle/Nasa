import React, { useState, useCallback, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { auth, db } from "./firebase.ts";
import { query, collection, getDocs, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

import Navbar from "./Components/Layout/Navbar/Navbar";
import NoPage from "./Components/Layout/NoPage/NoPage";
import Footer from "./Components/Layout/Footer/Footer";
import Home from "./Components/Layout/Home/Home";
import Login from "./Components/Accounts/Login/Login";
import Register from "./Components/Accounts/Register/Register";
import Reset from "./Components/Accounts/Reset/Reset";
import Projects from "./Components/Layout/Projects/Projects";
import Profile from "./Components/Accounts/Profile/Profile";
import CurvedLine from "./Components/Utils/CurvedLine";
import AcceptCookies from "./Components/Layout/AcceptCookies/AcceptCookies";
import CookieManager from "./Components/Utils/CookieManager";
import SpotifyMatch from "./Components/Layout/SpotifyMatch/SpotifyMatch";

function App() {
  const [user, loading] = useAuthState(auth);
  const [name, setName] = useState("");
  const [rawUserData, setRawUserData] = useState("");
  const cookieValue = new CookieManager().getCookie(
    "Simpl1f1ed.com-cookieSetting"
  );
  const [cookieChosen, setCookieChosen] = useState(cookieValue ? true : false);

  const updateCookieSettings = useCallback((selectedValue) => {
    if (selectedValue) {
      new CookieManager().setCookiePrime(
        "Simpl1f1ed.com-cookieSetting",
        "true",
        {
          expires: 365,
        }
      );
    }
    setCookieChosen(true);
  }, []);

  const fetchUserName = useCallback(async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
      setRawUserData(data);
    } catch (err) {}
  }, [user?.uid]);

  useEffect(() => {
    if (loading) return () => {};
    const fetchCall = () => (user ? fetchUserName() : null);

    if (document.readyState === "complete" && user) {
      fetchCall();
    } else {
      window.addEventListener("load", fetchCall, false);
      return () => window.removeEventListener("load", fetchCall);
    }
  }, [user, loading, fetchUserName]);

  return (
    <div id="app">
      <Router>
        <Navbar user={user} name={name} />
        <div className="waves">
          <CurvedLine strokeColor={"var(--accentOne)"} height={200} />
          <CurvedLine strokeColor={"var(--accentTwo)"} height={150} />
          <CurvedLine strokeColor={"var(--accentThree)"} height={100} />
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/password_reset" element={<Reset />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/projects" element={<Projects />} />
          <Route
            path="/spotifymatch"
            element={
              <SpotifyMatch
                user={user}
                name={name}
                spotifyToken={rawUserData.spotifyToken}
                spotifyTokenExpiration={rawUserData.spotifyTokenExpiration}
              />
            }
          />
          <Route path="/spotifymatch/user_stats" element={<></>} />
          <Route path="/spotifymatch/compare_stats" element={<></>} />
          <Route path="*" element={<NoPage />} />
        </Routes>
        {cookieChosen ? (
          <></>
        ) : (
          <AcceptCookies handleCookieSettingChange={updateCookieSettings} />
        )}
        <Footer />
      </Router>
    </div>
  );
}

export default App;
