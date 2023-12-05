export const clockContainerStyle = (props) => {
  return { width: props.isExpanded ? "59%" : "97%" };
};

export const displayStyle = (props) => {
  return {
    fontFamily: props.clockProps.fontFamily,
  };
};

export const titleStyle = (props) => {
  return {
    fontSize: `${props.clockProps.titleFontSize}pt`,
    color: props.clockProps.titleFontColor,
  };
};

export const clockStyle = (props) => {
  return {
    fontSize: `${props.clockProps.clockFontSize}pt`,
    color: props.clockProps.clockFontColor,
  };
};
