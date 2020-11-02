/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { auth } from '../_actions/user_actions';
import { useSelector, useDispatch } from 'react-redux';
import { getAppState } from '../_actions/state_actions';

export default function (SpecificComponent, option, adminRoute = null, stateRoute = false) {
	function AuthenticationCheck(props) {
		const user = useSelector(state => state.user);
		const dispatch = useDispatch();
		let state = false;
		useEffect(() => {
			// To know my current status, send Auth request
			dispatch(getAppState()).then(response => {
				if (response.payload.state == 'during') {
					state = true;
				}
			}).then(() =>
				dispatch(auth()).then(response => {
				// Not Loggined in Status
					if (!response.payload.isAuth) {
						if (option) {
							props.history.push({
								pathname: '/',
								state: { invalidState: false, noAccess: false }
							});
						}
					// Loggined in Status
					} else {
						if (adminRoute && !response.payload.isAdmin) {
						// supposed to be Admin page, but not admin person wants to go inside
							props.history.push({
								pathname: '/',
								state: { invalidState: false, noAccess: false }
							});
						} else if (option === false) {
							// Logged in Status, but Try to go into log in page
							props.history.push({
								pathname: '/',
								state: { invalidState: false, noAccess: false }
							});
						} else if (!state && stateRoute) {
							props.history.push({
								pathname: '/',
								state: { invalidState: true, noAccess: false }
							});
						}
					}
				})
					.catch(() => {
						if (adminRoute || option) {
							props.history.push({
								pathname: '/',
								state: { invalidState: false, noAccess: true }
							});
						}
					}));
		}, []);


		return (
			<SpecificComponent {...props} user={user} />
		);
	}
	return AuthenticationCheck;
}


