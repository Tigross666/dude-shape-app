import { Header } from "./сomponents/header/header";
import { Description } from "./сomponents/description/description";
import { Companies } from "./сomponents/companies/companies"
import { Sofa } from "./сomponents/sofa/sofa"
import { Furniture } from "./сomponents/furniture/furniture"
import { ProductCard } from "./сomponents/card/card";
import styles from "./app.module.css";


function App() {
  return (
    <div className={styles.root}>
      <Header />
      <Description />
      <Companies />
      <Sofa />
      <Furniture />
      <ProductCard />
    </div>
  );
}

export default App;
