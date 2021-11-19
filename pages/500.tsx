import Error from '@components/Error';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useSWR from 'swr';

/** node is not running or not reachable */
export default function Custom500() {
    const { error } = useSWR<APIResponse>(`/api`);
    const router = useRouter();
    useEffect(() => {
        if (!error) {
            router.replace('/');
        }
    }, [error]);

    return <Error />;
}
