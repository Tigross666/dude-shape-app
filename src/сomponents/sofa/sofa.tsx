import { Icon } from "../icon/icon";
import styles from "./sofa.module.css";

export const Sofa = () => {
  return (
    <div className={styles.sofa}>
      <Icon name="sofa"/>

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
          <div className={styles.elements}>
            <div className={styles.elementIcons}>
              <Icon name="shield"/>
            </div>
            <div>
              <h2 className={styles.title}>Best Quality</h2>
              <p className={styles.paragraph}>
                All of our furniture uses the best <br />
                materials and choices
              </p>
            </div>
          </div>

          <div className={styles.elements}>
            <div className={styles.elementIcons}>
              <Icon name="tick"/>
            </div>
            <div>
              <h2 className={styles.title}>100% Secure</h2>
              <p className={styles.paragraph}>
                All of our furniture uses the best <br />
                materials and choices
              </p>
            </div>
          </div>

          <div className={styles.elements}>
            <div className={styles.elementIcons}>
              <Icon name="truck"/>
            </div>
            <div>
              <h2 className={styles.title}>Free Shpping</h2>
              <p className={styles.paragraph}>
                All of our furniture uses the best <br />
                materials and choices
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
