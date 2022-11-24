import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";

library.add(fas, far);

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route exact path="/" element={<></>} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;
