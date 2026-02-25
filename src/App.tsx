import { Header } from "./сomponents/header/header";
import { Description } from "./сomponents/description/description";
import styles from "./app.module.css";


function App() {
  return (
    <div className={styles.root}>
      <Header />
      <Description />
    </div>
  );
}

export default App;
