import React, { useState } from "react";
import Cookies from "js-cookie";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "./Components/Layout/Navbar/Navbar";
import NoPage from "./Components/Layout/NoPage/NoPage";
import Footer from "./Components/Layout/Footer/Footer";
import Home from "./Components/Layout/Home/Home";
import Login from "./Components/Accounts/Login/Login";
import Register from "./Components/Accounts/Register/Register";
import Reset from "./Components/Accounts/Reset/Reset";
import Tutorials from "./Components/Layout/Tutorials/Tutorials";
import Projects from "./Components/Layout/Projects/Projects";
import Profile from "./Components/Accounts/Profile/Profile";
import Tools from "./Components/Layout/Tools/Tools";
import CurvedLine from "./Components/Utils/CurvedLine";
import AcceptCookies from "./Components/Layout/AcceptCookies/AcceptCookies";

function App() {
  const [cookieChosen, setCookieChosen] = useState(
    Cookies.get("Simpl1f1ed.com-cookieSetting")
  );
  const [cookieSettings, setCookieSettings] = useState(
    Cookies.get("Simpl1f1ed.com-cookieSetting")
  );

  function updateCookieSettings(selectedValue) {
    setCookieSettings(selectedValue);
    Cookies.set("Simpl1f1ed.com-cookieSetting", "true", { expires: 365 });
    setCookieChosen(true);
  }

  return (
    <div id="app">
      <Router>
        <Navbar cookieSettings={cookieSettings} />
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
          <Route path="/projects/:page" element={<Projects />} />
          <Route path="/tutorials" element={<Tutorials />} />
          <Route path="/tools" element={<Tools />} />
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
