import React from "react";
import { Route, Routes } from "react-router-dom";

import NoPage from "../Layout/NoPage/NoPage";
import QuickMathsHome from "./QuickMathsHome/QuickMathsHome";
import QuickMathsNav from "./QuickMathsNav/QuickMathsNav";
import MasteryChallenge from "./MasteryChallenge/MasteryChallenge";

function QuickMaths() {
  return (
    <div id="QuickMaths">
      <QuickMathsNav />
      <Routes>
        <Route path="/" element={<QuickMathsHome />} />
        <Route path="/home" element={<QuickMathsHome />} />
        <Route path="/Challenge/:id" element={<MasteryChallenge />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </div>
  );
}
export default QuickMaths;
