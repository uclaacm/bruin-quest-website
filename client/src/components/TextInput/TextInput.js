import React from "react";
import { css } from "emotion";
import { Colors } from "../../constants/Colors";

function TextInput({
  value,
  onChange,
  border = `2px solid ${Colors.Blue}`,
  height = "42px",
  width = "300px",
  style,
}) {
  return (
    <input
      className={css`
        border: ${border};
        height: ${height};
        width: ${width};
        border-radius: 16px;
        padding: 12px;
        font-family: Poppins;
        outline: none;
      `}
      style={style}
      type="text"
      value={value}
      onChange={onChange}
    />
  );
}

export default TextInput;

// Usage:
// <TextInput
//   value={value}
//   onChange={(event) => {
//     setValue(event.target.value);
//   }}
// />
