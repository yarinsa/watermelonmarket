export interface MatchParams {
    symbol?: string;
    tabId?: string;
}

export const StockRoutes = {
    main: `/stocks/:symbol?/:tabId?`,
    drawerTab: '/stocks/:symbol/:tabId',
};
