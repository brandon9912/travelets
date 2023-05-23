import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Trip from "./pages/TripPlan";
import TripCreate from "./pages/TripCreate";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/tripcreate" element={<TripCreate />} />
        <Route path="/trip" element={<Trip />} />
      </Routes>
    </Router>
  );
}

export default App;
