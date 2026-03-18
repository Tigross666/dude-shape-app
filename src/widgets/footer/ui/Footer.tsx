import styles from './footer.module.css';
import { SOCIAL_MEDIA } from './constants';
import { FeatureItem } from '@/shared/ui/feature-item';
import { AppLink } from '@/shared/ui/app-link';
import { Button } from '@/shared/ui/button';
import { Icon } from '@/shared/ui/icon';
import arrow from '@/shared/assets/arrow2.svg';

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
            {SOCIAL_MEDIA.map((item) => (
              <FeatureItem
                key={item.id}
                className={styles.socialIcon}
                id={item.id}
                icon={item.icon}
                alt={item.alt}
              />
            ))}
          </div>
        </div>

        <div className={styles.navSection}>
          <h3>Take a tour</h3>
          <AppLink title="Features" />
          <AppLink title="Pricing" />
          <AppLink title="Product" />
          <AppLink title="Support" />
        </div>

        <div className={styles.navSection}>
          <h3>Our company</h3>
          <AppLink title="About Us" />
          <AppLink title="Blog" />
          <AppLink title="Media" />
          <AppLink title="Contact Us" />
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
              <Icon src={arrow} alt="submit" />
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
