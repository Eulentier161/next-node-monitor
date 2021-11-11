import { representativeAccount } from '@config';
import styles from '@styles/NodeAccount.module.scss';
import Link from 'next/link';
import { useState } from 'react';
import { GoCheck, GoClippy } from 'react-icons/go';

export default function NodeAccount({ header, item }: { header: string; item: Stat }) {
    const [clipboardIcon, setClipboardIcon] = useState(<GoClippy size='1.5em' />);

    function handleCopyToClipboard() {
        navigator.clipboard.writeText(representativeAccount);
        setClipboardIcon(<GoCheck size='1.5em' />);
        setTimeout(() => setClipboardIcon(<GoClippy size='1.5em' />), 2000);
    }

    return (
        <div>
            <h1 className={styles.header}>{header}</h1>
            <div className={styles.wrapper}>
                <span>{item.name}</span>
                <Link href={`https://yellowspyglass.com/account/${representativeAccount}`} passHref>
                    <a>{item.value}</a>
                </Link>
                <a onClick={() => handleCopyToClipboard()}>{clipboardIcon}</a>
            </div>
        </div>
    );
}
