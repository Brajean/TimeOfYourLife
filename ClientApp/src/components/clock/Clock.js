import { useState, useEffect } from "react";
import {
  clockContainerStyle,
  displayStyle,
  titleStyle,
  clockStyle,
} from "./styles";

function Clock(props) {
  const [date, setDate] = useState(new Date());

  function refreshClock() {
    setDate(new Date());
  }

  useEffect(() => {
    const timerId = setInterval(refreshClock, 1000);
    return function cleanup() {
      clearInterval(timerId);
    };
  }, []);

  let displayText = date.toLocaleTimeString();
  if (props.clockProps.blinkColons & (date.getSeconds() % 2 === 0)) {
    displayText = displayText.replace(/:/g, " ");
  }

  return (
    <div id="Clock" style={clockContainerStyle(props)}>
      <div id="Digits" style={displayStyle(props)}>
        <div id="title" style={titleStyle(props)}>
          {props.clockProps.titleHeader}
        </div>
        <div id="time" style={clockStyle(props)}>
          {displayText}
        </div>
      </div>
    </div>
  );
}

export default Clock;
