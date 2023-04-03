import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import DeveloperContent from "./DeveloperContent";
import "./style.scss";

function Home() {
  const [typedText, setTypedText] = useState("");
  const [typing, setTyping] = useState(false);
  const [textArrayIndex, setTextArrayIndex] = useState(0);

  const contentOptions = [<DeveloperContent />];
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
    function erase(goingUp) {
      if (typedTextRef.current.length > 0) {
        setTyping(true);
        setTypedText(
          textArray[textArrayIndex].substring(
            0,
            typedTextRef.current.length - 1
          )
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

    if (charIndex < textArray[textArrayIndex].length) {
      setTyping(true);
      setTypedText(textArray[textArrayIndex].substring(0, charIndex + 1));
      charIndex++;
      timeoutID.current = setTimeout(type, typingDelay);
    } else {
      setTyping(false);
      timeoutID.current = setTimeout(erase, 2000); // Auto swtich since I have no other options in the content section
    }
  }, [charIndex, textArrayIndex, textArray]);

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
          Simpl<span>1</span>f<span>1</span>ed
          <div className="description">
            A Passionate&nbsp;
            <span className="typed-text">{typedText}</span>
            <span className={`cursor ${typing ? "typing" : ""}`}></span>
          </div>
        </div>
      </div>
      <div className="content">{contentOptions[0]}</div>
    </div>
  );
}

export default Home;
