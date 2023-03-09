import React from "react";
import { Route, Routes } from "react-router-dom";

import QuickMathsHome from "./QuickMathsHome/QuickMathsHome";

function QuickMaths() {
  return (
    <div id="QuickMaths">
      <Routes>
        <Route path="/" element={<QuickMathsHome />} />
        <Route path="/home" element={<QuickMathsHome />} />
      </Routes>
    </div>
  );
}
export default QuickMaths;
