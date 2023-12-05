import Clock from "./components/clock/Clock.js";
import SetClockProps from "./components/clock-props/SetClockProps.js";
import ClockProps from "./components/clock-props/ClockProps.js";
import "./components/App.css";
import { useState } from "react";

function App() {
  const [clockProps, setClockProps] = useState(new ClockProps());
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="App">
      <Clock clockProps={clockProps} isExpanded={isExpanded} />
      <SetClockProps
        setClockProps={setClockProps}
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
      />
    </div>
  );
}

export default App;
