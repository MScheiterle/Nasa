import React, { useState, useEffect, useCallback } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "./style.scss";

import { auth, db, logout } from "../../../firebase.ts";
import { query, collection, getDocs, where } from "firebase/firestore";

import { navLinks } from "../../../Constants.ts";
import CurvedLine from "../../Utils/CurvedLine";

function HSLColorSelector() {
  const [color, setColor] = useState({ h: 0, s: 100, l: 50 });
  const [colorVar, setColorVar] = useState();
  const propertyNames = [
    "textColor",
    "background",
    "accentOne",
    "accentTwo",
    "accentThree",
    "accentFour",
    "accentFive",
    "accentSix",
  ];
  const colorDiamater = 100;

  const setColorToVar = () => {
    document.body.style.setProperty(
      `--${propertyNames[colorVar - 1]}`,
      getHueColor(color.h)
    );
  };

  const getHueColor = (hue) => {
    return `hsl(${hue}, ${color.s}%, ${color.l}%)`;
  };

  const getHueAngle = (x, y) => {
    const centerX = colorDiamater / 2;
    const centerY = colorDiamater / 2;
    const dx = x - centerX;
    const dy = y - centerY;
    const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
    return angle < 0 ? angle + 360 : angle;
  };

  const handleMouseDown = (event) => {
    const hueAngle = getHueAngle(
      event.nativeEvent.offsetX,
      event.nativeEvent.offsetY
    );
    setColor({ ...color, h: hueAngle });
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (event) => {
    const hueAngle = getHueAngle(
      event.nativeEvent.offsetX,
      event.nativeEvent.offsetY
    );
    setColor({ ...color, h: hueAngle });
  };

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const handleOptionChange = (e) => {
    let options = [...document.getElementsByClassName("variableOption")];

    options.forEach((element) => {
      element.classList.remove("active");
    });

    e.target.classList.add("active");
  };

  return (
    <div className="dropDown">
      <div className="warnings">
        <div style={{ marginBottom: "5px" }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512">
            <path d="M72 64c0-17.7-14.3-32-32-32S8 46.3 8 64V320c0 17.7 14.3 32 32 32s32-14.3 32-32V64zM40 480a40 40 0 1 0 0-80 40 40 0 1 0 0 80z" />
          </svg>
          <span>Color changes are temporary.</span>
        </div>
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512">
            <path d="M72 64c0-17.7-14.3-32-32-32S8 46.3 8 64V320c0 17.7 14.3 32 32 32s32-14.3 32-32V64zM40 480a40 40 0 1 0 0-80 40 40 0 1 0 0 80z" />
          </svg>
          <span>Overwrites Dark/Light modes.</span>
        </div>
      </div>
      <div className="upperSection">
        <div
          style={{
            position: "relative",
            width: `${colorDiamater}px`,
            height: `${colorDiamater}px`,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: `${colorDiamater}px`,
              height: `${colorDiamater}px`,
              borderRadius: "50%",
              background: `conic-gradient(from 90deg,
            hsl(0, ${color.s}%, ${color.l}%),
            hsl(60, ${color.s}%, ${color.l}%),
            hsl(120, ${color.s}%, ${color.l}%),
            hsl(180, ${color.s}%, ${color.l}%),
            hsl(240, ${color.s}%, ${color.l}%),
            hsl(300, ${color.s}%, ${color.l}%),
            hsl(360, ${color.s}%, ${color.l}%)
          )`,
              cursor: "crosshair",
            }}
            onMouseDown={handleMouseDown}
          ></div>
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: `${colorDiamater / 2}px`,
              height: `${colorDiamater / 2}px`,
              borderRadius: "50%",
              border: "5px solid var(--accentSix)",
              transform: "translate(-50%, -50%)",
              background: `${getHueColor(color.h)}`,
            }}
          ></div>
        </div>
        <div className="variableOptions">
          <div
            className={"variableOption"}
            onClick={(e) => {
              setColorVar(1);
              handleOptionChange(e);
            }}
          >
            {propertyNames[0]}
          </div>
          <div
            className={"variableOption"}
            onClick={(e) => {
              setColorVar(2);
              handleOptionChange(e);
            }}
          >
            {propertyNames[1]}
          </div>
          <div
            className={"variableOption"}
            onClick={(e) => {
              setColorVar(3);
              handleOptionChange(e);
            }}
          >
            {propertyNames[2]}
          </div>
          <div
            className={"variableOption"}
            onClick={(e) => {
              setColorVar(4);
              handleOptionChange(e);
            }}
          >
            {propertyNames[3]}
          </div>
          <div
            className={"variableOption"}
            onClick={(e) => {
              setColorVar(5);
              handleOptionChange(e);
            }}
          >
            {propertyNames[4]}
          </div>
          <div
            className={"variableOption"}
            onClick={(e) => {
              setColorVar(6);
              handleOptionChange(e);
            }}
          >
            {propertyNames[5]}
          </div>
          <div
            className={"variableOption"}
            onClick={(e) => {
              setColorVar(7);
              handleOptionChange(e);
            }}
          >
            {propertyNames[6]}
          </div>
          <div
            className={"variableOption"}
            onClick={(e) => {
              setColorVar(8);
              handleOptionChange(e);
            }}
          >
            {propertyNames[7]}
          </div>
        </div>
      </div>
      <div className="sliders" style={{ marginTop: "10px" }}>
        <label>
          Saturation
          <input
            type="range"
            min="0"
            max="100"
            value={color.s}
            onChange={(e) =>
              setColor({ ...color, s: parseInt(e.target.value) })
            }
          />
        </label>
        <label>
          Lightness
          <input
            type="range"
            min="0"
            max="100"
            value={color.l}
            onChange={(e) =>
              setColor({ ...color, l: parseInt(e.target.value) })
            }
          />
        </label>
      </div>
      <div
        style={{ textAlign: "center", marginTop: "10px" }}
        onClick={setColorToVar}
      >
        {colorVar ? (
          <div style={{ cursor: "pointer" }}>
            Save To "{`${propertyNames[colorVar - 1]}`}"{" "}
          </div>
        ) : (
          <>Select Variable</>
        )}
      </div>
    </div>
  );
}

