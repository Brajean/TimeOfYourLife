export const clockContainerStyle = (props) => {
  return { width: props.isExpanded ? "59%" : "97%" };
};

export const displayStyle = (props) => {
  return {
    fontFamily: props.clockProps.fontFamily,
    color: props.clockProps.fontColor,
  };
};

export const titleStyle = (props) => {
  return { fontSize: `${props.clockProps.titleFontSize}pt` };
};

export const clockStyle = (props) => {
  return { fontSize: `${props.clockProps.clockFontSize}pt` };
};
