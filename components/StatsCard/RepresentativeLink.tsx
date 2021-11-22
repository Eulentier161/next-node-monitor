import Link from 'next/link';

interface Props {
    address: string;
}

export default function RepresentativeLink({ address }: Props) {
    return (
        <Link href={`https://yellowspyglass.com/account/${address}`} passHref>
            <a target='_blank' rel='noopener noreferrer'>
                {address}
            </a>
        </Link>
    );
}
