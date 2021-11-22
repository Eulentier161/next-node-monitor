import RepresentativeLink from './RepresentativeLink';
import styles from './StatsCard.module.scss';

interface Props {
    name: string;
    value: string | number;
}

export default function Row({ name, value }: Props) {
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
