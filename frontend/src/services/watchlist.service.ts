import { Watchlist } from '../@generated/types';

export const WatchlistService = {};

const KEY = 'watchlists';
let watchlists: Watchlist[] = [];

const query = (): Watchlist[] => {
    const localWatchlist = localStorage.getItem(KEY);
    if (localWatchlist) {
        watchlists = JSON.parse(localWatchlist);
        return watchlists;
    } else {
        return [];
    }
};

const defaultWatchlists: Watchlist[] = [
    {
        id: '1',
        name: 'My Watchlist',
        stocks: [
            {
                symbol: 'TSLA',
                name: 'Tesla Inc.',
                lots: [
                    {
                        costPerShare: 25.43,
                        note: '',
                        shares: 10,
                        tradeDate: Date.now(),
                    },
                ],
            },
        ],
    },
];
