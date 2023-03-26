import * as projectService from "../../services/projectService";
import { useEffect, useState } from "react";
import styles from "./Catalog.module.css";
import CatalogCard from "./CatalogCard";
import projectsCollection from "../../assets/group-of-projects.png";

const Catalog = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    projectService.getAll().then((result) => setProjects(result));
  }, []);

  return (
    <>
      <article className={styles.background}>
        <img
          src="https://picjumbo.com/wp-content/uploads/minimalist-home-office-workspace-desk-setup-free-photo.jpg"
          alt="react-pic"
          className={styles.image}
        />
      </article>
      <div className={styles["project-collection-wrapper"]}>
        <h2 className={styles["projects-collection-heading"]}>
          Projects collection
        </h2>
        <div className={styles["project-collection-img"]}>
          <img src={projectsCollection} alt="projects-collection" />
        </div>
      </div>
      <section className={styles["projects-collection"]}>
        {projects.length > 0 ? (
          projects.map((x) => <CatalogCard key={x.id} project={x} />)
        ) : (
          <h3 className={styles["no-projects"]}>Loading projects...</h3>
        )}
      </section>
    </>
  );
};

export default Catalog;
