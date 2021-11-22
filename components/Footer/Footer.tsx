import styles from './Footer.module.scss';
import Link from 'next/link';

export default function Footer() {
    return (
        <div className={styles.wrapper}>
            <hr className={styles.hr} />
            <p>
                GitHub{' '}
                <Link href='https://github.com/Eulentier161/next-node-monitor' passHref>
                    <a className={styles.link} target='_blank' rel='noopener noreferrer'>
                        Source
                    </a>
                </Link>
                <br className={styles.br} />
                stolen from{' '}
                <Link href='https://github.com/NanoTools/nanoNodeMonitor' passHref>
                    <a className={styles.link} target='_blank' rel='noopener noreferrer'>
                        nanoNodeMonitor
                    </a>
                </Link>
                <br className={styles.br} />
                thanks to{' '}
                <Link href='https://banano.cc/' passHref>
                    <a className={styles.link} target='_blank' rel='noopener noreferrer'>
                        Banano
                    </a>
                </Link>
                <br className={styles.br} />
                donate{' '}
                <Link
                    href='https://yellowspyglass.com/account/ban_1eu1enkjdd5wgf8sz7tq5xxbo5nqro4k4yz1o4tmk8bs5ejhu9f3yazmreo3'
                    passHref>
                    <a className={styles.link} target='_blank' rel='noopener noreferrer'>
                        ban_1eu1en...mreo3
                    </a>
                </Link>
            </p>
        </div>
    );
}
