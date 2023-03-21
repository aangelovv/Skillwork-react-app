import { Link } from "react-router-dom";
import styles from "./HomeCard.module.css";

const HomeCard = (props) => {
  return (
    <article className={styles.projects}>
      <article className={styles["project-img-wrapper"]}>
        <img src={props.project.link} alt="project img" />
      </article>

      <p className={styles.text}>{props.project.name}</p>
      <p className={styles.text}>{props.project.email}</p>

      <section className={styles["project-details"]}>
        <Link to={`/project/${props.project.id}`} className={styles.btn}>
          Details
        </Link>
      </section>
    </article>
  );
};

export default HomeCard;