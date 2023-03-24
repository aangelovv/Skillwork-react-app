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
          src="https://c4.wallpaperflare.com/wallpaper/111/745/193/reactjs-javascript-programming-programming-language-hd-wallpaper-preview.jpg"
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
