import * as projectService from "../../services/projectService";
import { useEffect, useState, useContext } from "react";
import styles from "./Profile.module.css";
import ProfileCard from "./ProfileCard";
import { AuthContext } from "../../context/AuthContext";
import bulb from "../../assets/bulb.png";
import ideas from "../../assets/ideas-cut.jpg";

const Profile = () => {
  const [projects, setProjects] = useState([]);

  const { user } = useContext(AuthContext);
  console.log(user);

  useEffect(() => {
    projectService.getByOwner(user.id).then((result) => setProjects(result));
  }, []);

  return (
    <>
      <article className={styles.background}>
        <img src={ideas} alt="react-pic" className={styles.image} />
      </article>
      <div className={styles["project-collection-wrapper"]}>
        <h2 className={styles["projects-collection-heading"]}>Your ideas</h2>
        <div className={styles["project-collection-img"]}>
          <img src={bulb} alt="bulb" />
        </div>
      </div>
      <section className={styles["projects-collection"]}>
        {projects.length > 0 ? (
          projects.map((x) => <ProfileCard key={x.id} project={x} />)
        ) : (
          <h3 className={styles["no-projects"]}>There are no projects.</h3>
        )}
      </section>
    </>
  );
};

export default Profile;
