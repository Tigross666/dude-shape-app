import { Icon } from "../icon/icon";
import styles from "./companies.module.css";

export const Companies = () => {
  return (
    <div className={styles.companies}>
      <h2 className={styles.title}>Trusted by 20,000+ companies</h2>

      <div className={styles.logos}>
        <Icon name="mastercard" />
        <Icon name="airbnb" />
        <Icon name="uber" />
        <Icon name="paypal" />
        <Icon name="visa" />
        <Icon name="stripe" />
      </div>
    </div>
  );
};
