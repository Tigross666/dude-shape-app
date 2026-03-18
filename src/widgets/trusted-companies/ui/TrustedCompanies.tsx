import { Icon } from '@/shared/ui/icon';
import { COMPANY_LOGOS } from './constants';
import styles from './trusted-companies.module.css';

export const TrustedCompanies = () => {
  return (
    <div className={styles.section}>
      <h2 className={styles.title}>Trusted by 20,000+ companies</h2>
      <div className={styles.logos}>
        {COMPANY_LOGOS.map((logo) => (
          <Icon key={logo.alt} src={logo.src} alt={logo.alt} />
        ))}
      </div>
    </div>
  );
};
