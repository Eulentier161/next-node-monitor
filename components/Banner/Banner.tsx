import styles from './Banner.module.scss';
import Image from 'next/image';

const bannerHeading = process.env.bannerHeading;
const bannerParagraph = process.env.bannerParagraph;
export default function Banner() {
    return (
        <div className={styles.wrapper}>
            <div>
                <h1>{bannerHeading}</h1>
                <p>{bannerParagraph}</p>
            </div>
            <div className={styles.imageContainer}>
                <Image src='/monkey.svg' alt='Banano MonKey' width='150em' height='150em' />
            </div>
        </div>
    );
}
