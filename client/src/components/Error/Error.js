import React from 'react';

function Error({
	children,
	fontSize = '0.7rem'
}) {
	return (
		<label>
			<p
				style={{
					color: '#ff0000bf',
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

export default Error;
