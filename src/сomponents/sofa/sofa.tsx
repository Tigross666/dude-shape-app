import { Icon } from "../icon/icon";
import FeatureItem from "../featureItem/featureItem";
import styles from "./sofa.module.css";
import sofa from "../../assets/sofa.png";
import shield from "../../assets/shield.svg";
import tick from "../../assets/tick.svg";
import truck from "../../assets/truck.svg";

export const Sofa = () => {
  return (
    <div className={styles.sofa}>
      <Icon src={sofa} alt="sofa" />

      <div>
        <div>
          <h1 className={styles.name}>About Us</h1>
          <p>
            All of our furniture uses the best materials and <br />
            choices for our customers.All of our furniture <br />
            uses the best materials
          </p>
        </div>

        <div className={styles.information}>
          <FeatureItem
            icon={shield}
            alt="shield"
            title="Best Quality"
            description="All of our furniture uses the best materials and choices"
          />

          <FeatureItem
            icon={tick}
            alt="tick"
            title="100% Secure"
            description="All of our furniture uses the best materials and choices"
          />

          <FeatureItem
            icon={truck}
            alt="truck"
            title="Free Shipping"
            description="All of our furniture uses the best materials and choices"
          />
        </div>
      </div>
    </div>
  );
};
