import React, { useState, useEffect, useCallback } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "./style.scss";

import { auth, db, logout } from "./../../../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";

import { pages } from "./../../../Constants";

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
      <div className="navLink" onClick={() => navigate("/login")}>
        <h1>Login</h1>
      </div>
      <div className="navLink" onClick={() => navigate("/register")}>
        <h1>Register</h1>
      </div>
    </>
  );

  const pageELements = [];

  pages.forEach((element, index) => {
    pageELements.push(
      <div
        className="navLink"
        key={index}
        onClick={() => {
          navigate("/");
          smoothScroll(element.name);
        }}
      >
        <h1>{element.name}</h1>
        <p>{index < 9 ? "0" + (index + 1) : index + 1}</p>
      </div>
    );
  });

  var smoothScroll = function (elementId) {
    var MIN_PIXELS_PER_STEP = 16;
    var MAX_SCROLL_STEPS = 30;
    var target = document.getElementById(elementId);
    var scrollContainer = target;
    do {
      scrollContainer = scrollContainer.parentNode;
      if (!scrollContainer) return;
      scrollContainer.scrollTop += 1;
    } while (scrollContainer.scrollTop === 0);

    var targetY = 0;
    do {
      if (target === scrollContainer) break;
      targetY += target.offsetTop;
    } while ((target = target.offsetParent));

    var pixelsPerStep = Math.max(
      MIN_PIXELS_PER_STEP,
      Math.abs(targetY - scrollContainer.scrollTop) / MAX_SCROLL_STEPS
    );

    var isUp = targetY < scrollContainer.scrollTop;

    var stepFunc = function () {
      if (isUp) {
        scrollContainer.scrollTop = Math.max(
          targetY,
          scrollContainer.scrollTop - pixelsPerStep
        );
        if (scrollContainer.scrollTop <= targetY) {
          return;
        }
      } else {
        scrollContainer.scrollTop = Math.min(
          targetY,
          scrollContainer.scrollTop + pixelsPerStep
        );

        if (scrollContainer.scrollTop >= targetY) {
          return;
        }
      }

      window.requestAnimationFrame(stepFunc);
    };

    window.requestAnimationFrame(stepFunc);
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
    <div id="Navbar" className="Navbar">
      <div
        className="MainLogo navLink"
        onClick={() => {
          navigate("/");
          smoothScroll("Homepage");
        }}
      />
      <div className="projectLinks">{pageELements}</div>
      <div className="userAddon">{userAddon}</div>
    </div>
  );
}

export default Navbar;
