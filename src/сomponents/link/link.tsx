import styles from "./link.module.css";

export type LinkProps = {
  href?: string;
  title: string;
};

export const Link = ({ href = "#", title }: LinkProps) => {
  return (
    <a href={href} className={styles.root}>
      {title}
    </a>
  );
};
