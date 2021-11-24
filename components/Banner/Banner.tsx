import styles from './Banner.module.scss';
import Image from 'next/image';

export default function Banner() {
    return (
        <div className={styles.wrapper}>
            <div>
                <h1>{process.env.NEXT_PUBLIC_bannerHeading}</h1>
                <p>{process.env.NEXT_PUBLIC_bannerParagraph}</p>
            </div>
            <div className={styles.imageContainer}>
                <Image src='/monkey.svg' alt='Banano MonKey' width='150em' height='150em' />
            </div>
        </div>
    );
}
