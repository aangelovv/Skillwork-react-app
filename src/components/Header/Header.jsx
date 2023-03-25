import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import { useAuthContext } from "../../context/AuthContext";
import logo from "../../assets/Skillwork.png";

const Header = () => {
  const { user } = useAuthContext();
  console.log(user);

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <li className={styles.links}>
          <Link to="/">
            <img src={logo} alt="Skillwork Logo" className={styles.img} />
          </Link>
        </li>
        <div className={styles["links-wrapper"]}>
          {user.email && (
            <>
              <span className={styles.links}>Hello, {user.username}</span>
              {/* <img src="" alt="user photo" /> */}
            </>
          )}
          <li className={styles.links}>
            <Link to="/catalog" className={styles.link}>
              All projects
            </Link>
          </li>
          {!user.email ? (
            <div className={styles["links-wrapper"]}>
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
            </div>
          ) : (
            <div className={styles["links-wrapper"]}>
              <li className={styles.links}>
                <Link to="/create" className={styles.link}>
                  Create Project
                </Link>
              </li>
              <li className={styles.links}>
                <Link to="/profile" className={styles.link}>
                  Profile
                </Link>
              </li>
              <li className={styles.links}>
                <Link to="/logout" className={styles.link}>
                  Logout
                </Link>
              </li>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
