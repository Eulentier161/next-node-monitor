import styles from './Banner.module.scss';
import QRCode from 'qrcode.react';
import Image from 'next/image';
import { useState } from 'react';

export default function Banner() {
    const [qrToggle, setQrToggle] = useState(0);
    return (
        <div className={styles.wrapper}>
            <div>
                <h1>{process.env.NEXT_PUBLIC_bannerHeading}</h1>
                <p>{process.env.NEXT_PUBLIC_bannerParagraph}</p>
            </div>
            <div className={styles.imageContainer}>
                {qrToggle ? (
                    <QRCode onClick={() => setQrToggle(0)} value={process.env.NEXT_PUBLIC_representativeAccount} />
                ) : (
                    <Image
                        onClick={() => setQrToggle(1)}
                        src='/monkey.svg'
                        alt='Banano MonKey'
                        width='150em'
                        height='150em'
                    />
                )}
            </div>
        </div>
    );
}
