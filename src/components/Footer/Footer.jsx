import {
  FaFacebook,
  FaGithub,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPhone,
} from "react-icons/fa";
import styles from "./Footer.module.css";
import logo from "../../assets/Skillwork.png";

console.log(styles);

function Footer() {
  return (
    <footer className="footer">
      <div className={styles.logo}>
        <img
          src="https://skillwork.co.uk/assets/logo/skillwork_white_2.png"
          alt="Skillwork Software & Consulting Logo"
        />
      </div>
      <div className={styles.contact}>
        <p>
          {" "}
          <FaMapMarkerAlt /> One Canada Square, Canary Wharf, London E14 5AB, UK
        </p>
        <p>
          {" "}
          <FaPhone /> +44 (0) 7789 164409
        </p>
        <p>
          {" "}
          <FaMapMarkerAlt /> Blvd. Lomsko Shose 65, Apartment. 39, Sofia,
          Bulgaria
        </p>
        <p>
          {" "}
          <FaPhone /> +359 (0) 8782 06786
        </p>
      </div>
      <div className={styles["social-icons"]}>
        <a
          href="https://www.facebook.com/Skillworksoftware"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebook />
        </a>
        <a
          href="https://github.com/Skillwork-Software/circle"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub />
        </a>
        <a
          href="https://www.linkedin.com/company/skillworkconsulting/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin />
        </a>
      </div>
    </footer>
  );
}
export default Footer;
