import React from 'react';
import Dropdown from './Dropdown';
import { css } from 'emotion';
import Tabs from './Tabs';

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
			<Tabs>
				<Dropdown type="Puzzles"/>
				<Dropdown type="Teams"/>
				<Dropdown type="Controls"/>
			</Tabs>
		</main>
	);
}
