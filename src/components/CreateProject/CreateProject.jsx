import useInput from "../../hooks/use-input";
import styles from "./CreateProject.module.css";
import * as projectService from "../../services/projectService";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router";

/**
 * Create project form - component for rendering all form input fields
 * @param props - onAddData
 * @returns {JSX}
 */
const CreateProject = (props) => {
  const navigate = useNavigate();

  const { user } = useAuthContext();
  let ownerId = user.id;

  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangedHandler,
    inputBlurHandler: nameBlurHandler,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredCompanyName,
    isValid: enteredCompanyNameIsValid,
    hasError: companyNameInputHasError,
    valueChangeHandler: companyNameChangedHandler,
    inputBlurHandler: companyNameBlurHandler,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
  } = useInput((value) =>
    value.trim().match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)
  );

  const {
    value: enteredFrondendTech,
    isValid: feTechInputIsValid,
    hasError: feTechInputHasError,
    valueChangeHandler: feTechChangeHandler,
    inputBlurHandler: feTechBlurHandler,
  } = useInput((value) => value !== "");

  const {
    value: enteredBackendTech,
    isValid: beTechInputIsValid,
    hasError: beTechInputHasError,
    valueChangeHandler: beTechChangeHandler,
    inputBlurHandler: beTechBlurHandler,
  } = useInput((value) => value !== "");

  const {
    value: enteredLink,
    isValid: enteredLinkIsValid,
    hasError: linkInputHasError,
    valueChangeHandler: linkChangedHandler,
    inputBlurHandler: linkBlurHandler,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredPicture,
    isValid: fileInputIsValid,
    hasError: fileInputHasError,
    valueChangeHandler: fileChangeHandler,
    inputBlurHandler: fileBlurHandler,
  } = useInput((value) => value !== "");

  const {
    value: enteredDescription,
    isValid: descriptionInputIsValid,
    hasError: descriptionInputHasError,
    valueChangeHandler: descriptionChangeHandler,
    inputBlurHandler: descriptionBlurHandler,
  } = useInput((value) => value !== "");

  let formIsValid = false;

  if (
    enteredNameIsValid &&
    enteredCompanyNameIsValid &&
    enteredEmailIsValid &&
    feTechInputIsValid &&
    beTechInputIsValid &&
    enteredLinkIsValid &&
    fileInputIsValid &&
    descriptionInputIsValid
  ) {
    formIsValid = true;
  }

  /**
   * Handles user data after Submit button is clicked and resets the input fields
   * @param event
   */
  const formSubmissionHandler = (event) => {
    event.preventDefault();

    const data = {
      name: enteredName,
      companyName: enteredCompanyName,
      email: enteredEmail,
      frontendTech: enteredFrondendTech,
      backendTech: enteredBackendTech,
      link: enteredLink,
      picture: enteredPicture,
      description: enteredDescription,
    };

    try {
      projectService.addProject(data, ownerId).then(() => {
        navigate("/");
      });
    } catch (err) {}
  };

  const nameInputClasses = nameInputHasError
    ? `${styles.form} ${styles.invalid}`
    : styles.form;

  const companyNameInputClasses = companyNameInputHasError
    ? `${styles.form} ${styles.invalid}`
    : styles.form;

  const emailInputClasses = emailInputHasError
    ? `${styles.form} ${styles.invalid}`
    : styles.form;

  const feTechInputClasses = feTechInputHasError
    ? `${styles.form} ${styles.invalid}`
    : styles.form;

  const beTechInputClasses = beTechInputHasError
    ? `${styles.form} ${styles.invalid}`
    : styles.form;

  // look from this example and implemet it for the others lazy boy !!!
  const linkInputClasses = linkInputHasError
    ? `${styles.form} ${styles.invalid}`
    : styles.form;

  const fileInputClasses = fileInputHasError
    ? `${styles.form} ${styles.invalid}`
    : styles.form;

  const descriptionTextareaClasses = descriptionInputHasError
    ? `${styles.form} ${styles.invalid} ${styles.last}`
    : `${styles.form} ${styles.last}`;

  return (
    <>
      <h1 className={styles["heading-create"]}>When ideas become reality!</h1>
      <div className={styles.hero}>
        <form onSubmit={formSubmissionHandler}>
          <div className={nameInputClasses}>
            <label htmlFor="name">Project name</label>
            <input
              type="text"
              id="name"
              placeholder="Project name"
              onChange={nameChangedHandler}
              onBlur={nameBlurHandler}
              value={enteredName}
            />
            {nameInputHasError && (
              <p className={styles["error-text"]}>Enter project name.</p>
            )}
          </div>

          <div className={companyNameInputClasses}>
            <label htmlFor="name">Company name</label>
            <input
              type="text"
              id="company-name"
              placeholder="Company name"
              onChange={companyNameChangedHandler}
              onBlur={companyNameBlurHandler}
              value={enteredCompanyName}
            />
            {companyNameInputHasError && (
              <p className={styles["error-text"]}>Enter company name.</p>
            )}
          </div>

          <div className={emailInputClasses}>
            <label htmlFor="email">Company e-mail</label>
            <input
              type="email"
              id="email"
              placeholder="someGoodCompany@gmail.com"
              onChange={emailChangeHandler}
              onBlur={emailBlurHandler}
              value={enteredEmail}
            />
            {emailInputHasError && (
              <p className={styles["error-text"]}>Enter a valid e-mail.</p>
            )}
          </div>
          <div className={feTechInputClasses}>
            <label htmlFor="tech-stac-f">Select Frontend technology</label>
            <select
              id="tech-stac-f"
              name="tech-stac"
              onChange={feTechChangeHandler}
              onBlur={feTechBlurHandler}
            >
              <option value="blank"></option>
              <option value="JavaScript">JavaScript</option>
              <option value="React">React</option>
              <option value="Angular">Angular</option>
              <option value="Vue">Vue</option>
              <option value="discuss">Discuss it with our team</option>
            </select>
            {feTechInputHasError && (
              <p className={styles["error-text"]}>
                Select a Frontend technology.
              </p>
            )}
          </div>

          <div className={beTechInputClasses}>
            <label htmlFor="tech-stack-b">Select a Backend technology.</label>
            <select
              id="tech-stack-b"
              name="tech-stack"
              onChange={beTechChangeHandler}
              onBlur={beTechBlurHandler}
            >
              <option value="blank"></option>
              <option value="PHP">PHP</option>
              <option value="Java">Java</option>
              <option value="Python">Python</option>
              <option value="discuss">Discuss it with our team</option>
            </select>
            {beTechInputHasError && (
              <p className={styles["error-text"]}>
                Select a Backend technology.
              </p>
            )}
          </div>

          <div className={linkInputClasses}>
            <label htmlFor="link">Add link towards project design</label>
            <input
              type="text"
              id="link"
              placeholder="https://figma.com"
              onChange={linkChangedHandler}
              onBlur={linkBlurHandler}
              value={enteredLink}
            />
            {linkInputHasError && (
              <p className={styles["error-text"]}>Enter link.</p>
            )}
          </div>

          <div className={fileInputClasses}>
            <label htmlFor="link-picture">
              Add link towards project cover photo
            </label>
            <input
              type="text"
              id="link-picture"
              placeholder="https://someCoolPicture.com"
              onChange={fileChangeHandler}
              onBlur={fileBlurHandler}
              value={enteredPicture}
            />
            {fileInputHasError && (
              <p className={styles["error-text"]}>Enter picture link.</p>
            )}
          </div>
          <div className={descriptionTextareaClasses}>
            <label htmlFor="description">Tell us more about the project?</label>
            <textarea
              id="description"
              name="description"
              placeholder="It is a react app project, about other projects suggested to Skillwork "
              rows="6"
              onChange={descriptionChangeHandler}
              onBlur={descriptionBlurHandler}
              value={enteredDescription}
            />
            {descriptionInputHasError && (
              <p className={styles["error-text"]}>Write a description.</p>
            )}
          </div>

          {/* put module css class */}
          <div className="form-actions">
            <button disabled={!formIsValid}>Submit</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateProject;
