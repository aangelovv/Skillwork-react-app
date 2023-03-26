import useInput from "../../hooks/use-input";
import styles from "./Register.module.css";

import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";
import * as authService from "../../services/authService";

/**
 * Job form - component for rendering all form input fields
 * @returns {JSX}
 */
const Register = (props) => {
  const { userLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangedHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
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

  const {
    value: enteredGender,
    isValid: radioInputIsValid,
    valueChangeHandler: radioChangeHanlder,
  } = useInput((value) => value !== "");

  const {
    value: enteredExp,
    isValid: expInputIsValid,
    hasError: expInputHasError,
    valueChangeHandler: expChangeHandler,
    inputBlurHandler: expInputBlurHandler,
    reset: resetExpInput,
  } = useInput((value) => value.trim() !== "" && value < 101.5 && value > 0);

  const {
    value: enteredTech,
    isValid: techInputIsValid,
    hasError: techInputHasError,
    valueChangeHandler: techChangeHandler,
    inputBlurHandler: techBlurHandler,
  } = useInput((value) => value !== "");

  const {
    value: enteredPicture,
    isValid: fileInputIsValid,
    hasError: fileInputHasError,
    valueChangeHandler: fileChangeHandler,
    inputBlurHandler: fileBlurHandler,
    reset: resetFileInput,
  } = useInput((value) => value !== "");

  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangedHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPasswordInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: repeatEnteredPassword,
    isValid: repeatEnteredPasswordIsValid,
    hasError: repeatPasswordInputHasError,
    valueChangeHandler: repeatPasswordChangedHandler,
    inputBlurHandler: repeatPasswordBlurHandler,
    reset: resetRepeatPasswordInput,
  } = useInput((value) => value.trim() !== "");

  let formIsValid = false;

  if (
    enteredNameIsValid &&
    enteredEmailIsValid &&
    radioInputIsValid &&
    expInputIsValid &&
    techInputIsValid &&
    fileInputIsValid &&
    enteredPasswordIsValid &&
    repeatEnteredPasswordIsValid
  ) {
    formIsValid = true;
  }

  /**
   * Handles user data after Submit button is clicked and resets the input fields
   * @param event
   */
  const formSubmissionHandler = (event) => {
    event.preventDefault();
    console.log("stawa li neshto ? ");

    const data = {
      username: enteredName,
      email: enteredEmail,
      gender: enteredGender,
      exp: enteredExp,
      tech: enteredTech,
      photo: enteredPicture,
      password: enteredPassword,
      repeatPassword: repeatEnteredPassword,
    };

    if (enteredPassword !== repeatEnteredPassword) {
      alert("Paswrods don't match");
      return;
    }

    authService
      .register(data)
      .then((authData) => {
        userLogin(authData);
        navigate("/");
      })
      .catch(() => {
        navigate("/404");
      });

    resetNameInput();
    resetEmailInput();
    resetExpInput();
    resetFileInput();
    resetPasswordInput();
    resetRepeatPasswordInput();
  };

  const nameInputClasses = nameInputHasError
    ? `${styles.form} ${styles.invalid}`
    : styles.form;

  const emailInputClasses = emailInputHasError
    ? `${styles.form} ${styles.invalid}`
    : styles.form;

  const expInputClasses = expInputHasError
    ? `${styles.form} ${styles.invalid}`
    : styles.form;

  const techInputClasses = techInputHasError
    ? `${styles.form} ${styles.invalid}`
    : styles.form;

  // look from this example and implemet it for the others lazy boy !!!
  const fileInputClasses = fileInputHasError
    ? `${styles.form} ${styles.invalid}`
    : styles.form;

  const passwordInputClasses = passwordInputHasError
    ? `${styles.form} ${styles.invalid} ${styles.last}`
    : `${styles.form} ${styles.last}`;

  const repeatPasswordInputClasses = repeatPasswordInputHasError
    ? `${styles.form} ${styles.invalid} ${styles.last}`
    : `${styles.form} ${styles.last}`;

  return (
    <>
      <h2 className={styles["heading-register"]}>Register here:</h2>
      <div className={styles.hero}>
        <form onSubmit={formSubmissionHandler}>
          <div className={nameInputClasses}>
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              placeholder="John Smith"
              onChange={nameChangedHandler}
              onBlur={nameBlurHandler}
              value={enteredName}
            />
            {nameInputHasError && (
              <p className={styles["error-text"]}>Enter your name.</p>
            )}
          </div>
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

          <div className={styles["radio-button"]}>
            <p>Gender</p>
            <div className={styles.wraper}>
              <div>
                <input
                  type="radio"
                  name="gender"
                  id="male"
                  value="male"
                  onChange={radioChangeHanlder}
                />
                <label htmlFor="male">male</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="gender"
                  id="female"
                  value="female"
                  onChange={radioChangeHanlder}
                />
                <label htmlFor="female">female</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="gender"
                  id="programmer"
                  value="programmer"
                  onChange={radioChangeHanlder}
                />
                <label htmlFor="programmer">programmer</label>
              </div>
            </div>
          </div>
          <div className={expInputClasses}>
            <label htmlFor="year">Years of experience</label>
            <input
              type="number"
              id="year"
              name="year"
              placeholder="2"
              min="0"
              max="101"
              step="0.5"
              onChange={expChangeHandler}
              onBlur={expInputBlurHandler}
              value={enteredExp}
            />
            {expInputHasError && (
              <p className={styles["error-text"]}>Enter years of experience.</p>
            )}
          </div>
          <div className={techInputClasses}>
            <label htmlFor="tech-stack">Your Tech stack</label>
            <select
              id="tech-stack"
              name="tech-stack"
              onChange={techChangeHandler}
              onBlur={techBlurHandler}
            >
              <option value="blank"></option>
              <option value="manager">Project manager</option>
              <option value="Front-end">Front-end</option>
              <option value="Back-end">Back-end</option>
              <option value="Full-stack">Full-stack</option>
              <option value="QA">QA</option>
              <option value="DevOps">DevOps</option>
            </select>
            {techInputHasError && (
              <p className={styles["error-text"]}>Select a Tech stack type.</p>
            )}
          </div>
          <div className={fileInputClasses}>
            <label htmlFor="file">Your photo</label>
            <input
              type="file"
              id="file"
              name="file"
              onChange={fileChangeHandler}
              onBlur={fileBlurHandler}
              value={enteredPicture}
            />
            {fileInputHasError && (
              <p className={styles["error-text"]}>Choose a file.</p>
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

          <div className={repeatPasswordInputClasses}>
            <label htmlFor="repeat-password">Repeat your Password</label>
            <input
              type="password"
              id="repeat-password"
              placeholder="*************"
              onChange={repeatPasswordChangedHandler}
              onBlur={repeatPasswordBlurHandler}
              value={repeatEnteredPassword}
            />
            {repeatPasswordInputHasError && (
              <p className={styles["error-text"]}>Enter your password.</p>
            )}
          </div>
          <div className="form-actions">
            <button disabled={!formIsValid}>Submit</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
