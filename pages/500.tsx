import Error from '@components/Error';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useSWR from 'swr';

/** node is not running or not reachable */
export default function Custom500() {
    const { error } = useSWR<APIResponse, Error>(`/api`, (url: string) =>
        axios.get<APIResponse>(url).then((res) => res.data)
    );
    const router = useRouter();
    useEffect(() => {
        if (!error) {
            router.replace('/');
        }
    }, [error]);

    return <Error />;
}
