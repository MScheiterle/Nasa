import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import "./style.scss";

function Home() {
  const [typedText, setTypedText] = useState("");
  const [typing, setTyping] = useState(false);
  const [textArrayIndex, setTextArrayIndex] = useState(0);

  const typingDelay = 100;
  const erasingDelay = 100;
  const newtextDelay = 2000;

  let charIndex = 0;
  let timeoutID = useRef();
  let typedTextRef = useRef("");
  const textArray = useMemo(
    () => [
      "Developer",
      "Graphics Hobbyist",
      "Gamer",
      "Music Lover",
      "Educator",
      "Learner",
    ],
    []
  );

  useEffect(() => {
    typedTextRef.current = typedText;
  }, [typedText]);

  const type = useCallback(() => {
    if (charIndex < textArray[textArrayIndex].length) {
      setTyping(true);
      setTypedText(textArray[textArrayIndex].substring(0, charIndex + 1));
      charIndex++;
      timeoutID.current = setTimeout(type, typingDelay);
    } else {
      setTyping(false);
    }
  }, [charIndex, textArrayIndex, textArray]);

  function erase(goingUp) {
    if (typedTextRef.current.length > 0) {
      setTyping(true);
      setTypedText(
        textArray[textArrayIndex].substring(0, typedTextRef.current.length - 1)
      );
      typedTextRef.current = typedTextRef.current.substring(
        0,
        typedTextRef.current.length - 1
      );
      timeoutID.current = setTimeout(() => erase(goingUp), erasingDelay);
    } else {
      setTyping(false);
      if (goingUp && textArrayIndex >= textArray.length - 1) {
        setTextArrayIndex(0);
      } else if (!goingUp && textArrayIndex <= 0) {
        setTextArrayIndex(textArray.length - 1);
      } else {
        setTextArrayIndex(goingUp ? textArrayIndex + 1 : textArrayIndex - 1);
      }
      timeoutID.current = setTimeout(() => type(), typingDelay + 1100);
    }
  }

  useEffect(() => {
    timeoutID.current = setTimeout(() => type());

    return () => {
      clearTimeout(timeoutID.current);
      setTyping(false);
    };
  }, [type]);

  return (
    <div id="Home" className="page">
      <div className="header center">
        <div className="name">
          Simpl1f1ed
          <div className="description">
            <span
              className={`arrow left ${typing ? "typing" : ""}`}
              onClick={() => {
                if (!typing) {
                  erase(false);
                }
              }}
            >
              <svg
                fill="#000000"
                height="64px"
                width="64px"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="-29.76 -29.76 357.13 357.13"
                className={`left ${typing ? "typing" : ""}`}
              >
                <g>
                  <circle cx="15.279" cy="14.83" r="14.83" />
                  <circle cx="59.32" cy="14.83" r="14.83" />
                  <circle cx="104.261" cy="14.83" r="14.83" />
                  <circle cx="148.302" cy="14.83" r="14.83" />
                  <circle cx="59.32" cy="59.769" r="14.83" />
                  <circle cx="104.261" cy="59.769" r="14.83" />
                  <circle cx="148.302" cy="59.769" r="14.83" />
                  <circle cx="192.343" cy="59.769" r="14.83" />
                  <circle cx="104.261" cy="103.81" r="14.83" />
                  <circle cx="148.302" cy="103.81" r="14.83" />
                  <circle cx="192.343" cy="103.81" r="14.83" />
                  <circle cx="238.238" cy="103.81" r="14.83" />
                  <circle cx="148.302" cy="147.852" r="14.83" />
                  <circle cx="192.343" cy="147.852" r="14.83" />
                  <circle cx="238.238" cy="147.852" r="14.83" />
                  <circle cx="282.334" cy="147.852" r="14.83" />
                  <circle cx="104.261" cy="192.79" r="14.831" />
                  <circle cx="148.302" cy="192.79" r="14.831" />
                  <circle cx="192.343" cy="192.79" r="14.831" />
                  <circle cx="238.238" cy="192.79" r="14.831" />
                  <circle cx="59.32" cy="236.887" r="14.83" />
                  <circle cx="104.261" cy="236.887" r="14.83" />
                  <circle cx="148.302" cy="236.887" r="14.83" />
                  <circle cx="192.343" cy="236.887" r="14.83" />
                  <circle cx="15.279" cy="282.782" r="14.831" />
                  <circle cx="59.32" cy="282.782" r="14.831" />
                  <circle cx="104.261" cy="282.782" r="14.831" />
                  <circle cx="148.302" cy="282.782" r="14.831" />
                </g>
              </svg>
            </span>
            A Passionate&nbsp;
            <span className="typed-text">{typedText}</span>
            <span className={`cursor ${typing ? "typing" : ""}`}></span>
            <span
              className={`arrow right ${typing ? "typing" : ""}`}
              onClick={() => {
                if (!typing) {
                  erase(true);
                }
              }}
            >
              <svg
                fill="#000000"
                height="64px"
                width="64px"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="-29.76 -29.76 357.13 357.13"
                className={`right ${typing ? "typing" : ""}`}
              >
                <g>
                  <circle cx="15.279" cy="14.83" r="14.83" />
                  <circle cx="59.32" cy="14.83" r="14.83" />
                  <circle cx="104.261" cy="14.83" r="14.83" />
                  <circle cx="148.302" cy="14.83" r="14.83" />
                  <circle cx="59.32" cy="59.769" r="14.83" />
                  <circle cx="104.261" cy="59.769" r="14.83" />
                  <circle cx="148.302" cy="59.769" r="14.83" />
                  <circle cx="192.343" cy="59.769" r="14.83" />
                  <circle cx="104.261" cy="103.81" r="14.83" />
                  <circle cx="148.302" cy="103.81" r="14.83" />
                  <circle cx="192.343" cy="103.81" r="14.83" />
                  <circle cx="238.238" cy="103.81" r="14.83" />
                  <circle cx="148.302" cy="147.852" r="14.83" />
                  <circle cx="192.343" cy="147.852" r="14.83" />
                  <circle cx="238.238" cy="147.852" r="14.83" />
                  <circle cx="282.334" cy="147.852" r="14.83" />
                  <circle cx="104.261" cy="192.79" r="14.831" />
                  <circle cx="148.302" cy="192.79" r="14.831" />
                  <circle cx="192.343" cy="192.79" r="14.831" />
                  <circle cx="238.238" cy="192.79" r="14.831" />
                  <circle cx="59.32" cy="236.887" r="14.83" />
                  <circle cx="104.261" cy="236.887" r="14.83" />
                  <circle cx="148.302" cy="236.887" r="14.83" />
                  <circle cx="192.343" cy="236.887" r="14.83" />
                  <circle cx="15.279" cy="282.782" r="14.831" />
                  <circle cx="59.32" cy="282.782" r="14.831" />
                  <circle cx="104.261" cy="282.782" r="14.831" />
                  <circle cx="148.302" cy="282.782" r="14.831" />
                </g>
              </svg>
            </span>
          </div>
        </div>
      </div>
      <div className="content"></div>
    </div>
  );
}

export default Home;
