import styles from "./furniture.module.css";
import vectorLeftIcon from "../../assets/left_vector.svg";
import vectorRightIcon from "../../assets/right_vector.svg";

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
        <button className={styles.left}>
          <img src={vectorLeftIcon} alt="vector left" />
        </button>
        <button className={styles.right}>
          <img src={vectorRightIcon} alt="vector right" />
        </button>
      </div>
    </div>
  );
};
