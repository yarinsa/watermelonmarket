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
  /** Date custom scalar type */
  Date: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
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
  Closed = 'CLOSED'
}

export enum TimeRange {
  Day = 'DAY',
  FiveDays = 'FIVE_DAYS',
  Month = 'MONTH',
  ThreeMonth = 'THREE_MONTH',
  SixMonth = 'SIX_MONTH',
  Year = 'YEAR',
  TwoYears = 'TWO_YEARS',
  FiveYears = 'FIVE_YEARS',
  TenYears = 'TEN_YEARS',
  Ytd = 'YTD',
  Max = 'MAX'
}

export enum Interval {
  Minute = 'MINUTE',
  TwoMinutes = 'TWO_MINUTES',
  FiveMinutes = 'FIVE_MINUTES',
  FifteenMinutes = 'FIFTEEN_MINUTES',
  ThirtyMinutes = 'THIRTY_MINUTES',
  Hour = 'HOUR',
  FourHours = 'FOUR_HOURS',
  Day = 'DAY',
  Week = 'WEEK',
  Month = 'MONTH',
  Year = 'YEAR'
}

export type PricePoint = {
   __typename?: 'PricePoint';
  time: Scalars['Date'];
  price: Scalars['Float'];
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}


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
      & Pick<PricePoint, 'time' | 'price'>
    )> }
  ) }
);

export type SearchQueryVariables = {
  query: Scalars['ID'];
};


export type SearchQuery = (
  { __typename?: 'Query' }
  & { stock: (
    { __typename?: 'Stock' }
    & Pick<Stock, 'type'>
  ) }
);


export const GetChartDocument = gql`
    query getChart($symbol: ID!, $timeRange: TimeRange!, $interval: Interval!) {
  stock(symbol: $symbol) {
    symbol
    chartData(timeRange: $timeRange, interval: $interval) {
      time
      price
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
    query Search($query: ID!) {
  stock(symbol: $query) {
    type
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