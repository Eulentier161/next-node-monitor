import styles from './Error.module.scss';

export default function Error() {
    return (
        <div className={styles.error}>
            <h1>Node is not running!</h1>
            <p>or not reachable</p>
        </div>
    );
}
