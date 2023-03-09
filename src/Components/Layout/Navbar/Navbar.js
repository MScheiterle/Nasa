import React, { useState, useEffect, useCallback } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "./style.scss";

import { auth, db, logout } from "./../../../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";

import { navLinks } from "./../../../Constants";

function Navbar() {
  const [user, loading] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  onscroll = (event) => {
    if (window.scrollY === 0) {
      document.getElementById("Navbar").classList.remove("scrolled");
    } else {
      document.getElementById("Navbar").classList.add("scrolled");
    }
  };

  const fetchUserName = useCallback(async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
    } catch (err) {
      alert("An error occured while fetching user data");
    }
  }, [user?.uid]);

  const userAddon = user ? (
    <>
      <div className="navLink userName">{<h1>{name}</h1>}</div>
      <div className="navLink" onClick={() => logout()}>
        {<h1>Logout</h1>}
      </div>
    </>
  ) : (
    <>
      <div
        className="navLink"
        onClick={() => {
          navigate("/login");
          setTimeout(() => {
            smoothScroll("Login");
          }, 150);
        }}
      >
        <h1>Login</h1>
      </div>
      <div className="navLink" onClick={() => {
          navigate("/register");
          setTimeout(() => {
            smoothScroll("Register");
          }, 150);
        }}>
        <h1>Register</h1>
      </div>
    </>
  );

  const pageELements = [];

  navLinks.forEach((element, index) => {
    pageELements.push(
      <div
        className="navLink"
        key={index}
        onClick={() => {
          navigate(element.link ? element.destination : "/");
          setTimeout(() => {
            smoothScroll(element.name);
          }, 150);
        }}
      >
        <h1>{element.name}</h1>
        <p>{index < 9 ? "0" + (index + 1) : index + 1}</p>
      </div>
    );
  });

  var smoothScroll = function (elementId) {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

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
    <div id="Navbar">
      <div
        className="MainLogo navLink"
        onClick={() => {
          navigate("/");
          setTimeout(() => {
            smoothScroll("Homepage");
          }, 150);
        }}
      />
      <div className="projectLinks">{pageELements}</div>
      <div className="userAddon">{userAddon}</div>
      <div
        className="menuButton"
        onClick={() => {
          document.getElementById("Navbar").classList.toggle("mobileToggle");
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
        </svg>
      </div>
    </div>
  );
}

export default Navbar;
