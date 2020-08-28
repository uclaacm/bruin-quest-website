import React from "react";
import { css } from "emotion";
import { Colors } from "../../constants/Colors";
import Text from "../Text/Text";

function Button({
  children,
  onClick,
  color = Colors.Blue,
  height = "42px",
  width = "150px",
  disabled = false,
  style,
}) {
  return (
    <div
      onClick={onClick}
      className={css`
        height: ${height};
        width: ${width};
        background-color: ${disabled ? Colors.Gray : color};
        border-radius: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: ${disabled ? "not-allowed" : "pointer"};
        &:hover {
          background-color: ${disabled ? Colors.Gray : Colors.DarkBlue};
          transition: 0.3s;
        }
      `}
      style={style}
    >
      <Text color={Colors.White}>{children}</Text>
    </div>
  );
}

export default Button;
