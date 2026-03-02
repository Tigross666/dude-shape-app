import styles from "./furniture.module.css";
import { Icon } from "../icon/icon";
import { Button } from "../button/button";
import vectorLeft from "../../assets/left_vector.svg";
import vectorRight from "../../assets/right_vector.svg";

export const Furniture = () => {
  return (
    <div className={styles.furniture}>
      <div>
        <h1 className={styles.title}>Our Popular Furniture</h1>
        <p className={styles.paragraph}>
          All of our furniture uses the best materials and choices for our
          customers.All of our <br />
          furniture uses the best materials and choices for our customers.
        </p>
      </div>

      <div className={styles.vector}>
        <Button size="vector" presets="custom">
          <Icon src={vectorLeft} alt="vector left" />
        </Button>
        <Button size="vector" presets="custom">
          <Icon src={vectorRight} alt="vector right" />
        </Button>
      </div>
    </div>
  );
};
