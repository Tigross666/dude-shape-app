import styles from './subscribe-section.module.css';
import { Icon } from '@/shared/ui/icon';
import { Button } from '@/shared/ui/button';
import mail from '@/shared/assets/mail.svg';

export const SubscribeSection = () => {
  return (
    <div className={styles.section}>
      <h1>Subscribe to get the latest news about us</h1>
      <p className={styles.description}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed <br />
        eiusmod tempor incididunt ut labore at dolore.
      </p>
      <div className={styles.inputContainer}>
        <Icon src={mail} alt="mail" className={styles.mailIcon} />
        <input
          type="email"
          placeholder="Enter your email"
          className={styles.emailInput}
        />
        <Button size="medium" presets="dark">
          Register
        </Button>
      </div>
    </div>
  );
};
