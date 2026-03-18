import { Header } from '@/widgets/header';
import { HeroSection } from '@/widgets/hero-section';
import { TrustedCompanies } from '@/widgets/trusted-companies';
import { AboutSection } from '@/widgets/about-section';
import { PopularFurniture } from '@/widgets/popular-furniture';
import { FurniturePicker } from '@/widgets/furniture-picker';
import { CustomerReview } from '@/widgets/customer-review';
import { SubscribeSection } from '@/widgets/subscribe-section';
import { Footer } from '@/widgets/footer';
import styles from './home-page.module.css';

export const HomePage = () => {
  return (
    <>
      <div className={styles.layout}>
        <Header />
        <HeroSection />
        <TrustedCompanies />
        <AboutSection />
        <PopularFurniture />
        <FurniturePicker />
        <CustomerReview />
        <SubscribeSection />
      </div>
      <Footer />
    </>
  );
};
