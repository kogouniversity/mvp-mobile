import { rest } from 'msw';
import { mswApiUrl, sleep } from '../../../utils';
import allGroupsData from './all_groups.json';
import filtertedGroupsData from './filtered_groups.json';
import emptyGroupsData from './empty_groups.json';

export const handlers = [
    // Get all groups
    rest.get(mswApiUrl('/api/groups?populate=icon'), async (req, res, ctx) => {
        await sleep(200);
        const userId = req.url.searchParams.get('filters[users]');
        if (userId === '3') {
            return res(ctx.status(200), ctx.json(filtertedGroupsData));
        } else if (userId) {
            return res(ctx.status(200), ctx.json(emptyGroupsData));
        }
        return res(ctx.status(200), ctx.json(allGroupsData));
    }),
];
