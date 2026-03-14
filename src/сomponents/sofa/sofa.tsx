import { Icon } from "../icon/icon";
import FeatureItem from "../featureItem/featureItem";
import { ITEMS } from "../sofa/constants";
import css from "./sofa.module.css";
import sofa from "../../assets/sofa.png";

export const Sofa = () => {
  return (
    <section className={css.sofa}>
      <Icon src={sofa} alt="sofa" />

      <div>
        <div>
          <h1 className={css.name}>About Us</h1>
          <p className={css.paragraph}>
            All of our furniture uses the best materials and <br />
            choices for our customers.All of our furniture <br />
            uses the best materials
          </p>
        </div>

        <div className={css.information}>
          {ITEMS.map((item) => (
            <FeatureItem
              id={item.id}
              icon={item.icon}
              alt={item.alt}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
