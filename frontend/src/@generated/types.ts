import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  MyDate: any;
};

export type Query = {
   __typename?: 'Query';
  stock: Stock;
  searchStock: Array<Stock>;
};


export type QueryStockArgs = {
  symbol: Scalars['ID'];
};


export type QuerySearchStockArgs = {
  query: Scalars['String'];
};


export enum InstrumentType {
  Equity = 'EQUITY',
  Etf = 'ETF',
  Forex = 'FOREX'
}

export type Stock = {
   __typename?: 'Stock';
  symbol: Scalars['ID'];
  name: Scalars['String'];
  type: InstrumentType;
  quote: Quote;
  priceHistory: PriceHistory;
  companyProfile: CompanyProfile;
  market: Market;
  chartData: Array<PricePoint>;
};


export type StockChartDataArgs = {
  timeRange: TimeRange;
  interval: Interval;
};

export type Quote = {
   __typename?: 'Quote';
  price: Scalars['Float'];
  open: Scalars['Float'];
  close: Scalars['Float'];
  low: Scalars['Float'];
  high: Scalars['Float'];
  change: Scalars['Float'];
  changePercent: Scalars['Float'];
  volume: Scalars['Int'];
  averageVolume: Scalars['Int'];
  marketCap: Scalars['Int'];
  peRatio?: Maybe<Scalars['Float']>;
  dividend: Scalars['Float'];
  dividendPercent: Scalars['Float'];
};

export type PriceHistory = {
   __typename?: 'PriceHistory';
  fiftyTwoWeekLow: Scalars['Float'];
  fiftyTwoWeekHigh: Scalars['Float'];
  fiftyTwoWeekChange: Scalars['Float'];
  fiftyTwoWeekChangePercent: Scalars['Float'];
};

export type CompanyProfile = {
   __typename?: 'CompanyProfile';
  address: Scalars['String'];
  phoneNumber: Scalars['String'];
  website: Scalars['String'];
  sector: Scalars['String'];
  industry: Scalars['String'];
  fullTimeEmployees: Scalars['Int'];
  description: Scalars['String'];
};

export type Market = {
   __typename?: 'Market';
  exchangeName: Scalars['ID'];
  region: Scalars['String'];
  language: Scalars['String'];
  timezone: Scalars['String'];
  currency: Scalars['String'];
  marketState: MarketState;
  gmtOffset: Scalars['Int'];
};

export enum MarketState {
  Pre = 'PRE',
  Regular = 'REGULAR',
  Post = 'POST',
  Postpost = 'POSTPOST',
  Prepre = 'PREPRE',
  Closed = 'CLOSED'
}

export enum TimeRange {
  Day = 'DAY',
  FiveDays = 'FIVE_DAYS',
  Month = 'MONTH',
  ThreeMonth = 'THREE_MONTH',
  SixMonth = 'SIX_MONTH',
  Year = 'YEAR',
  FiveYears = 'FIVE_YEARS',
  Ytd = 'YTD',
  Max = 'MAX'
}

export enum Interval {
  FiveMinutes = 'FIVE_MINUTES',
  FifteenMinutes = 'FIFTEEN_MINUTES',
  ThirtyMinutes = 'THIRTY_MINUTES',
  Hour = 'HOUR',
  Day = 'DAY',
  Week = 'WEEK',
  Month = 'MONTH',
  ThreeMonth = 'THREE_MONTH'
}

export type PricePoint = {
   __typename?: 'PricePoint';
  time: Scalars['MyDate'];
  open: Scalars['Float'];
  high: Scalars['Float'];
  low: Scalars['Float'];
  close: Scalars['Float'];
  volume: Scalars['Float'];
};

export type GetChartQueryVariables = {
  symbol: Scalars['ID'];
  timeRange: TimeRange;
  interval: Interval;
};


export type GetChartQuery = (
  { __typename?: 'Query' }
  & { stock: (
    { __typename?: 'Stock' }
    & Pick<Stock, 'symbol'>
    & { chartData: Array<(
      { __typename?: 'PricePoint' }
      & Pick<PricePoint, 'time' | 'close' | 'open' | 'high' | 'low' | 'volume'>
    )>, market: (
      { __typename?: 'Market' }
      & Pick<Market, 'currency'>
    ) }
  ) }
);

