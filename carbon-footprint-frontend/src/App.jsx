import "./App.css";
import SignUp from "./components/Signup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Individual from "./components/Individual";
import Homepage from "./components/Homepage";
import Travel from "./components/Travel";
import Printedcard from "./components/Printedcard";
import Business from "./components/Business";
import ResultPage from "./components/ResultPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/home/individual" element={<Individual />} />
        <Route path="/home/travel" element={<Travel />} />
        <Route path="/home/business" element={<Business />} />
        <Route path="/home/printed_cards" element={<Printedcard />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </Router>
  );
}

export default App;
