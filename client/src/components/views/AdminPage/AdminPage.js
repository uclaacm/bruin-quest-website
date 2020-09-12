import React from 'react';
import Dropdown from './Dropdown';
import { css } from 'emotion';

export default function AdminPage() {
	return (
		<main
			className={css`  
        flex-direction: column;
        display: flex;
        padding-top: 5vh;
        justify-content: flex-start;
        align-items: center;
        height: 100vh;
      `}
		>
			<Dropdown/>
		</main>
	);
}
