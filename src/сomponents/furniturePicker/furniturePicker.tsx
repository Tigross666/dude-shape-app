import { Button } from "../button/button";
import { Icon } from "../icon/icon";
import styles from "./furniturePicker.module.css";
import interiorFour from "../../assets/interiorFour.png";
import { CATEGORIES } from "./constants";
import { CategoryButton } from "../categoryButton/categoryButton";

export const FurniturePicker = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.mainTitle}>All Furniture</h1>
      <div className={styles.tabBar}>
        <Button>
          <h3 className={styles.tabText}>Shop By Room</h3>
        </Button>
        <Button>
          <h3 className={styles.tabText}>Shop By Category</h3>
        </Button>
        <Button>
          <h3 className={styles.tabText}>Shop By Style</h3>
        </Button>
      </div>

      <div className={styles.contentWrapper}>
        <Icon src={interiorFour} alt="interiorFour" />
        <div className={styles.grid}>
          {CATEGORIES.map(
            (buttonOfSelection: {
              image: { url: string; alt: string };
              title: string;
            }) => (
              <CategoryButton
                image={buttonOfSelection.image}
                title={buttonOfSelection.title}
              />
            ),
          )}
        </div>
      </div>
    </div>
  );
};
