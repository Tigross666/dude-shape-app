import styles from "./subscribe.module.css";
import { Icon } from "../icon/icon";
import { Button } from "../button/button";
import mail from "../../assets/mail.svg";

export const Subscribe = () => {
  return (
    <div className={styles.allContent}>
      <h1>Subscribe to get the latest news about us</h1>
      <p className={styles.paragraph}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed <br />
        eiusmod tempor incididunt ut labore at dolore.
      </p>
      <div className={styles.inputContainer}>
        <Icon src={mail} alt="mail" className={styles.icon} />
        <input
          type="email"
          placeholder="Enter your email"
          className={styles.emailInput}
        />
        <Button size="medium" presets="dark">
          Register
        </Button>
      </div>
    </div>
  );
};
