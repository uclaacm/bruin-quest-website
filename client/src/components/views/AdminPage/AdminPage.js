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
				<div label="Puzzles">
					<Dropdown type="puzzles"/>
				</div>
				<div label="Teams">
					<Dropdown type="teams"/>
				</div>
				<div label="Controls">
					<Dropdown type="controls"/>
				</div>
			</Tabs>
		</main>
	);
}
