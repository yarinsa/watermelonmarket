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
  price: Scalars['Float'];
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
      & Pick<PricePoint, 'time' | 'price'>
    )> }
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