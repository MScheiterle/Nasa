import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "./Components/Layout/Navbar/Navbar";
import Home from "./Components/Layout/Home/Home";
import Footer from "./Components/Layout/Footer/Footer";
import Login from "./Components/Accounts/Login/Login";
import Register from "./Components/Accounts/Register/Register";
import Reset from "./Components/Accounts/Reset/Reset";
import NoPage from "./Components/Layout/NoPage/NoPage";
import QuickMaths from "./Components/QuickMaths/QuickMaths";

function App() {
  useEffect(() => {
    const onPageLoad = () => {
      setTimeout(() => {
        const ele = document.getElementById("loading-indicator");
        if (ele) {
          ele.classList.add("available");
          ele.outerHTML = "";
        }
      }, 1000);
    };

    if (document.readyState === "complete") {
      onPageLoad();
    } else {
      window.addEventListener("load", onPageLoad, false);
      return () => window.removeEventListener("load", onPageLoad);
    }
  }, []);

  return (
    <div className="app">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/password_reset" element={<Reset />} />
          <Route path="/QuickMaths" element={<QuickMaths />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}
export default App;