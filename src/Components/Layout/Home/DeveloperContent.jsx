import React, { useEffect } from "react";
import "./contentStyles.scss";

function DeveloperPane(props) {
  return (
    <pre id={`${props.id}`}>
      <div className="language-header">{props.language}</div>
      {props.content}
    </pre>
  );
}

function DeveloperContent() {
  useEffect(() => {
    const pre = document.querySelector(`.devContent`);

    const rotateElement = (event, element) => {
      const x = event.clientX;
      const y = event.clientY;
      const { innerWidth, innerHeight } = window;

      if (element && window.innerWidth > 767) {
        const rect = element.getBoundingClientRect();
        const middleX = rect.left + rect.width / 2;
        const middleY = rect.top + rect.height / 2;

        const maxDistance = Math.max(
          Math.abs(x - middleX),
          Math.abs(y - middleY),
          Math.abs(innerWidth - x),
          Math.abs(innerHeight - y)
        );

        const offsetX = ((x - middleX) / maxDistance) * 45;
        const offsetY = ((y - middleY) / maxDistance) * 45;

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
  }, []);
  return (
    <div className="devContent">
      <DeveloperPane
        id={"developerContent1"}
        language={"SCSS"}
        content={
          <code className="css">
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
        }
      />
      <DeveloperPane
        id={"developerContent2"}
        language={"Python"}
        content={
          <code className="python">
            <span className="def">
              def
              <span className="functionName">
                {" "}
                theTruth(<span className="argument">name</span>)
              </span>
              <span className="punctuation">:</span>
              <span className="function">
                return{" "}
                <span className="string">
                  f"{"{"}
                  <span className="variable">name</span>
                  {"}"} is a 'human being' with many talents, but none quite as
                  impressive as his ability to break code with just a single
                  line."
                </span>
              </span>
            </span>
            <span className="function">
              print(
              <span className="function">
                theTruth(<span className="argument">"Simpl1f1ed"</span>)
              </span>
              )
            </span>
          </code>
        }
      />
      <DeveloperPane
        id={"developerContent3"}
        language={"JavaScript"}
        content={
          <code className="js">
            <span>
              <span className="variableDec">const</span>
              <span className="variable">Simpl1f1ed</span>
              <span className="operator">=</span>
              <span className="puncuation">{"{"}</span>
            </span>
            <span>
              <span className="variable">  catchPhrases</span>: ()
              <span className="operator">{"=>"}</span>
              <span className="puncuation">{"{"}</span>
            </span>
            <span>
              <span className="variableDec">    const</span>
              <span className="variable">phrases</span>
              <span className="operator">=</span>
              {"["}
            </span>
            <span className="string">
              'My code is so over complicated, I Simpl1f1ed my name to cover it up.',
            </span>
            <span className="string">
              {" "}
              'My code is like a puzzle, but with no solution.',
            </span>
            <span className="string">
              'Debugging my code is like trying to find a needle in a haystack,
              except the needle doesn\'t exist.',
            </span>
            <span className="string">
              {" "}
              'My code is a masterpiece of spaghetti architecture.',
            </span>
            <span>
              {"]"}
              <span className="puncuation">;</span>
            </span>
            <span>
              <span className="variableDec">    const</span>
              <span className="variable">randomIndex</span>
              <span className="operator">=</span>
              <span className="class">Math</span>.
              <span className="function">floor</span>(
              <span className="class">Math</span>.
              <span className="function">random()</span>
              <span className="operator">*</span>
              <span className="variable">phrases</span>.
              <span className="function">length</span>)
              <span className="puncuation">;</span>
            </span>
            <span>
              <span className="function">    return</span>
              <span className="variable"> phrases</span>[
              <span className="variable">randomIndex</span>]
              <span className="puncuation">;</span>
            </span>
            <span>
              <span className="puncuation">{"  }"}</span>
              <span className="puncuation">{"};"}</span>
            </span>
          </code>
        }
      />
    </div>
  );
}

export default DeveloperContent;
