import * as projectService from "../../services/projectService";
import { useEffect, useState } from "react";
import styles from "./Catalog.module.css";
import CatalogCard from "./CatalogCard";

const Catalog = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    projectService.getAll().then((result) => setProjects(result));
  }, []);

  return (
    <>
      <article className={styles.background}>
        <img
          src="https://skillwork.co.uk/assets/img/750x750/img2.jpg"
          alt="react-pic"
          className={styles.image}
        />
      </article>
      <h2 className={styles["projects-collection-heading"]}>
        Projects collection
      </h2>
      <section className={styles["projects-collection"]}>
        {projects.length > 0 ? (
          projects.map((x) => <CatalogCard key={x.id} project={x} />)
        ) : (
          <h3 className={styles["no-projects"]}>There are no projects.</h3>
        )}
      </section>
    </>
  );
};

export default Catalog;
