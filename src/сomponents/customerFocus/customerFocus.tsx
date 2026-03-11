import styles from "./customerFocus.module.css";
import { Icon } from "../icon/icon";
import nightstand from "../../assets/nightstand.png";
import person from "../../assets/person.svg";
import star from "../../assets/star.svg";

export const CustomerFocus = () => {
  return (
    <div className={styles.allContent}>
      <Icon src={nightstand} alt="nightstand" />
      <div className={styles.review}>
        <h1>
          Our customers are verry <br />
          importan to us
        </h1>
        <p>
          All of our furniture uses the best materials and choices for <br />
          our customers.All of our furniture uses the best materials <br />
          and choices for our customers.
        </p>
        <div className={styles.grade}>
          <Icon src={person} alt="person" />
          <div className={styles.name}>
            <h3>Mh Jibon</h3>
            <div className={styles.stars}>
              <Icon src={star} alt="star" />
              <p>4.8</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
