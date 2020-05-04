export interface MatchParams {
    symbol?: string;
}

export const StockRoutes = {
    main: `/stocks/:symbol?`,
    drawerTab: '/stocks/:symbol/:tabId',
};
