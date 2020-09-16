import React, { useState } from 'react';
import { css } from 'emotion';
import Tab from './Tab';

export default function Tabs(props) {
	const [activeTab, setActiveTab] = useState(props.children[0].props.label);
	return (
		<div>
			<ol
				className={css`
          display: flex;
        `}
			>
				{props.children.map(child => {
					return (
						<Tab
							activeTab={activeTab}
							key={child.props.label}
							label={child.props.label}
							onClick={tab => setActiveTab(tab)}
						/>
					);
				})}
			</ol>
			<div>
				{props.children.map(child => {
					return child.props.label !== activeTab ? undefined : child.props.children;
				})}
			</div>
		</div>
	);
}
