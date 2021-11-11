import styles from '@styles/StatsCard.module.scss';
import Link from 'next/link';

export default function StatsCard({ header, items }: { header: string; items: Stat[] }) {
    return (
        <div>
            <h1 className={styles.header}>{header}</h1>
            <div className={styles.wrapper}>
                {items.map((item, i) => (
                    <div className={styles.stats} key={i}>
                        <span>{item.name}</span>
                        {item.name === 'Representative' && item.value ? (
                            <Link href={`https://yellowspyglass.com/account/${item.value}`} passHref>
                                <a>{item.value}</a>
                            </Link>
                        ) : (
                            <span>{item.value}</span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
