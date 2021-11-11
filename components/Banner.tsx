import { banner, representativeAccount } from '@config';
import styles from '@styles/Banner.module.scss';
import Image from 'next/image';

export default function Banner() {
    const monKeyUrl = `https://monkey.banano.cc/api/v1/monkey/${representativeAccount}`;

    return (
        <div className={styles.wrapper}>
            <div>
                <h1>{banner.heading}</h1>
                <p>{banner.paragraph}</p>
            </div>
            <div className={styles.imageContainer}>
                <Image src={monKeyUrl} alt='Banano MonKey' width='150em' height='150em' />
            </div>
        </div>
    );
}
