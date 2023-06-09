import { useAuthContext } from "../../context/AuthContext";
import { useNavigate, Link, useParams } from "react-router-dom";
import * as projectService from "../../services/projectService";
import { useState, useEffect } from "react";
import styles from "./Details.module.css";

import Modal from "react-modal";

const Details = () => {
  const { user } = useAuthContext();

  const navigate = useNavigate();
  const params = useParams();

  const [project, setProject] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    projectService
      .getById(params.projectId)
      .then((result) => setProject(result));
  }, [params.projectId]);

  const projectOwner = project.ownerId === user.id;

  const deleteHandler = (e) => {
    e.preventDefault();

    if (user.id === project.ownerId) {
      setShowModal(true);
    }
  };

  const ownerBtn = (
    <article className={styles["user-btn"]}>
      <button className={styles.btn} onClick={deleteHandler}>
        Delete
      </button>
      <Link to={`/edit/${project.id}`}>
        <button className={styles.btn}>Edit</button>
      </Link>
    </article>
  );

  return (
    <>
      <article className={styles["project-item"]}>
        <article className={styles["img-project"]}>
          <img src={project.picture} alt="project" />
        </article>
        <article className={styles["projects-info"]}>
          <p className={styles["input-texts"]}>
            Project name: <br />
            <strong> {project.name} </strong>
          </p>
          <p className={styles["input-texts"]}>
            Project owning company: <br />{" "}
            <strong> {project.companyName} </strong>
          </p>
          <p className={styles["input-texts"]}>
            Frontend technology: <br />{" "}
            <strong> {project.frontendTech} </strong>
          </p>
          <p className={styles["input-texts"]}>
            Backend technology: <br /> <strong> {project.backendTech} </strong>
          </p>
          <p className={styles["input-texts"]}>
            Project description technology: <br />{" "}
            <strong> {project.description} </strong>
          </p>

          {projectOwner ? ownerBtn : ""}
        </article>
      </article>

      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        className={styles.modal}
      >
        <div className={styles["modal-alignments"]}>
          <h2>Do you want to delete this project?</h2>
          <p>Are you sure? There is no coming back!</p>
          <div>
            <button
              onClick={() => {
                projectService.remove(project.id).then(() => {
                  navigate("/home");
                });
                setShowModal(false);
              }}
            >
              Yes
            </button>
            <button onClick={() => setShowModal(false)}>No</button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Details;
