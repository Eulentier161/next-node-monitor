import styles from '@styles/Header.module.scss';
import Link from 'next/link';
import { GoMarkGithub } from 'react-icons/go';

export default function Header() {
    return (
        <div className={styles.wrapper}>
            <div>
                <h1>Bananode Monitor</h1>
            </div>
            <div className={styles.right}>
                <Link href='https://github.com/Eulentier161/next-node-monitor' passHref>
                    <a>
                        <GoMarkGithub size='2em' />
                    </a>
                </Link>
            </div>
        </div>
    );
}
