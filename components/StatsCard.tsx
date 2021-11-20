import styles from '@styles/StatsCard.module.scss';
import Link from 'next/link';

interface Props {
    header: string;
    items: { name: string; value: string | number }[];
}

export default function StatsCard({ header, items }: Props) {
    return (
        <div>
            <h1 className={styles.header}>{header}</h1>
            <div className={styles.wrapper}>
                {items.map(({ name, value }, i) => (
                    <div className={styles.stats} key={i}>
                        <span>{name}</span>
                        {name === 'Representative' && value !== 'loading...' && value ? (
                            <Link href={`https://yellowspyglass.com/account/${value}`} passHref>
                                <a target='_blank' rel='noopener noreferrer'>
                                    {value}
                                </a>
                            </Link>
                        ) : (
                            <span>{value}</span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
