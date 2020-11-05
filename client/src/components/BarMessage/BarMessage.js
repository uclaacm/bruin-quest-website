import React from 'react';

function BarMessage({
	children,
	fontSize = '0.7rem',
	color = '#ff0000bf'
}) {
	return (
		<label>
			<p
				style={{
					color,
					fontSize,
					border: '1px solid',
					padding: '1rem',
					borderRadius: '10px'
				}}
			>
				{children}
			</p>
		</label>
	);
}

export default BarMessage;
