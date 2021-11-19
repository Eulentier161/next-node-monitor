import styles from '@styles/ThemeToggle.module.scss';
import { useEffect, useState } from 'react';
import { BsFillMoonStarsFill, BsSunFill } from 'react-icons/bs';

export default function ThemeToggle() {
    const [activeTheme, setActiveTheme] = useState(document.getElementsByTagName('html')[0].getAttribute('data-theme'));
    const inactiveTheme = activeTheme === 'light' ? 'dark' : 'light';
    const buttonIcon = activeTheme === 'light' ? <BsFillMoonStarsFill size='2em' /> : <BsSunFill size='2em' />;

    useEffect(() => {
        if (activeTheme) {
            document.getElementsByTagName('html')[0].setAttribute('data-theme', activeTheme);
            window.localStorage.setItem('theme', activeTheme);
        }
    }, [activeTheme]);

    return (
        <button className={styles.btn} onClick={() => setActiveTheme(inactiveTheme)}>
            {buttonIcon}
        </button>
    );
}