export type SearchQueryVariables = {
  query: Scalars['String'];
};


export type SearchQuery = (
  { __typename?: 'Query' }
  & { searchStock: Array<(
    { __typename?: 'Stock' }
    & Pick<Stock, 'name' | 'symbol'>
  )> }
);

export type StockInfoQueryVariables = {
  symbol: Scalars['ID'];
  timeRange: TimeRange;
  interval: Interval;
};


export type StockInfoQuery = (
  { __typename?: 'Query' }
  & { stock: (
    { __typename?: 'Stock' }
    & { quote: (
      { __typename?: 'Quote' }
      & Pick<Quote, 'price' | 'change'>
    ), chartData: Array<(
      { __typename?: 'PricePoint' }
      & Pick<PricePoint, 'time' | 'close' | 'open' | 'high' | 'low' | 'volume'>
    )>, market: (
      { __typename?: 'Market' }
      & Pick<Market, 'currency'>
    ) }
  ) }
);

export type StockInfoForPageQueryVariables = {
  symbol: Scalars['ID'];
};


export type StockInfoForPageQuery = (
  { __typename?: 'Query' }
  & { stock: (
    { __typename?: 'Stock' }
    & Pick<Stock, 'name' | 'symbol'>
    & { quote: (
      { __typename?: 'Quote' }
      & Pick<Quote, 'price' | 'open' | 'high' | 'low' | 'change' | 'changePercent' | 'volume' | 'averageVolume'>
    ), companyProfile: (
      { __typename?: 'CompanyProfile' }
      & Pick<CompanyProfile, 'description' | 'address' | 'phoneNumber' | 'website' | 'sector' | 'industry' | 'fullTimeEmployees'>
    ), priceHistory: (
      { __typename?: 'PriceHistory' }
      & Pick<PriceHistory, 'fiftyTwoWeekLow' | 'fiftyTwoWeekHigh'>
    ), market: (
      { __typename?: 'Market' }
      & Pick<Market, 'marketState' | 'exchangeName' | 'currency' | 'language' | 'gmtOffset' | 'timezone' | 'region'>
    ), chartData: Array<(
      { __typename?: 'PricePoint' }
      & Pick<PricePoint, 'time' | 'close' | 'open' | 'high' | 'low' | 'volume'>
    )> }
  ) }
);


export const GetChartDocument = gql`
    query getChart($symbol: ID!, $timeRange: TimeRange!, $interval: Interval!) {
  stock(symbol: $symbol) {
    symbol
    chartData(timeRange: $timeRange, interval: $interval) {
      time
      close
      open
      high
      low
      volume
    }
    market {
      currency
    }
  }
}
    `;

/**
 * __useGetChartQuery__
 *
 * To run a query within a React component, call `useGetChartQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetChartQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetChartQuery({
 *   variables: {
 *      symbol: // value for 'symbol'
 *      timeRange: // value for 'timeRange'
 *      interval: // value for 'interval'
 *   },
 * });
 */
export function useGetChartQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetChartQuery, GetChartQueryVariables>) {
        return ApolloReactHooks.useQuery<GetChartQuery, GetChartQueryVariables>(GetChartDocument, baseOptions);
      }
export function useGetChartLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetChartQuery, GetChartQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetChartQuery, GetChartQueryVariables>(GetChartDocument, baseOptions);
        }
export type GetChartQueryHookResult = ReturnType<typeof useGetChartQuery>;
export type GetChartLazyQueryHookResult = ReturnType<typeof useGetChartLazyQuery>;
export type GetChartQueryResult = ApolloReactCommon.QueryResult<GetChartQuery, GetChartQueryVariables>;
export const SearchDocument = gql`
    query Search($query: String!) {
  searchStock(query: $query) {
    name
    symbol
  }
}
    `;

