import { Header } from "./сomponents/header/header";
import { Description } from "./сomponents/description/description";
import { Companies } from "./сomponents/companies/companies";
import { Sofa } from "./сomponents/sofa/sofa";
import { Furniture } from "./сomponents/furniture/furniture";
import { FurniturePicker } from "./сomponents/furniturePicker/furniturePicker";
import { CustomerFocus } from "./сomponents/customerFocus/customerFocus";
import { Subscribe } from "./сomponents/subscribe/subscribe";
import { Footer } from "./сomponents/footer/footer";
import styles from "./app.module.css";

function App() {
  return (
    <>
      <div className={styles.root}>
        <Header />
        <Description />
        <Companies />
        <Sofa />
        <Furniture />
        <FurniturePicker />
        <CustomerFocus />
        <Subscribe />
      </div>
      <Footer />
    </>
  );
}

export default App;
