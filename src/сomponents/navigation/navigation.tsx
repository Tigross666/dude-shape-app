import { Link, type LinkProps } from "../link/link";
import styles from "./navigation.module.css";

export type NavigationProps = {};

const routes: LinkProps[] = [
  {
    href: "#",
    title: "Home",
  },
  {
    href: "#",
    title: "About",
  },
  {
    href: "#",
    title: "Features",
  },
  {
    href: "#",
    title: "Contact",
  },
];

export const Navigation = ({}: NavigationProps) => {
  return (
    <nav className={styles.links}>
      <ul className={styles.navigation}>
        {routes.map((route) => (
          <li>
            <Link title={route.title} href={route.href} />
          </li>
        ))}
      </ul>
    </nav>
  );
};