/**
 * __useSearchQuery__
 *
 * To run a query within a React component, call `useSearchQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchQuery({
 *   variables: {
 *      query: // value for 'query'
 *   },
 * });
 */
export function useSearchQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<SearchQuery, SearchQueryVariables>) {
        return ApolloReactHooks.useQuery<SearchQuery, SearchQueryVariables>(SearchDocument, baseOptions);
      }
export function useSearchLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SearchQuery, SearchQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<SearchQuery, SearchQueryVariables>(SearchDocument, baseOptions);
        }
export type SearchQueryHookResult = ReturnType<typeof useSearchQuery>;
export type SearchLazyQueryHookResult = ReturnType<typeof useSearchLazyQuery>;
export type SearchQueryResult = ApolloReactCommon.QueryResult<SearchQuery, SearchQueryVariables>;
export const StockInfoDocument = gql`
    query StockInfo($symbol: ID!, $timeRange: TimeRange!, $interval: Interval!) {
  stock(symbol: $symbol) {
    quote {
      price
      change
    }
    chartData(timeRange: $timeRange, interval: $interval) {
      time
      close
      time
      close
      open
      high
      low
      volume
    }
    market {
      currency
    }
  }
}
    `;

/**
 * __useStockInfoQuery__
 *
 * To run a query within a React component, call `useStockInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useStockInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStockInfoQuery({
 *   variables: {
 *      symbol: // value for 'symbol'
 *      timeRange: // value for 'timeRange'
 *      interval: // value for 'interval'
 *   },
 * });
 */
export function useStockInfoQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<StockInfoQuery, StockInfoQueryVariables>) {
        return ApolloReactHooks.useQuery<StockInfoQuery, StockInfoQueryVariables>(StockInfoDocument, baseOptions);
      }
export function useStockInfoLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<StockInfoQuery, StockInfoQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<StockInfoQuery, StockInfoQueryVariables>(StockInfoDocument, baseOptions);
        }
export type StockInfoQueryHookResult = ReturnType<typeof useStockInfoQuery>;
export type StockInfoLazyQueryHookResult = ReturnType<typeof useStockInfoLazyQuery>;
export type StockInfoQueryResult = ApolloReactCommon.QueryResult<StockInfoQuery, StockInfoQueryVariables>;
export const StockInfoForPageDocument = gql`
    query StockInfoForPage($symbol: ID!) {
  stock(symbol: $symbol) {
    name
    symbol
    quote {
      price
      open
      high
      low
      change
      changePercent
      volume
      averageVolume
    }
    companyProfile {
      description
      address
      phoneNumber
      website
      sector
      industry
      sector
      fullTimeEmployees
    }
    priceHistory {
      fiftyTwoWeekLow
      fiftyTwoWeekHigh
    }
    market {
      marketState
      exchangeName
      currency
      language
      gmtOffset
      timezone
      region
    }
    chartData(timeRange: YEAR, interval: DAY) {
      time
      close
      open
      high
      low
      volume
    }
  }
}
    `;

/**
 * __useStockInfoForPageQuery__
 *
 * To run a query within a React component, call `useStockInfoForPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useStockInfoForPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStockInfoForPageQuery({
 *   variables: {
 *      symbol: // value for 'symbol'
 *   },
 * });
 */
export function useStockInfoForPageQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<StockInfoForPageQuery, StockInfoForPageQueryVariables>) {
        return ApolloReactHooks.useQuery<StockInfoForPageQuery, StockInfoForPageQueryVariables>(StockInfoForPageDocument, baseOptions);
      }
export function useStockInfoForPageLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<StockInfoForPageQuery, StockInfoForPageQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<StockInfoForPageQuery, StockInfoForPageQueryVariables>(StockInfoForPageDocument, baseOptions);
        }
export type StockInfoForPageQueryHookResult = ReturnType<typeof useStockInfoForPageQuery>;
export type StockInfoForPageLazyQueryHookResult = ReturnType<typeof useStockInfoForPageLazyQuery>;
export type StockInfoForPageQueryResult = ApolloReactCommon.QueryResult<StockInfoForPageQuery, StockInfoForPageQueryVariables>;