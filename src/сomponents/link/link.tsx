import styles from "./link.module.css";

export type LinkProps = {
  href?: string;
  title: string;
  presets?: "dark";
};

export const Link = ({ href = "#", title, presets }: LinkProps) => {
  return (
    <a
      href={href}
      className={`${styles.root} ${presets ? styles[presets] : ""}`}
    >
      {title}
    </a>
  );
};
