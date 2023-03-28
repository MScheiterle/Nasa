import React, { useState, useEffect } from "react";
import "./style.scss";

function Home() {
  const [typedText, setTypedText] = useState("");
  const [typing, setTyping] = useState(false);

  const typingDelay = 100;
  const erasingDelay = 100;
  const newTextDelay = 1000;
  let charIndex = 0;

  useEffect(() => {
    const textArray = [
      "Developer",
      "Graphics Hobbyist",
      "Gamer",
      "Music Lover",
      "Educator",
      "Learner",
    ];
    let textArrayIndex = 0;
    let timeoutID;
    function type() {
      if (charIndex < textArray[textArrayIndex].length) {
        setTyping(true);
        setTypedText(textArray[textArrayIndex].substring(0, charIndex + 1));
        charIndex++;
        timeoutID = setTimeout(type, typingDelay);
      } else {
        setTyping(false);
        setTimeout(erase, newTextDelay);
      }
    }
    function erase() {
      if (charIndex > 0) {
        setTyping(true);
        setTypedText(textArray[textArrayIndex].substring(0, charIndex - 1));
        charIndex--;
        timeoutID = setTimeout(erase, erasingDelay);
      } else {
        setTyping(false);
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) {
          textArrayIndex = 0;
        }
        timeoutID = setTimeout(type, typingDelay + 1100);
      }
    }
    if (textArray.length) {
      timeoutID = setTimeout(type, newTextDelay + 250);
    }
    return () => clearTimeout(timeoutID);
  }, [charIndex]);

  return (
    <div id="Home" className="page">
      <div className="header">
        <div className="name">Simpl1f1ed</div>
        <div className="description">
          A Passionate&nbsp;
          <span className="typed-text">{typedText}</span>
          <span className={`cursor ${typing ? "typing" : ""}`}></span>
        </div>
      </div>
    </div>
  );
}

export default Home;
