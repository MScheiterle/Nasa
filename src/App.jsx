import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "./Components/Layout/Navbar/Navbar";
import NoPage from "./Components/Layout/NoPage/NoPage";
import Footer from "./Components/Layout/Footer/Footer";
import Home from "./Components/Layout/Home/Home";
import Login from "./Components/Accounts/Login/Login";
import Register from "./Components/Accounts/Register/Register";
import Reset from "./Components/Accounts/Reset/Reset";
import CurvedLine from "./Components/Utils/CurvedLine";

function App() {
  return (
    <div id="app">
      <Router>
        <Navbar />
        <div className="waves">
          <CurvedLine
            strokeColor={"var(--accentOne)"}
            height={200}
            peakCount={7}
          />
          <CurvedLine
            strokeColor={"var(--accentTwo)"}
            height={150}
            peakCount={7}
          />
          <CurvedLine
            strokeColor={"var(--accentThree)"}
            height={100}
            peakCount={7}
          />
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/password_reset" element={<Reset />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}
export default App;
