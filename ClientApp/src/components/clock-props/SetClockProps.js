import { useState, useEffect } from "react";
import ClockProps from "./ClockProps";

function SetClockProps(props) {
  const clockProps = new ClockProps();
  const [fontFamily, setFontFamily] = useState(clockProps.fontFamily);
  const [fontColor, setFontColor] = useState(clockProps.fontColor);
  const [blinkColons, setBlinkColons] = useState(clockProps.blinkColons);
  const [presets, setPresets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [titleHeader, setTitleHeader] = useState(clockProps.titleHeader);

  useEffect(() => {
    (async () => {
      const response = await fetch("clock/presets");
      const data = await response.json();
      setPresets(data);
      setLoading(false);
    })();
  }, []);

  const getProps = () => {
    const props = new ClockProps();
    props.fontFamily = document.getElementById("fontFamily").value;
    props.titleFontSize = document.getElementById("titleFontSize").value;
    props.clockFontSize = document.getElementById("clockFontSize").value;
    props.fontColor = document.getElementById("fontColor").value;
    props.blinkColons = document.getElementById("blinkColons").checked;
    props.titleHeader = document.getElementById("titleHeader").value;
    return props;
  };

  const setClockProps = () => {
    const setProps = getProps();
    if (!setProps.titleHeader || !setProps.fontFamily || !setProps.fontColor) {
      window.alert(
        "Invalid fields! \nPlease check that the fields are not blank or null"
      );
    } else {
      props.setClockProps(setProps);
    }
  };

  const savePreset = async () => {
    const response = await fetch("clock/presets", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(getProps()),
    });

    const newPreset = await response.json();
    setPresets([...presets, newPreset]);
  };

  const fontSizeOptions = (selectedSize) => {
    return clockProps.availableFontSizes.map((size) => {
      var option = <option value={size} label={size}></option>;
      if (size === selectedSize) {
        option = (
          <option value={size} label={size} selected>
            {size}
          </option>
        );
      }
      return option;
    });
  };

  const setTitleHeaderUI = () => {
    setTitleHeader(document.getElementById("titleHeader").value);
    clockProps.titleHeader = document.getElementById("titleHeader").value;
  };

  const setFontFamilyUI = () => {
    setFontFamily(document.getElementById("fontFamily").value);
    clockProps.fontFamily = document.getElementById("fontFamily").value;
  };

  const setFontColurUI = (e) => {
    setFontColor(document.getElementById("fontColor").value);
    clockProps.fontColor = document.getElementById("fontColor").value;
  };

  const setBlinkColonsUI = () => {
    setBlinkColons(document.getElementById("blinkColons").checked);
    clockProps.blinkColons = document.getElementById("blinkColons").checked;
    setClockProps();
  };

  const handleKeyEnter = (event) => {
    if (event.key === "Enter") setClockProps();
  };

  const presetsDisplay = (() => {
    console.log(presets);
    return loading ? (
      <div>
        This is a good place to display and use the presets stored on the sever.
      </div>
    ) : (
      <ul>
        {presets.map((p, i) => (
          <li>
            Preset {i + 1}:{" "}
            {`Font: ${p.fontFamily}, Color: ${p.fontColor}, Title Size: ${p.titleFontSize}, Clock Size: ${p.clockFontSize}`}
          </li>
        ))}
      </ul>
    );
  })();

  return (
    <div
      id="ClockProps"
      style={{ overflow: "auto", width: props.isExpanded ? "40%" : "2%" }}
    >
      <div
        style={{
          float: "left",
          width: "40px",
          height: "100%",
          border: "1px solid white",
          fontSize: "20pt",
        }}
      >
        <a
          style={{ cursor: "pointer" }}
          onClick={() => props.setIsExpanded(!props.isExpanded)}
        >
          +/-
        </a>
      </div>
      {props.isExpanded && (
        <div>
          <div>
            <h1>Clock Properties</h1>
            <hr />
          </div>
          <div>
            <div>
              <h2>Settings</h2>
            </div>
            <div>
              <div>Title</div>
              <div>
                <input
                  id="titleHeader"
                  value={titleHeader}
                  onChange={setTitleHeaderUI}
                  onKeyDown={handleKeyEnter}
                />
                <button onClick={setClockProps}>✓</button>
              </div>
            </div>
            <div>
              <div>Font Family</div>
              <div>
                <input
                  id="fontFamily"
                  value={fontFamily}
                  onChange={setFontFamilyUI}
                />
                <button onClick={setClockProps}>✓</button>
              </div>
            </div>
            <div>
              <div>Title Font Size</div>
              <div>
                <input
                  id="titleFontSize"
                  type="range"
                  name="titleFontSize"
                  list="list1"
                  onChange={setClockProps}
                />
                <datalist id="list1">
                  {fontSizeOptions(clockProps.availableFontSizes)}
                </datalist>
              </div>
            </div>
            <div>
              <div>Clock Font Size</div>
              <div>
                <input
                  id="clockFontSize"
                  type="range"
                  name="clockFontSize"
                  list="list2"
                  onChange={setClockProps}
                />
                <datalist id="list2">
                  {fontSizeOptions(clockProps.availableFontSizes)}
                </datalist>
              </div>
            </div>
            <div>
              <div>Font Color</div>
              <div>
                <input
                  id="fontColor"
                  value={fontColor}
                  onChange={(e) => setFontColurUI(e)}
                />
                <button onClick={setClockProps}>✓</button>
              </div>
            </div>
            <div>
              <div>Blink Colons</div>
              <div>
                <input
                  id="blinkColons"
                  checked={blinkColons}
                  type="checkbox"
                  onChange={setBlinkColonsUI}
                />
              </div>
            </div>
            <div>
              <div>
                <button onClick={savePreset}>Save Preset</button>
              </div>
            </div>
          </div>
          <hr />
          <div>
            <h2>Presets</h2>
            <div>{presetsDisplay}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SetClockProps;
