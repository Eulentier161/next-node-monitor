import styles from './Footer.module.scss';
import FooterLink from './FooterLink';

export default function Footer() {
    return (
        <div className={styles.wrapper}>
            <hr className={styles.hr} />
            <p>
                <FooterLink title='GitHub' url='https://github.com/Eulentier161/next-node-monitor' urlText='Source' />
                <br className={styles.br} />
                <FooterLink
                    title='stolen from'
                    url='https://github.com/NanoTools/nanoNodeMonitor'
                    urlText='nanoNodeMonitor'
                />
                <br className={styles.br} />
                <FooterLink title='thanks to' url='https://banano.cc/' urlText='Banano' />
                <br className={styles.br} />
                <FooterLink
                    title='donate'
                    url='https://yellowspyglass.com/account/ban_1eu1enkjdd5wgf8sz7tq5xxbo5nqro4k4yz1o4tmk8bs5ejhu9f3yazmreo3'
                    urlText='ban_1eu1en...mreo3'
                />
            </p>
        </div>
    );
}
