import styles from '@styles/StatsCard.module.scss';
import Link from 'next/link';

interface RepresentativeLinkProps {
    address: string;
}
interface RowProps {
    name: string;
    value: string | number;
}
interface StatsCardProps {
    header: string;
    items: { name: string; value: string | number }[];
}

function RepresentativeLink({ address }: RepresentativeLinkProps) {
    return (
        <Link href={`https://yellowspyglass.com/account/${address}`} passHref>
            <a target='_blank' rel='noopener noreferrer'>
                {address}
            </a>
        </Link>
    );
}

function Row({ name, value }: RowProps) {
    if (name === 'Representative' && value !== 'loading...' && typeof value === 'string') {
        return (
            <div className={styles.stats}>
                <span>{name}</span>
                <RepresentativeLink address={value} />
            </div>
        );
    }
    return (
        <div className={styles.stats}>
            <span>{name}</span>
            <span>{value}</span>
        </div>
    );
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
