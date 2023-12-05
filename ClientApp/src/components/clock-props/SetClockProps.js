import { useState, useEffect } from "react";
import ClockProps from "./ClockProps";

function SetClockProps(props) {
  const clockProps = new ClockProps();
  const [fontFamily, setFontFamily] = useState(clockProps.fontFamily);
  const [titleFontColor, setTitleFontColor] = useState(
    clockProps.titleFontColor
  );
  const [clockFontColor, setClockFontColor] = useState(
    clockProps.clockFontColor
  );
  const [blinkColons, setBlinkColons] = useState(clockProps.blinkColons);
  const [presets, setPresets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [titleHeader, setTitleHeader] = useState(clockProps.titleHeader);
  const [selectedPreset, setSelectedPreset] = useState(undefined);

  useEffect(() => {
    (async () => {
      const response = await fetch("clock/presets");
      const data = await response.json();
      setPresets(data);
      setSelectedPreset(data[0]);
      setLoading(false);
    })();
  }, []);

  const getProps = () => {
    const props = new ClockProps();
    props.fontFamily = document.getElementById("fontFamily").value;
    props.titleFontSize = document.getElementById("titleFontSize").value;
    props.clockFontSize = document.getElementById("clockFontSize").value;
    props.titleFontColor = document.getElementById("titleFontColor").value;
    props.clockFontColor = document.getElementById("clockFontColor").value;
    props.blinkColons = document.getElementById("blinkColons").checked;
    props.titleHeader = document.getElementById("titleHeader").value;
    return props;
  };

  const setClockProps = () => {
    const setProps = getProps();
    if (
      !setProps.titleHeader ||
      !setProps.fontFamily ||
      !setProps.titleFontColor ||
      !setProps.clockFontColor
    ) {
      window.alert(
        "Invalid fields! \n Please check that the fields are not blank or null"
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

  const presetsOptions = () => {
    return presets.map((preset) => {
      var option = <option value={preset.uuid}>{preset.titleHeader}</option>;
      if (preset.uuid === selectedPreset.uuid) {
        option = (
          <option value={preset.uuid} selected>
            {preset.titleHeader}
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

  const setTitleFontColorUI = (e) => {
    setTitleFontColor(document.getElementById("titleFontColor").value);
    clockProps.titleFontColor = document.getElementById("titleFontColor").value;
  };

  const setClockFontColorUI = (e) => {
    setClockFontColor(document.getElementById("clockFontColor").value);
    clockProps.clockFontColor = document.getElementById("clockFontColor").value;
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
            {`Title: ${p.titleHeader}, Font: ${p.fontFamily},  Title Color: ${p.titleFontColor}, Title Size: ${p.titleFontSize}, Clock Color: ${p.clockFontColor}, Clock Size: ${p.clockFontSize}`}
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
            <div>Select a preset</div>
            <div>
              <select
                id="presetsList"
                onChange={(e) => {
                  const newPreset = presets.find(
                    (preset) => preset.uuid === e.target.value
                  );
                  setSelectedPreset(newPreset);
                  props.setClockProps(newPreset);
                  setFontFamily(newPreset.fontFamily);
                  setTitleFontColor(newPreset.titleFontColor);
                  setClockFontColor(newPreset.clockColorTitle);
                  setBlinkColons(newPreset.blinkColons);
                  setTitleHeader(newPreset.titleHeader);
                }}
              >
                {presetsOptions()}
              </select>
            </div>
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
                  onKeyDown={handleKeyEnter}
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
              <div>Title Font Color</div>
              <div>
                <input
                  id="titleFontColor"
                  value={titleFontColor}
                  onChange={(e) => setTitleFontColorUI(e)}
                  onKeyDown={handleKeyEnter}
                />
                <button onClick={setClockProps}>✓</button>
              </div>
            </div>
            <div>
              <div>Clock Font Color</div>
              <div>
                <input
                  id="clockFontColor"
                  value={clockFontColor}
                  onChange={(e) => setClockFontColorUI(e)}
                  onKeyDown={handleKeyEnter}
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
