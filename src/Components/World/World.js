import React, { useEffect } from "react";
import { getFunctions, httpsCallable } from "firebase/functions";
import "./style.scss";

function World() {

  useEffect(() => {
    const functions = getFunctions();
    const helloWorld = httpsCallable(functions, "helloWorld");
    helloWorld({ text: "messageText" }).then((result) => {
      const data = result.data;
      const sanitizedMessage = data.text;

      console.log(sanitizedMessage);
    });
  }, []);

  return <div className="World"></div>;
}

export default World;
