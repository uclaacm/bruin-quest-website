import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { registerUser } from '../../../_actions/user_actions';
import { useDispatch } from 'react-redux';
import * as Colors from '../../../constants/Colors'
import { css } from 'emotion';
import './styles.css'
import Text from '../../Text/Text';
import WelcomeBanner from '../../WelcomeBanner/WelcomeBanner';
import TextInput from '../../TextInput/TextInput';
import Button from '../../Button/Button';

// import {
// 	Form,
// 	Input,
// 	Button
// } from 'antd';

// const formItemLayout = {
// 	labelCol: {
// 		xs: { span: 24 },
// 		sm: { span: 8 }
// 	},
// 	wrapperCol: {
// 		xs: { span: 24 },
// 		sm: { span: 16 }
// 	}
// };
// const tailFormItemLayout = {
// 	wrapperCol: {
// 		xs: {
// 			span: 24,
// 			offset: 0
// 		},
// 		sm: {
// 			span: 16,
// 			offset: 8
// 		}
// 	}
// };

const staticRegisterTop = 'Register';
const staticRegisterBot = 'your team!';

function RegisterPage(props) {
	const dispatch = useDispatch();
	// return (

	// 	<Formik
	// 		initialValues={{
	// 			email: '',
	// 			lastName: '',
	// 			name: '',
	// 			password: '',
	// 			confirmPassword: ''
	// 		}}
	// 		validationSchema={Yup.object().shape({
	// 			name: Yup.string()
	// 				.required('Name is required'),
	// 			lastName: Yup.string()
	// 				.required('Last Name is required'),
	// 			team: Yup.string()
	// 				.email('Email is invalid')
	// 				.required('Email is required'),
	// 			password: Yup.string()
	// 				.min(6, 'Password must be at least 6 characters')
	// 				.required('Password is required'),
	// 			confirmPassword: Yup.string()
	// 				.oneOf([Yup.ref('password'), null], 'Passwords must match')
	// 				.required('Confirm Password is required')
	// 		})}
	// 		onSubmit={(values, { setSubmitting }) => {
	// 			setTimeout(() => {
	// 				const dataToSubmit = {
	// 					email: values.email,
	// 					password: values.password,
	// 					name: values.name,
	// 					lastname: values.lastname,
	// 					image: `http://gravatar.com/avatar/${moment().unix()}?d=identicon`
	// 				};

	// 				dispatch(registerUser(dataToSubmit)).then(response => {
	// 					if (response.payload.success) {
	// 						props.history.push('/login');
	// 					} else {
	// 						alert(response.payload.err.errmsg);
	// 					}
	// 				});

	// 				setSubmitting(false);
	// 			}, 500);
	// 		}}
	// 	>
	// 		{props => {
	// 			const {
	// 				values,
	// 				touched,
	// 				errors,
	// 				dirty,
	// 				isSubmitting,
	// 				handleChange,
	// 				handleBlur,
	// 				handleSubmit,
	// 				handleReset
	// 			} = props;
	// 			return (
	// 				<div className="app">
	// 					<WelcomeBanner>{staticRegister}</WelcomeBanner>
	// 					<Form style={{ minWidth: '375px' }} {...formItemLayout} onSubmit={handleSubmit} >

	// 						<Form.Item required label="Name">
	// 							<Input
	// 								id="name"
	// 								placeholder="Enter your name"
	// 								type="text"
	// 								value={values.name}
	// 								onChange={handleChange}
	// 								onBlur={handleBlur}
	// 								className={
	// 									errors.name && touched.name ? 'text-input error' : 'text-input'
	// 								}
	// 							/>
	// 							{errors.name && touched.name &&
    //               				  <div className="input-feedback">{errors.name}</div>
	// 							}
	// 						</Form.Item>

	// 						<Form.Item required label="Last Name">
	// 							<Input
	// 								id="lastName"
	// 								placeholder="Enter your Last Name"
	// 								type="text"
	// 								value={values.lastName}
	// 								onChange={handleChange}
	// 								onBlur={handleBlur}
	// 								className={
	// 									errors.lastName && touched.lastName ? 'text-input error' : 'text-input'
	// 								}
	// 							/>
	// 							{errors.lastName && touched.lastName &&
    //               <div className="input-feedback">{errors.lastName}</div>
	// 							}
	// 						</Form.Item>

	// 						<Form.Item
	// 							required
	// 							label="Email"
	// 							hasFeedback
	// 							validateStatus={errors.email && touched.email ? 'error' : 'success'}>
	// 							<Input
	// 								id="email"
	// 								placeholder="Enter your Email"
	// 								type="email"
	// 								value={values.email}
	// 								onChange={handleChange}
	// 								onBlur={handleBlur}
	// 								className={
	// 									errors.email && touched.email ? 'text-input error' : 'text-input'
	// 								}
	// 							/>
	// 							{errors.email && touched.email &&
    //               <div className="input-feedback">{errors.email}</div>
	// 							}
	// 						</Form.Item>

	// 						<Form.Item
	// 							required
	// 							label="Password"
	// 							hasFeedback
	// 							validateStatus={errors.password && touched.password ? 'error' : 'success'}>
	// 							<Input
	// 								id="password"
	// 								placeholder="Enter your password"
	// 								type="password"
	// 								value={values.password}
	// 								onChange={handleChange}
	// 								onBlur={handleBlur}
	// 								className={
	// 									errors.password && touched.password ? 'text-input error' : 'text-input'
	// 								}
	// 							/>
	// 							{errors.password && touched.password &&
    //               <div className="input-feedback">{errors.password}</div>
	// 							}
	// 						</Form.Item>

	// 						<Form.Item required label="Confirm" hasFeedback>
	// 							<Input
	// 								id="confirmPassword"
	// 								placeholder="Enter your confirmPassword"
	// 								type="password"
	// 								value={values.confirmPassword}
	// 								onChange={handleChange}
	// 								onBlur={handleBlur}
	// 								className={
	// 									errors.confirmPassword && touched.confirmPassword ?
	// 										'text-input error' :
	// 										'text-input'
	// 								}
	// 							/>
	// 							{errors.confirmPassword && touched.confirmPassword &&
    //               <div className="input-feedback">{errors.confirmPassword}</div>
	// 							}
	// 						</Form.Item>

	// 						<Form.Item {...tailFormItemLayout}>
	// 							<Button onClick={handleSubmit} type="primary" disabled={isSubmitting}>
    //               Submit
	// 							</Button>
	// 						</Form.Item>
	// 					</Form>
	// 				</div>
	// 			);
	// 		}}
	// 	</Formik>
	// );
	return (
	  <Formik
		initialValues={{
			team: '',
			password: '',
			members: [{name: '', discord: ''}],
		}}
		validationSchema={Yup.object().shape({
			team: Yup.string()
			.required('Team is required'),
			password: Yup.string()
			.min(6, 'Password must be at least 6 characters')
			.required('Password is required'),
		})}
		
		onSubmit={(values, { setSubmitting }) => {
			setTimeout(() => {
			let dataToSubmit = {
				team: values.team,
				password: values.password
			};
			console.log(dataToSubmit);
			alert(JSON.stringify(values, null, 2));
			dispatch(registerUser(dataToSubmit))
				.then(response => {
				
				})
				.catch(err => {
				});
			setSubmitting(false);
			}, 500);
		}}
		>
		{props => {
			const {
			values,
			touched,
			errors,
			dirty,
			isSubmitting,
			handleChange,
			handleBlur,
			handleSubmit,
			handleReset,
			} = props;
			return (
			<div className="main-container">
				<WelcomeBanner
					topText={staticRegisterTop}
					botText={staticRegisterBot}
				>
				</WelcomeBanner>

				<form onSubmit={handleSubmit} className="register-container">
					<div className="left-container">
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
							{errors.team && touched.team && (
							<div className="input-feedback">{errors.team}</div>
							)}
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
							{errors.password && touched.password && (
							<div className="input-feedback">{errors.password}</div>
							)}
						</div>


						<div className="form-box">
							<Button type="submit" disabled={isSubmitting}>
							Join
							</Button>
						</div>
					</div>

					<div className="right-container">
						<Text>Member Info</Text>
						{values.members.map((member) => {
							console.log(member);
							return (
								<p> Hello</p>
							)
						})}
							<div className="member-box">
								<div className="form-box">
									<Text>Name</Text>
									<TextInput
									width="175px"
									id="team"
									placeholder="Joe Bruin"
									value={values.team}
									onChange={handleChange}
									onBlur={handleBlur}
									/>
									{errors.team && touched.team && (
									<div className="input-feedback">{errors.team}</div>
									)}
								</div>
								
								
								<div className="form-box">
									<Text>Discord</Text>
									<TextInput
									width="175px"
									id="password"
									placeholder="Bruin#1234"
									type="password"
									value={values.password}
									onChange={handleChange}
									onBlur={handleBlur}
									/>
									{errors.password && touched.password && (
									<div className="input-feedback">{errors.password}</div>
									)}
								</div>


								<div className="form-box">
									<Button onClick="addMember" width="50px" disabled={isSubmitting}>
									Login
									</Button>
								</div>
							</div>
						
					</div>
				</form>
			</div>
			);
		}}
	  </Formik>
	);
}


export default RegisterPage;
