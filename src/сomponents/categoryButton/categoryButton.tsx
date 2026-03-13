import styles from "./CategoryButton.module.css";

export interface CategoryButtonProps {
  image: { url: string; alt: string };
  title: string;
}

export const CategoryButton = ({ image, title }: CategoryButtonProps) => {
  return (
    <button className={styles.categoryButton}>
      <div className={styles.content}>
        <img src={image.url} alt={image.alt} />
        <h3>{title}</h3>
      </div>
    </button>
  );
};
