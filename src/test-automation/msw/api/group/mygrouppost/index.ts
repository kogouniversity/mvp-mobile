import { rest } from 'msw';
import { mswApiUrl, sleep } from '../../../utils';
import grouppostdata from './groupposts.json';

export const handlers = [
    rest.get(mswApiUrl('/api/posts/groups'), async (req, res, ctx) => {
        await sleep(200);
        const userId = req.url.searchParams.get('filters[users]');
        if (userId) {
            return res(ctx.status(200), ctx.json(grouppostdata));
        }
        return res(ctx.status(200), ctx.json(grouppostdata));
    }),
];
