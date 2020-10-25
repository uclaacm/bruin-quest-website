import React, { useState } from 'react';
import { Formik, FieldArray } from 'formik';
import * as Yup from 'yup';
import { registerUser } from '../../../_actions/user_actions';
import { useDispatch } from 'react-redux';
import { css } from 'emotion';
import './styles.css';
import Text from '../../Text/Text';
import WelcomeBanner from '../WelcomeBanner/WelcomeBanner';
import TextInput from '../../TextInput/TextInput';
import Button from '../../Button/Button';
import addicon from './assets/add_member.png';
import removeicon from './assets/remove_member.png';

const staticRegisterTop = 'Register';
const staticRegisterBot = 'your team!';

function RegisterPage(props) {
	const dispatch = useDispatch();
	const [formErrorMessage, setFormErrorMessage] = useState('');
	return (
		<Formik
			initialValues={{
				team: '',
				password: '',
				members: [{ name: '', discord: '' }]
			}}
			validationSchema={Yup.object().shape({
				team: Yup.string().required('Team is required'),
				password: Yup.string()
					.min(6, 'Password must be at least 6 characters')
					.required('Password is required'),
				members: Yup.array().of(
					Yup.object().shape({
						name: Yup.string().required('Member name is required'),
						discord: Yup.string().required('Member discord is required')
					})
				)
			})}
			onSubmit={(values, { setSubmitting }) => {
				setTimeout(async () => {
					const dataToSubmit = {
						team: values.team,
						password: values.password,
						members: values.members
					};
					try {
						await dispatch(registerUser(dataToSubmit));
						// TODO: show success screen instead
						props.history.push('/login');
					} catch (err) {
						// This is a readable error message sent from the backend
						if (err.response.data.error) {
							setFormErrorMessage(err.response.data.error);
						} else {
							setFormErrorMessage('Unable to register');
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
						<WelcomeBanner
							topText={staticRegisterTop}
							botText={staticRegisterBot}
						></WelcomeBanner>

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

								<div className="form-box">
									<Button type="submit" disabled={isSubmitting}>
										Join
									</Button>
								</div>

								{formErrorMessage && <Text error>{formErrorMessage}</Text>}
							</div>

							<div className="right-container">
								<Text>Member Info</Text>
								<FieldArray name="members">
									{({ insert, remove, push }) =>
										<div className="members-container">
											{values.members.length > 0 &&
												values.members.map((member, index) =>
													<div className="member-box" key={index}>
														<div className="form-box">
															<Text>Name</Text>
															<TextInput
																width="175px"
																id={`members.${index}.name`}
																placeholder="Joe Bruin"
																value={values.members[index].name}
																onChange={handleChange}
																onBlur={handleBlur}
															/>
															{errors.members &&
																touched.members &&
																errors.members[index] &&
																touched.members[index] &&
																errors.members[index].name &&
																touched.members[index].name &&
																	<div className="input-feedback">
																		{errors.members[index].name}
																	</div>
															}
														</div>

														<div className="form-box">
															<Text>Discord</Text>
															<TextInput
																width="175px"
																id={`members.${index}.discord`}
																placeholder="Bruin#1234"
																value={values.members[index].discord}
																onChange={handleChange}
																onBlur={handleBlur}
															/>
															{errors.members &&
																touched.members &&
																errors.members[index] &&
																touched.members[index] &&
																errors.members[index].discord &&
																touched.members[index].discord &&
																	<div className="input-feedback">
																		{errors.members[index].discord}
																	</div>
															}
														</div>

														{index < values.members.length - 1 &&
															<img
																className={css`
																	width: 40px;
																	height: 40px;
																	position: absolute;
																	right: -60px;
																	bottom: 0;
																	cursor: pointer;
																`}
																src={removeicon}
																onClick={() => remove(index)}
																alt="remove member"
															/>
														}
													</div>)}
											{values.members.length < 4 &&
												<img
													className={css`
														width: 40px;
														height: 40px;
														position: absolute;
														bottom: 20px;
														right: 0;
														cursor: pointer;
													`}
													src={addicon}
													onClick={() => push({ name: '', discord: '' })}
													alt="add member"
												/>
											}
										</div>
									}
								</FieldArray>
							</div>
						</form>
					</div>
				);
			}}
		</Formik>
	);
}

export default RegisterPage;
