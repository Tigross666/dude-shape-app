import { Navigation } from "../navigation/navigation";
import loupeImage from "../../assets/loupe.svg";
import menuImage from "../../assets/menu.svg";
import styles from "./header.module.css";

export const Header = () => {
  return (
    <header className={styles.header}>
      <h2 className={styles.title}>DudeShape</h2>
      <div className={styles.navigation}>
      <Navigation />
      </div>
      <div className={styles.tools}>
        <img src={loupeImage} alt="loupe" />
        <img src={menuImage} alt="menu" />
      </div>
    </header>
  );
};