function Navbar() {
  const [user, loading] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();

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
      <div className="userAddon addon hasDropDown">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
        </svg>
        <div className="dropDown">
          <div
            onClick={() => {
              navigate("/Profile");
            }}
          >
            Profile
          </div>
          <div onClick={() => logout()}>Logout</div>
          <div>{name}</div>
        </div>
      </div>
    </>
  ) : (
    <div className="addonGroup">
      <div
        onClick={() => {
          navigate("/login");
          handlePageChange();
          setTimeout(() => {
            smoothScroll("Login");
          }, 150);
        }}
      >
        <div>Login</div>
      </div>
      <div
        onClick={() => {
          navigate("/register");
          handlePageChange();
          setTimeout(() => {
            smoothScroll("Register");
          }, 150);
        }}
      >
        <div>Register</div>
      </div>
    </div>
  );

  const themesAddon = (
    <div className="themeAddon addon hasDropDown">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
        <path d="M192 64L160 0H128L96 64 64 0H48C21.5 0 0 21.5 0 48V256H384V48c0-26.5-21.5-48-48-48H224L192 64zM0 288v32c0 35.3 28.7 64 64 64h64v64c0 35.3 28.7 64 64 64s64-28.7 64-64V384h64c35.3 0 64-28.7 64-64V288H0zM192 432a16 16 0 1 1 0 32 16 16 0 1 1 0-32z" />
      </svg>
      <HSLColorSelector />
    </div>
  );

  const lightModeAddon = (
    <>
      <svg
        className="light"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
      >
        <path d="M361.5 1.2c5 2.1 8.6 6.6 9.6 11.9L391 121l107.9 19.8c5.3 1 9.8 4.6 11.9 9.6s1.5 10.7-1.6 15.2L446.9 256l62.3 90.3c3.1 4.5 3.7 10.2 1.6 15.2s-6.6 8.6-11.9 9.6L391 391 371.1 498.9c-1 5.3-4.6 9.8-9.6 11.9s-10.7 1.5-15.2-1.6L256 446.9l-90.3 62.3c-4.5 3.1-10.2 3.7-15.2 1.6s-8.6-6.6-9.6-11.9L121 391 13.1 371.1c-5.3-1-9.8-4.6-11.9-9.6s-1.5-10.7 1.6-15.2L65.1 256 2.8 165.7c-3.1-4.5-3.7-10.2-1.6-15.2s6.6-8.6 11.9-9.6L121 121 140.9 13.1c1-5.3 4.6-9.8 9.6-11.9s10.7-1.5 15.2 1.6L256 65.1 346.3 2.8c4.5-3.1 10.2-3.7 15.2-1.6zM160 256a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zm224 0a128 128 0 1 0 -256 0 128 128 0 1 0 256 0z" />
      </svg>
      <svg
        className="dark"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 384 512"
      >
        <path d="M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z" />
      </svg>
    </>
  );

  const pageLinks = [];

  const handlePageChange = (e) => {
    let navItems = [...document.getElementsByClassName("navItem")];

    navItems.forEach((element) => {
      element.classList.remove("active");
    });

    e ? e.target.classList.add("active") : <></>;
  };

  navLinks.forEach((element, index) => {
    pageLinks.push(
      <div
        className="navItem center"
        key={index}
        onClick={(e) => {
          navigate(element.link ? element.destination : "/");
          handlePageChange(e);
          setTimeout(() => {
            smoothScroll(element.name);
          }, 150);
        }}
      >
        {element.name}
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
        className="MainLogo"
        onClick={() => {
          navigate("/");
          handlePageChange();
          setTimeout(() => {
            smoothScroll("Homepage");
          }, 150);
        }}
      >
        <div className="logoImage">
          <svg
            id="Layer_1"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <polygon points="187.5 99.64 187.5 178.74 187.47 178.76 118.94 218.33 118.93 218.33 118.93 139.19 187.47 99.62 187.5 99.64" />
            <polygon points="461.63 178.76 393.09 218.33 324.59 178.78 324.59 178.74 324.55 178.76 256.01 139.19 187.5 99.64 187.5 99.6 256.01 60.05 324.55 99.62 324.59 99.64 393.09 139.19 461.63 178.76" />
            <polygon points="393.09 297.48 324.59 337.03 324.55 337.05 256.01 297.48 187.5 257.92 187.5 257.89 187.47 257.91 118.94 218.33 187.47 178.76 187.5 178.78 256.01 218.33 324.55 257.91 324.59 257.92 393.09 297.48" />
            <polygon points="393.09 297.48 393.09 376.62 324.59 416.16 324.59 337.03 393.09 297.48" />
            <polygon points="324.55 416.19 256.01 455.75 187.5 416.21 187.5 416.17 187.49 416.19 118.94 376.62 118.93 376.62 118.93 376.6 50.42 337.05 50.42 337.03 118.93 297.48 187.47 337.05 187.5 337.07 256.01 376.62 324.55 416.19" />
          </svg>
        </div>
        <div className="logoText">
          <div>impl1f1ed</div>
        </div>
      </div>
      <div className="pageLinks">{pageLinks}</div>
      <div className="addons">
        {userAddon}
        {themesAddon}
        <div
          className="lightModeAddon addon darkMode"
          onClick={() => {
            document.body.classList.toggle("lightMode");
            document.body.classList.toggle("darkMode");
            document
              .querySelector(".lightModeAddon")
              .classList.toggle("lightMode");
            document
              .querySelector(".lightModeAddon")
              .classList.toggle("darkMode");
          }}
        >
          {lightModeAddon}
        </div>
        <div
          className="menuAddon addon"
          onClick={() => {
            document.getElementById("Navbar").classList.toggle("mobileToggle");
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
