import styles from "./furniture.module.css";
import { Icon } from "../icon/icon";
import { Button } from "../button/button";
import vectorLeft from "../../assets/left_vector.svg";
import vectorRight from "../../assets/right_vector.svg";
import { Card } from "../card/card";
import { CARDS } from "./constants";

export const Furniture = () => {
  return (
    <div className={styles.furniture}>
      <div className={styles.titleAndVector}>
        <div>
          <h1 className={styles.title}>Our Popular Furniture</h1>
          <p className={styles.paragraph}>
            All of our furniture uses the best materials and choices for our
            customers.All of our <br />
            furniture uses the best materials and choices for our customers.
          </p>
        </div>

        <div className={styles.vector}>
          <Button size="vector" presets="arrow">
            <Icon src={vectorLeft} alt="vector left" />
          </Button>
          <Button size="vector" presets="arrow">
            <Icon src={vectorRight} alt="vector right" />
          </Button>
        </div>
      </div>

      <div className={styles.information}>
        {CARDS.map((card) => (
          <Card title={card.title} price={card.price} image={card.image} />
        ))}
      </div>
    </div>
  );
};
