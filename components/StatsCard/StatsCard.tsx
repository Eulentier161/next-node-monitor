import Row from './Row';
import styles from './StatsCard.module.scss';
import Link from 'next/link';

interface Props {
    header: string;
    items: { name: string; value: string | number }[];
}

export default function StatsCard({ header, items }: Props) {
    return (
        <div>
            <h1 className={styles.header}>
                {/* i need to fix this soon mess soon */}
                {header !== 'Blocks' ? (
                    header
                ) : (
                    <Link href='/blocks' passHref>
                        <a>{header}</a>
                    </Link>
                )}
            </h1>
            <div className={styles.wrapper}>
                {items.map(({ name, value }, i) => (
                    <Row name={name} value={value} key={i} />
                ))}
            </div>
        </div>
    );
}
