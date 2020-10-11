import React, { useState } from 'react';
import { Formik, FieldArray } from 'formik';
import * as Yup from 'yup';
import { registerUser } from '../../../_actions/user_actions';
import { useDispatch } from 'react-redux';
import * as Colors from '../../../constants/Colors';
import { css } from 'emotion';
import './styles.css';
import Text from '../../Text/Text';
import WelcomeBanner from '../WelcomeBanner/WelcomeBannerS';
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
				team: Yup.string()
					.required('Team is required'),
				password: Yup.string()
					.min(6, 'Password must be at least 6 characters')
					.required('Password is required'),
				members: Yup.array()
					.of(
						Yup.object().shape({
							name: Yup.string()
								.required('Member name is required'),
							discord: Yup.string()
								.required('Member discord is required')
						})
					)
			})}

			onSubmit={(values, { setSubmitting }) => {
				setTimeout(() => {
					const dataToSubmit = {
						team: values.team,
						password: values.password
					};
					console.log(dataToSubmit);
					alert(JSON.stringify(values, null, 2));
					dispatch(registerUser(dataToSubmit))
						.then(response => {
							if (response.payload.registerSuccess) {
								// Do something on register success
							} else {
								setFormErrorMessage('Account has already been made with that name');
							}
						})
						.catch(err => {
							setFormErrorMessage(err);
							setTimeout(() => {
								setFormErrorMessage('');
							}, 3000);
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
					handleReset
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

								{formErrorMessage &&
									<label >
										<p style={{
											color: '#ff0000bf',
											fontSize: '0.7rem',
											border: '1px solid',
											padding: '1rem',
											borderRadius: '10px'
										}}>
											{formErrorMessage}
										</p>
									</label>
								}
							</div>

							<div className="right-container">
								<Text>Member Info</Text>
								<FieldArray name="members" >
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
															{errors.members && touched.members &&
																errors.members[index] && touched.members[index] &&
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
															{errors.members && touched.members &&
																errors.members[index] && touched.members[index] &&
																errors.members[index].discord &&
																touched.members[index].discord &&
																	<div className="input-feedback">
																		{errors.members[index].discord}
																	</div>
															}
														</div>

														{
															index < values.members.length - 1 &&
															<img
																className={css`
																	width: 40px;
																	height: 40px;
																	position:absolute;
																	right: -60px;
																	bottom: 0;
																`}
																src={removeicon}
																onClick={() => remove(index)}
																alt='remove member'
															/>

														}

													</div>)}
											{
												values.members.length < 4 &&
											<img
												className={css`
													width: 40px;
													height: 40px;
													position: absolute;
													bottom: 20px;
													right: 0;
												`}
												src={addicon}
												onClick={() => push({ name: '', discord: '' })}
												alt='add member'
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
