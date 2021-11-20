import { fetchSystemInfoWithCache } from '@helper/fetchWithCache';
import initMiddleware from '@helper/initMiddleware';
import Cors from 'cors';
import { NextApiRequest, NextApiResponse } from 'next';

const cors = initMiddleware(Cors({ methods: ['GET'] }));

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await cors(req, res);

    const data = await fetchSystemInfoWithCache();

    res.status(200).json(data);
}
