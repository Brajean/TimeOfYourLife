import Clock from "./components/clock/Clock.js";
import SetClockProps from "./components/clock-props/SetClockProps.js";
import ClockProps from "./components/clock-props/ClockProps.js";
import "./components/App.css";
import { useState } from "react";

function App() {
  const [clockProps, setClockProps] = useState(new ClockProps());
  return (
    <div className="App">
      <Clock clockProps={clockProps} />
      <SetClockProps setClockProps={setClockProps} />
    </div>
  );
}

export default App;
