import useInput from "../../hooks/use-input";
import styles from "./Login.module.css";

import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";
import * as authService from "../../services/authService";

/**
 * Job form - component for rendering all form input fields
 * @param props - onAddData
 * @returns {JSX}
 */
const Login = (props) => {
  const { userLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangedHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPasswordInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput((value) =>
    value.trim().match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)
  );

  let formIsValid = false;

  if (enteredPasswordIsValid && enteredEmailIsValid) {
    formIsValid = true;
  }

  /**
   * Handles user data after Submit button is clicked and resets the input fields
   * @param event
   */
  const formSubmissionHandler = (event) => {
    event.preventDefault();

    authService
      .login(enteredEmail, enteredPassword)
      .then((authData) => {
        userLogin(authData);
        navigate("/");
      })
      .catch(() => {
        navigate("/404");
      });

    resetPasswordInput();
    resetEmailInput();
  };

  const passwordInputClasses = passwordInputHasError
    ? `${styles.form} ${styles.invalid}`
    : styles.form;

  const emailInputClasses = emailInputHasError
    ? `${styles.form} ${styles.invalid}`
    : styles.form;

  return (
    <div className={styles.hero}>
      <form onSubmit={formSubmissionHandler}>
        <div className={emailInputClasses}>
          <label htmlFor="email">Your E-Mail</label>
          <input
            type="email"
            id="email"
            placeholder="johnSmith@gmail.com"
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
            value={enteredEmail}
          />
          {emailInputHasError && (
            <p className={styles["error-text"]}>Enter a valid e-mail.</p>
          )}
        </div>
        <div className={passwordInputClasses}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            placeholder="*************"
            onChange={passwordChangedHandler}
            onBlur={passwordBlurHandler}
            value={enteredPassword}
          />
          {passwordInputHasError && (
            <p className={styles["error-text"]}>Enter your password.</p>
          )}
        </div>
        <div className="form-actions">
          <button disabled={!formIsValid}>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
