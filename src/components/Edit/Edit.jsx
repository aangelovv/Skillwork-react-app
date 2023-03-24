import useInput from "../../hooks/use-input";
import styles from "./Edit.module.css";
import { useNavigate, useParams } from "react-router";
import { useState, useEffect } from "react";
import * as projectService from "../../services/projectService";

const Edit = () => {
  const navigate = useNavigate();

  const params = useParams();

  const [project, setProject] = useState([]);

  useEffect(() => {
    projectService
      .getById(params.projectId)
      .then((result) => setProject(result));
  }, [params.projectId]);

  //   .//.// //   .//.// //   .//.// //   .//.// //   .//.// //   .//.//

  //   If you are reading this, i wanted to use defaultValue and set it to select input like this
  //   deafultValue={project.frontendTech} so it detects the option and set its value, BUT IT DOESNT WORK!%^$!%$!%

  const [selectedFeTech, setSelectedFeTech] = useState(project.frontendTech);

  const feTechChangeHandler = (event) => {
    setSelectedFeTech(event.target.value);
  };

  useEffect(() => {
    setSelectedFeTech(project.frontendTech);
  }, [project]);

  const [selectedBeTech, setSelectedBeTech] = useState(project.backendTech);

  const beTechChangeHandler = (event) => {
    setSelectedBeTech(event.target.value);
  };

  useEffect(() => {
    setSelectedBeTech(project.backendTech);
  }, [project]);

  //   .//.// //   .//.// //   .//.// //   .//.// //   .//.// //   .//.//

  const formEditHandler = (e) => {
    const projectsData = Object.fromEntries(new FormData(e.target));

    projectService.update(params.projectId, projectsData);

    navigate(`/project/${params.projectId}`);
  };
  const {
    hasError: nameInputHasError,
    valueChangeHandler: nameChangedHandler,
    inputBlurHandler: nameBlurHandler,
  } = useInput((value) => value.trim() !== "");

  const {
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
  } = useInput((value) =>
    value.trim().match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)
  );

  const { hasError: feTechInputHasError, inputBlurHandler: feTechBlurHandler } =
    useInput((value) => value !== "");

  const { hasError: beTechInputHasError, inputBlurHandler: beTechBlurHandler } =
    useInput((value) => value !== "");

  const {
    hasError: linkInputHasError,
    valueChangeHandler: linkChangedHandler,
    inputBlurHandler: linkBlurHandler,
  } = useInput((value) => value.trim() !== "");

  const {
    hasError: fileInputHasError,
    valueChangeHandler: fileChangeHandler,
    inputBlurHandler: fileBlurHandler,
  } = useInput((value) => value !== "");

  const {
    hasError: descriptionInputHasError,
    valueChangeHandler: descriptionChangeHandler,
    inputBlurHandler: descriptionBlurHandler,
  } = useInput((value) => value !== "");

  const nameInputClasses = nameInputHasError
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
    <div className={styles.hero}>
      <form onSubmit={formEditHandler}>
        <div className={nameInputClasses}>
          <label htmlFor="name">Project name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Project name"
            onChange={nameChangedHandler}
            onBlur={nameBlurHandler}
            defaultValue={project.name}
          />
          {nameInputHasError && (
            <p className={styles["error-text"]}>Enter project name.</p>
          )}
        </div>
        <div className={emailInputClasses}>
          <label htmlFor="email">Company e-mail</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="someGoodCompany@gmail.com"
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
            defaultValue={project.email}
          />
          {emailInputHasError && (
            <p className={styles["error-text"]}>Enter a valid e-mail.</p>
          )}
        </div>
        <div className={feTechInputClasses}>
          <label htmlFor="tech-stac-f">Select Frontend technology</label>
          <select
            id="tech-stac-f"
            name="frontendTech"
            onChange={feTechChangeHandler}
            onBlur={feTechBlurHandler}
            value={selectedFeTech}
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
            name="backendTech"
            onChange={beTechChangeHandler}
            onBlur={beTechBlurHandler}
            value={selectedBeTech}
          >
            <option value="blank"></option>
            <option value="PHP">PHP</option>
            <option value="Java">Java</option>
            <option value="Python">Python</option>
            <option value="discuss">Discuss it with our team</option>
          </select>
          {beTechInputHasError && (
            <p className={styles["error-text"]}>Select a Backend technology.</p>
          )}
        </div>

        <div className={linkInputClasses}>
          <label htmlFor="link">Add link towards project design</label>
          <input
            type="text"
            id="link"
            name="link"
            placeholder="https://figma.com"
            onChange={linkChangedHandler}
            onBlur={linkBlurHandler}
            defaultValue={project.link}
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
            name="picture"
            placeholder="https://someCoolPicture.com"
            onChange={fileChangeHandler}
            onBlur={fileBlurHandler}
            defaultValue={project.picture}
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
            defaultValue={project.description}
          />
          {descriptionInputHasError && (
            <p className={styles["error-text"]}>Write a description.</p>
          )}
        </div>

        {/* put module css class */}
        <div className="form-actions">
          <button>Edit</button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
