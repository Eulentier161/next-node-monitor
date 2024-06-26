import styles from './Header.module.scss';
import dynamic from 'next/dynamic';
import Link from 'next/link';
// import { GoMarkGithub } from 'react-icons/go';
import { VscGithubInverted } from 'react-icons/vsc';
const ThemeToggle = dynamic(() => import('../ThemeToggle/ThemeToggle'), { ssr: false });

export default function Header() {
    return (
        <div className={styles.wrapper}>
            <div>
                <Link href='/' passHref>
                    <a>
                        <h1>Bananode Monitor</h1>
                    </a>
                </Link>
            </div>
            <div className={styles.right}>
                <a>
                    <ThemeToggle />
                </a>
                <Link href='https://github.com/Eulentier161/next-node-monitor' passHref>
                    <a target='_blank' rel='noopener noreferrer'>
                        <VscGithubInverted size='2em' />
                    </a>
                </Link>
            </div>
        </div>
    );
}
