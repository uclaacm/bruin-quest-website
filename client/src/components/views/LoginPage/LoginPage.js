import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { loginUser } from "../../../_actions/user_actions";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from "react-redux";
import './styles.css';
import TextInput from '../../TextInput/TextInput';
import Text from '../../Text/Text';
import Button from '../../Button/Button';
import WelcomeBanner from '../../WelcomeBanner/WelcomeBanner';


function LoginPage(props) {
  const dispatch = useDispatch();
  // const rememberMeChecked = localStorage.getItem("rememberMe") ? true : false;

  const [formErrorMessage, setFormErrorMessage] = useState('')
  // const [rememberMe, setRememberMe] = useState(rememberMeChecked)

  // const handleRememberMe = () => {
  //   setRememberMe(!rememberMe)
  // };
  // const handleChange = (event) => {
  //   console.log(event.target.value);
  // }
  // const initialTeam = localStorage.getItem("rememberMe");

  return (
    <Formik
      initialValues={{
        team: '',
        password: '',
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
          dispatch(loginUser(dataToSubmit))
            .then(response => {
              if (response.payload.loginSuccess) {
                window.localStorage.setItem('userId', response.payload.userId);
                
                window.localStorage.setItem('rememberMe', values.id);

                props.history.push("/");
              } else {
                setFormErrorMessage('Check out your Account or Password again')
              }
            })
            .catch(err => {
              setFormErrorMessage('Check out your Account or Password again')
              setTimeout(() => {
                setFormErrorMessage("")
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
          handleReset,
        } = props;
        return (
          <div className="main-container">
            <WelcomeBanner></WelcomeBanner>

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

              {formErrorMessage && (
                <label ><p style={{ color: '#ff0000bf', fontSize: '0.7rem', border: '1px solid', padding: '1rem', borderRadius: '10px' }}>{formErrorMessage}</p></label>
              )}

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
};

export default withRouter(LoginPage);


