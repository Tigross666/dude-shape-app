import { Icon } from "../icon/icon";
import { ICONS } from "./constants";
import styles from "./companies.module.css";

export const Companies = () => {
  return (
    <div className={styles.root}>
      <h2 className={styles.title}>Trusted by 20,000+ companies</h2>

      <div className={styles.logos}>
        {ICONS.map((el) => {
          return <Icon src={el.src} alt={el.alt} />;
        })}
      </div>
    </div>
  );
};
