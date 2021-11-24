import Link from 'next/link';
import styles from './Footer.module.scss';

interface Props {
    title: string;
    url: string;
    urlText: string;
}

export default function FooterLink({ title, url, urlText }: Props) {
    return (
        <>
            {`${title} `}
            <Link href={url} passHref>
                <a className={styles.link} target='_blank' rel='noopener noreferrer'>
                    {urlText}
                </a>
            </Link>
        </>
    );
}
