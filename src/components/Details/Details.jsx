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
      <button className={styles.delete} onClick={deleteHandler}>
        Delete
      </button>
      <Link to={`/edit/${project.id}`} className={styles.edit}>
        Edit
      </Link>
    </article>
  );

  return (
    <>
      <article className={styles["project-item"]}>
        <article className={styles["img-project"]}>
          <img src={project.link} alt="project" />
        </article>
        <p className={styles["input-texts"]}>{project.name}</p>
        <p className={styles["input-texts"]}>{project.email}</p>
        <p className={styles["input-texts"]}>{project.backendTech}</p>
        <p className={styles["input-texts"]}>{project.description}</p>

        {projectOwner ? ownerBtn : ""}
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
