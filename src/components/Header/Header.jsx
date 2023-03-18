import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import logo from "../../assets/logo.png";
// import { useAuthContext } from '../../contexts/AuthContext';

const Header = () => {
  // const { user } = useAuthContext();

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <li className={styles.links}>
          <Link className={`${styles.home} ${styles.links}`} to="/">
            <img src={logo} alt="Skillwork Logo" className={styles.img} />
            <h1 className={styles.heading}>Skillwork</h1>
          </Link>
        </li>
        {/* <li className={styles.}>Hello, {user.username}</li>  */}
        <div className={styles["links-wrapper"]}>
          <li className={styles.links}>
            <Link to="/catalog" className={styles.link}>
              All projects
            </Link>
          </li>
          <>
            <li className={styles.links}>
              <Link to="/login" className={styles.link}>
                Login
              </Link>
            </li>
            <li className={styles.links}>
              <Link to="/register" className={styles.link}>
                Register
              </Link>
            </li>
          </>

          <>
            <li className={styles.links}>
              <Link to="/create" className={styles.link}>
                Create Project
              </Link>
            </li>
            <li className={styles.links}>
              <Link to="/logout" className={styles.link}>
                Logout
              </Link>
            </li>
          </>
        </div>
      </nav>
    </header>
  );
};

export default Header;
