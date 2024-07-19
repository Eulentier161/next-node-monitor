import styles from './NodeAccount.module.scss';
import Link from 'next/link';
import { useState } from 'react';
import { VscCheck, VscClippy } from 'react-icons/vsc';

export default function NodeAccount() {
    const [clipboardIcon, setClipboardIcon] = useState(<VscClippy size='1.5em' />);

    function handleCopyToClipboard() {
        navigator.clipboard.writeText(process.env.NEXT_PUBLIC_representativeAccount);
        setClipboardIcon(<VscCheck size='1.5em' />);
        setTimeout(() => setClipboardIcon(<VscClippy size='1.5em' />), 2000);
    }

    return (
        <div>
            <h1 className={styles.header}>Node Account</h1>
            <div className={styles.wrapper}>
                <span>Address</span>
                <Link
                    href={`https://creeper.banano.cc/account/${process.env.NEXT_PUBLIC_representativeAccount}`}
                    passHref>
                    <a target='_blank' rel='noopener noreferrer'>
                        {process.env.NEXT_PUBLIC_representativeAccount}
                    </a>
                </Link>
                <a onClick={() => handleCopyToClipboard()}>{clipboardIcon}</a>
            </div>
        </div>
    );
}
