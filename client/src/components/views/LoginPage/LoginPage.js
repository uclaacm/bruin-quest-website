import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { loginUser } from '../../../_actions/user_actions';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import './styles.css';
import { Checkbox } from 'antd';
import TextInput from '../../TextInput/TextInput';
import Text from '../../Text/Text';
import Button from '../../Button/Button';
import WelcomeBanner from '../WelcomeBanner/WelcomeBanner';

function LoginPage(props) {
	const dispatch = useDispatch();
	const rememberMeChecked = Boolean(localStorage.getItem('rememberMe'));

	const [formErrorMessage, setFormErrorMessage] = useState('');
	const [rememberMe, setRememberMe] = useState(rememberMeChecked);

	const handleRememberMe = () => {
		setRememberMe(!rememberMe);
	};

	return (
		<Formik
			initialValues={{
				team: '',
				password: ''
			}}
			validationSchema={Yup.object().shape({
				team: Yup.string().required('Team name is required'),
				password: Yup.string()
					.min(6, 'Password must be at least 6 characters')
					.required('Password is required')
			})}
			onSubmit={(values, { setSubmitting }) => {
				setTimeout(async () => {
					const dataToSubmit = {
						team: values.team,
						password: values.password
					};
					try {
						const login = await dispatch(loginUser(dataToSubmit));
						const payload = await login.payload;
						window.localStorage.setItem('teamId', payload.teamId);
						window.localStorage.setItem('teamName', dataToSubmit.name);
						if (rememberMe === true) {
							window.localStorage.setItem('rememberMe', values.id);
						} else {
							localStorage.removeItem('rememberMe');
						}
						props.history.push('/');
					} catch (err) {
						// This is a readable error message sent from the backend
						if (err.response.data.error) {
							setFormErrorMessage(err.response.data.error);
						} else {
							setFormErrorMessage('Unable to login');
						}
					}
					setSubmitting(false);
				}, 500);
			}}
		>
			{props => {
				const {
					values,
					touched,
					errors,
					isSubmitting,
					handleChange,
					handleBlur,
					handleSubmit
				} = props;
				return (
					<div className="main-container">
						<WelcomeBanner />
						<form onSubmit={handleSubmit} className="form-container">
							<div className="form-box">
								<Text>Team name</Text>
								<TextInput
									width="400px"
									id="team"
									placeholder="Enter your team"
									value={values.team}
									onChange={handleChange}
									onBlur={handleBlur}
								/>
								{errors.team && touched.team &&
									<div className="input-feedback">{errors.team}</div>
								}
							</div>

							<div className="form-box">
								<Text>Team password</Text>
								<TextInput
									width="400px"
									id="password"
									placeholder="Enter your password"
									type="password"
									value={values.password}
									onChange={handleChange}
									onBlur={handleBlur}
								/>
								{errors.password && touched.password &&
									<div className="input-feedback">{errors.password}</div>
								}
							</div>

							{formErrorMessage && <Text error>{formErrorMessage}</Text>}
							<Checkbox
								id="rememberMe"
								onChange={handleRememberMe}
								checked={rememberMe}
							>
								Remember me
							</Checkbox>

							<div className="form-box">
								<Button type="submit" disabled={isSubmitting}>
									Login
								</Button>
							</div>
						</form>
					</div>
				);
			}}
		</Formik>
	);
}

export default withRouter(LoginPage);
