import Row from './Row';
import styles from './StatsCard.module.scss';

interface StatsCardProps {
    header: string;
    items: { name: string; value: string | number }[];
}

export default function StatsCard({ header, items }: StatsCardProps) {
    return (
        <div>
            <h1 className={styles.header}>{header}</h1>
            <div className={styles.wrapper}>
                {items.map(({ name, value }, i) => (
                    <Row name={name} value={value} key={i} />
                ))}
            </div>
        </div>
    );
}
