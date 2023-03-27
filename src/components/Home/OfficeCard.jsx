import styles from "./OfficeCard.module.css";
import varnaPic from "../../assets/varna.jpg";
import londonPic from "../../assets/london.jpg";
import sofiaPic from "../../assets/sofia.jpg";

const OfficeCard = () => {
  return (
    <>
      <article className={styles.office}>
        <article>
          <img src={londonPic} alt="london-office-img" />
          <p className={styles.city}>London</p>
        </article>
      </article>

      <article className={styles.office}>
        <article>
          <img src={sofiaPic} alt="sofia-office-img" />
          <p className={styles.city}>Sofia</p>
        </article>
      </article>

      <article className={styles.office}>
        <article>
          <img src={varnaPic} alt="varna-img" />
          <p className={styles.city}>varna</p>
        </article>
      </article>
    </>
  );
};

export default OfficeCard;
