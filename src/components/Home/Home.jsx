import * as projectService from "../../services/projectService";
import { useEffect, useState } from "react";
import styles from "./Home.module.css";
import HomeCard from "./HomeCard";
import OfficeCard from "./OfficeCard";
import Footer from "../Footer/Footer";

const Home = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    projectService.getLatest().then((result) => setProjects(result));
  }, []);

  return (
    <>
      <article className={styles.background}>
        <img
          src="https://skillwork.co.uk/assets/img/1920x800/img1.jpg"
          alt="react-pic"
          className={styles.image}
        />
      </article>
      <h2 className={styles["projects-collection-heading"]}>
        Projects collection
      </h2>
      <section className={styles["projects-collection"]}>
        {projects.length > 0 ? (
          projects.map((x) => <HomeCard key={x.id} project={x} />)
        ) : (
          <h3 className={styles["no-projects"]}>There are no projects.</h3>
        )}
      </section>
      <h2 className={styles["offices-heading"]}>Offices Locations</h2>
      <section className={styles.offices}>{<OfficeCard />}</section>
      <Footer />
    </>
  );
};

export default Home;
