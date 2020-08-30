import React from "react";
import { css } from "emotion";
import * as Colors from "../../constants/Colors";
import * as Fonts from "../../constants/Fonts";

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
				font-family: ${Fonts.Primary};
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
