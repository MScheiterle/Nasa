import React from "react";
import CurvedLine from "../../Utils/CurvedLine";
import "./style.scss";

function Footer() {
  return (
    <div id="Footer" className="center">
      <div className="wave">
        <CurvedLine strokeColor={"var(--accentFour)"} height={200} />
        <CurvedLine strokeColor={"var(--accentFive)"} height={150} />
        <CurvedLine strokeColor={"var(--accentSix)"} height={100} />
      </div>
      <div className="logo">
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
      © 2023-present Marcus Scheiterle (AKA. Simpl1f1ed) All Rights Reserved.
    </div>
  );
}

export default Footer;
