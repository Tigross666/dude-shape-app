import styles from './customer-review.module.css';
import { Icon } from '@/shared/ui/icon';
import nightstand from '@/shared/assets/nightstand.png';
import person from '@/shared/assets/person.svg';
import star from '@/shared/assets/star.svg';

export const CustomerReview = () => {
  return (
    <div className={styles.section}>
      <Icon src={nightstand} alt="nightstand" />
      <div className={styles.review}>
        <h1>
          Our customers are very <br />
          important to us
        </h1>
        <p>
          All of our furniture uses the best materials and choices for <br />
          our customers. All of our furniture uses the best materials <br />
          and choices for our customers.
        </p>
        <div className={styles.reviewer}>
          <Icon src={person} alt="reviewer" />
          <div className={styles.reviewerInfo}>
            <h3>Mh Jibon</h3>
            <div className={styles.rating}>
              <Icon src={star} alt="star" />
              <p>4.8</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
