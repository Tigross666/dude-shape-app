import styles from "./footer.module.css";
import { MEDIA } from "./constants";
import FeatureItem from "../featureItem/featureItem";
import { Link } from "../link/link";
import { Button } from "../button/button";
import arrow from "../../assets/arrow2.svg";
import { Icon } from "../icon/icon";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.brandSection}>
          <h3>DudeShape</h3>
          <p className={styles.brandDescription}>
            Lorem ipsum dolor sit amet, conse ctetur adipiscing elit, sed
            eiusmod tempor incididunt ut labore.
          </p>
          <h3>Follow Us :</h3>
          <div className={styles.socialMedia}>
            {MEDIA.map((item) => (
              <FeatureItem className={styles.links}
                key={item.id}
                id={item.id}
                icon={item.icon}
                alt={item.alt}
              />
            ))}
          </div>
        </div>

        <div className={styles.navSection}>
          <h3>Take a tour</h3>
          <Link title="Features" />
          <Link title="Pricing" />
          <Link title="Product" />
          <Link title="Support" />
        </div>

        <div className={styles.navSection}>
          <h3>Our company</h3>
          <Link title="About Us" />
          <Link title="Blog" />
          <Link title="Media" />
          <Link title="Contact Us" />
        </div>

        <div className={styles.subscribeSection}>
          <h3>Subscribe</h3>
          <p className={styles.subscribeText}>
            Subscribe to get the latest news from us
          </p>
          <div className={styles.subscribeForm}>
            <input
              type="email"
              placeholder="Enter your email"
              className={styles.emailInput}
            />
            <Button
              className={styles.subscribeButton}
              size="vector"
              presets="arrow"
            >
              <Icon src={arrow}/>
            </Button>
          </div>
        </div>
      </div>

      <div className={styles.copyright}>
        Copyright @ 2021. Crafted with love.
      </div>
    </footer>
  );
};
