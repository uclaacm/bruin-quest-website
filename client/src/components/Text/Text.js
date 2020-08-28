import React from "react";
import { css } from "emotion";
import { Colors } from "../../constants/Colors";

function Text({
  children,
  color = Colors.Black,
  size = "18px",
  weight = 400,
  style,
}) {
  return (
    <div
      className={css`
        color: ${color};
        font-size: ${size};
        font-weight: ${weight};
        font-family: Poppins;
      `}
      style={style}
    >
      {children}
    </div>
  );
}

export default Text;
