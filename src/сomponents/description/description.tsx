import { Button } from "../button/button";
import styles from './description.module.css';
import chairImage from '../../assets/chair.png'


export const Description = () => {
  return (
    <div className={styles.description}>
        <img className={styles.chair} src={chairImage} alt="chair" />
        <div className={styles.text}>
            <h1>
                We Help You Make Modern Furniture
            </h1>
            <p className={styles.paragraph}>
                All of our furniture uses the best materials and 
                choices for our customers.All of our furniture uses 
                the best materials
            </p>
            <Button name="Explore more" size="medium" presets="light"/>
        </div>
    </div>
  )
};
