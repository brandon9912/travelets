import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import SignIn from "./pages/SignIn";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <SignIn />
    </>
  );
}

export default App;
