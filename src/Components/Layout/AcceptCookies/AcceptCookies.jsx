import React from "react";
import "./style.scss";

import CurvedLine from "../../Utils/CurvedLine";

function AcceptCookies(props) {
  return (
    <div id="AcceptCookies">
      <div className="waves">
        <CurvedLine strokeColor={"var(--accentSix)"} height={100} />
      </div>
      <div className="content">
        <div className="text">
          <div className="cookieQuestion">🍪You Want A Cookie?</div>
          <div>
            Cookies help me manage notifications, and content suggestions! They
            also help us remember your choices, so if you reject our cookie then
            you will see this meesage again.
          </div>
        </div>
        <div className="buttons">
          <button onClick={() => props.handleCookieSettingChange(true)}>
            <span>Gimme Cookie!</span>
          </button>
          <button
            className="noCookie"
            onClick={() => props.handleCookieSettingChange(false)}
          >
            <span>No Cookie!</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default AcceptCookies;
