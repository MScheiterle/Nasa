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
  const [selector, setSelector] = useState(0);

  const contentOptions = [
    [
      <pre className="language-css" key={"developer"}>
        <div className="language-header">CSS</div>
        <code className="language-css">
          <span className="selector">.Simpl1f1ed</span>
          <span className="punctuation">{"{"}</span>
          <span className="property">skill</span>
          <span className="punctuation">:</span>
          <span className="value">none</span>
          <span className="punctuation">;</span>
          <span className="property">main-tool</span>
          <span className="punctuation">:</span>
          <span className="value">"Chat-GPT"</span>
          <span className="punctuation">;</span>
          <span className="property">joking</span>
          <span className="punctuation">:</span>
          <span className="value">50</span>
          <span className="value data-type">%</span>
          <span className="punctuation">;</span>
          <span className="punctuation">{"}"}</span>
        </code>
      </pre>,
    ],
  ];

  const arrrowPoints = [
    <circle cx="15.279" cy="14.83" r="14.83" key={1} />,
    <circle cx="59.32" cy="14.83" r="14.83" key={2} />,
    <circle cx="104.261" cy="14.83" r="14.83" key={3} />,
    <circle cx="148.302" cy="14.83" r="14.83" key={4} />,
    <circle cx="59.32" cy="59.769" r="14.83" key={5} />,
    <circle cx="104.261" cy="59.769" r="14.83" key={6} />,
    <circle cx="148.302" cy="59.769" r="14.83" key={7} />,
    <circle cx="192.343" cy="59.769" r="14.83" key={8} />,
    <circle cx="104.261" cy="103.81" r="14.83" key={9} />,
    <circle cx="148.302" cy="103.81" r="14.83" key={10} />,
    <circle cx="192.343" cy="103.81" r="14.83" key={11} />,
    <circle cx="238.238" cy="103.81" r="14.83" key={12} />,
    <circle cx="148.302" cy="147.852" r="14.83" key={13} />,
    <circle cx="192.343" cy="147.852" r="14.83" key={14} />,
    <circle cx="238.238" cy="147.852" r="14.83" key={15} />,
    <circle cx="282.334" cy="147.852" r="14.83" key={16} />,
    <circle cx="104.261" cy="192.79" r="14.831" key={17} />,
    <circle cx="148.302" cy="192.79" r="14.831" key={18} />,
    <circle cx="192.343" cy="192.79" r="14.831" key={19} />,
    <circle cx="238.238" cy="192.79" r="14.831" key={20} />,
    <circle cx="59.32" cy="236.887" r="14.83" key={21} />,
    <circle cx="104.261" cy="236.887" r="14.83" key={22} />,
    <circle cx="148.302" cy="236.887" r="14.83" key={23} />,
    <circle cx="192.343" cy="236.887" r="14.83" key={24} />,
    <circle cx="15.279" cy="282.782" r="14.831" key={25} />,
    <circle cx="59.32" cy="282.782" r="14.831" key={26} />,
    <circle cx="104.261" cy="282.782" r="14.831" key={27} />,
    <circle cx="148.302" cy="282.782" r="14.831" key={28} />,
  ];

  const typingDelay = 100;
  const erasingDelay = 100;

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

  useEffect(() => {
    const pre = document.querySelector("pre");

    const rotateElement = (event, element) => {
      const x = event.clientX;
      const y = event.clientY;

      const rect = element.getBoundingClientRect();
      const middleX = rect.left + rect.width / 2;
      const middleY = rect.top + rect.height / 2;

      const offsetX = ((x - middleX) / middleX) * 45;
      const offsetY = ((y - middleY) / middleY) * 45;

      if (element) {
        element.style.setProperty("--rotateX", offsetX + "deg");
        element.style.setProperty("--rotateY", -1 * offsetY + "deg");
      }
    };

    document.addEventListener("mousemove", (e) => {
      rotateElement(e, pre);
    });

    return () => {
      document.removeEventListener("mousemove", rotateElement);
    };
  }, [selector]);

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
                  setSelector(selector - 1);
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
                <g>{arrrowPoints}</g>
              </svg>
            </span>
            A Passionate&nbsp;
            <span className="typed-text">{typedText}</span>
            <span className={`cursor ${typing ? "typing" : ""}`}></span>
            <span
              className={`arrow right ${typing ? "typing" : ""}`}
              onClick={() => {
                if (!typing) {
                  setSelector(selector + 1);
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
                <g>{arrrowPoints}</g>
              </svg>
            </span>
          </div>
        </div>
      </div>
      <div className="content">{contentOptions[selector]}</div>
    </div>
  );
}

export default Home;
