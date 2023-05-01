import React, { useState, useCallback, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { addCustomFieldToCurrentUser, auth, db } from "./firebase.ts";
import { query, collection, getDocs, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import axios from "axios";

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
import SpotifyMatchRouter from "./Components/Layout/SpotifyMatch/SpotifyMatchRouter.jsx";

function App() {
  const [user, loading] = useAuthState(auth);
  const [name, setName] = useState("");
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

  const fetchData = useCallback(
    async (setData, dataToRetrieve) => {
      try {
        const q = query(collection(db, "users"), where("uid", "==", user?.uid));
        const doc = await getDocs(q);
        const data = doc.docs[0].data();
        setData(data[dataToRetrieve]);
        if (!data.connectionIP || Date.now() > data.ipExpirationTime) {
          const connection = await axios.get(
            "https://api.ipify.org/?format=json"
          );
          const ipExpirationTime = Date.now() + 60 * 60 * 24 * 1000;
          addCustomFieldToCurrentUser("connectionIP", connection.data.ip);
          addCustomFieldToCurrentUser("ipExpirationTime", ipExpirationTime);
        }
      } catch (err) {}
    },
    [user?.uid]
  );

  useEffect(() => {
    if (loading) return () => {};
    const fetchCall = () => (user ? fetchData(setName, "name") : null);

    if (document.readyState === "complete" && user) {
      fetchCall();
    } else {
      window.addEventListener("load", fetchCall, false);
      return () => window.removeEventListener("load", fetchCall);
    }
  }, [user, loading, fetchData]);

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
            path="/spotifymatch/*"
            element={
              <SpotifyMatchRouter
                user={user}
                name={name}
                fetchData={fetchData}
              />
            }
          />
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
