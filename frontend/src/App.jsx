import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import UserProfile from "./pages/UserProfile";
import UserTrips from "./pages/UserTrips";
import TripPlan from "./pages/TripPlan";
import TripCreate from "./pages/TripCreate";
import TripInfo from "./pages/TripInfo";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/trips" element={<UserTrips />} />
        <Route path="/create" element={<TripCreate />} />
        <Route path="/plan" element={<TripPlan />} />
        <Route path="/trip/info" element={<TripInfo />} />
      </Routes>
    </Router>
  );
}

export default App;
