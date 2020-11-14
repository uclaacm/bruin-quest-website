import React from 'react';
import { Menu } from 'antd';
import axios from 'axios';
import { USER_SERVER } from '../../../Config';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';

function RightMenu(props) {
	const user = useSelector(state => state.user);

	const logoutHandler = () => {
		axios.get(`${USER_SERVER}/logout`).then(response => {
			if (response.status === 200) {
				props.history.push('/login');
			} else {
				alert('Log Out Failed');
			}
		});
	};

	if (!user || !user.userData || !user.userData.isAuth) {
		return (
			<Menu mode={props.mode}>
				<Menu.Item key="login">
					<a href="/login">Sign in</a>
				</Menu.Item>
				<Menu.Item key="register">
					<a href="/register">Sign up</a>
				</Menu.Item>
			</Menu>
		);
	}
	return (
		<Menu mode={props.mode}>
			<Menu.Item key="scoreboard">
				<a href="/scoreboard">Scoreboard</a>
			</Menu.Item>
			<Menu.Item key="map">
				<a href="/map">Map</a>
			</Menu.Item>
			<Menu.Item key="logout">
				<a onClick={logoutHandler}>Logout</a>
			</Menu.Item>
		</Menu>
	);
}

export default withRouter(RightMenu);

