import { banner } from '@config';
import styles from '@styles/Banner.module.scss';
import Image from 'next/image';
import monkey from '@public/monkey.svg';

export default function Banner() {
    return (
        <div className={styles.wrapper}>
            <div>
                <h1>{banner.heading}</h1>
                <p>{banner.paragraph}</p>
            </div>
            <div className={styles.imageContainer}>
                <Image src={monkey} alt='Banano MonKey' width='150em' height='150em' />
            </div>
        </div>
    );
}
