import styles from './index.module.css';

export const Header = () => {
  return (
    <header className={styles.root}>
      <h2 className="header__name">DudeShape</h2>

        <div className="header__links">

            <ul className="header__links_style">
                <li>Home</li>
                <li>About</li>
                <li>Features</li>
                <li>Contact</li>
            </ul>

        </div>
        <div className="header__tools">

            <img src="images/loupe.svg" alt="search"/>
            <img src="images/menu.svg" alt="menu"/>

        </div>
    </header>
  )
};
