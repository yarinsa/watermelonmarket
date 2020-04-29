import { MyContext } from '../context';
import { Interval } from '../enums';
import { InstrumentType } from '../enums';
import { MarketState } from '../enums';
import { TimeRange } from '../enums';
import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };


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


export { InstrumentType };

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

export { MarketState };

export { TimeRange };

export { Interval };

export type PricePoint = {
   __typename?: 'PricePoint';
  time: Scalars['MyDate'];
  price: Scalars['Float'];
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type isTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  String: ResolverTypeWrapper<Partial<Scalars['String']>>,
  Boolean: ResolverTypeWrapper<Partial<Scalars['Boolean']>>,
  Query: ResolverTypeWrapper<{}>,
  ID: ResolverTypeWrapper<Partial<Scalars['ID']>>,
  MyDate: ResolverTypeWrapper<Partial<Scalars['MyDate']>>,
  InstrumentType: ResolverTypeWrapper<Partial<InstrumentType>>,
  Stock: ResolverTypeWrapper<Partial<Stock>>,
  Quote: ResolverTypeWrapper<Partial<Quote>>,
  Float: ResolverTypeWrapper<Partial<Scalars['Float']>>,
  Int: ResolverTypeWrapper<Partial<Scalars['Int']>>,
  PriceHistory: ResolverTypeWrapper<Partial<PriceHistory>>,
  CompanyProfile: ResolverTypeWrapper<Partial<CompanyProfile>>,
  Market: ResolverTypeWrapper<Partial<Market>>,
  MarketState: ResolverTypeWrapper<Partial<MarketState>>,
  TimeRange: ResolverTypeWrapper<Partial<TimeRange>>,
  Interval: ResolverTypeWrapper<Partial<Interval>>,
  PricePoint: ResolverTypeWrapper<Partial<PricePoint>>,
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  String: Partial<Scalars['String']>,
  Boolean: Partial<Scalars['Boolean']>,
  Query: {},
  ID: Partial<Scalars['ID']>,
  MyDate: Partial<Scalars['MyDate']>,
  InstrumentType: Partial<InstrumentType>,
  Stock: Partial<Stock>,
  Quote: Partial<Quote>,
  Float: Partial<Scalars['Float']>,
  Int: Partial<Scalars['Int']>,
  PriceHistory: Partial<PriceHistory>,
  CompanyProfile: Partial<CompanyProfile>,
  Market: Partial<Market>,
  MarketState: Partial<MarketState>,
  TimeRange: Partial<TimeRange>,
  Interval: Partial<Interval>,
  PricePoint: Partial<PricePoint>,
}>;

export type QueryResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  stock?: Resolver<ResolversTypes['Stock'], ParentType, ContextType, RequireFields<QueryStockArgs, 'symbol'>>,
  searchStock?: Resolver<Array<ResolversTypes['Stock']>, ParentType, ContextType, RequireFields<QuerySearchStockArgs, 'query'>>,
}>;

export interface MyDateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['MyDate'], any> {
  name: 'MyDate'
}

export type StockResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Stock'] = ResolversParentTypes['Stock']> = ResolversObject<{
  symbol?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  type?: Resolver<ResolversTypes['InstrumentType'], ParentType, ContextType>,
  quote?: Resolver<ResolversTypes['Quote'], ParentType, ContextType>,
  priceHistory?: Resolver<ResolversTypes['PriceHistory'], ParentType, ContextType>,
  companyProfile?: Resolver<ResolversTypes['CompanyProfile'], ParentType, ContextType>,
  market?: Resolver<ResolversTypes['Market'], ParentType, ContextType>,
  chartData?: Resolver<Array<ResolversTypes['PricePoint']>, ParentType, ContextType, RequireFields<StockChartDataArgs, 'timeRange' | 'interval'>>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type QuoteResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Quote'] = ResolversParentTypes['Quote']> = ResolversObject<{
  price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>,
  open?: Resolver<ResolversTypes['Float'], ParentType, ContextType>,
  close?: Resolver<ResolversTypes['Float'], ParentType, ContextType>,
  low?: Resolver<ResolversTypes['Float'], ParentType, ContextType>,
  high?: Resolver<ResolversTypes['Float'], ParentType, ContextType>,
  change?: Resolver<ResolversTypes['Float'], ParentType, ContextType>,
  changePercent?: Resolver<ResolversTypes['Float'], ParentType, ContextType>,
  volume?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  averageVolume?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  marketCap?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  peRatio?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>,
  dividend?: Resolver<ResolversTypes['Float'], ParentType, ContextType>,
  dividendPercent?: Resolver<ResolversTypes['Float'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type PriceHistoryResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['PriceHistory'] = ResolversParentTypes['PriceHistory']> = ResolversObject<{
  fiftyTwoWeekLow?: Resolver<ResolversTypes['Float'], ParentType, ContextType>,
  fiftyTwoWeekHigh?: Resolver<ResolversTypes['Float'], ParentType, ContextType>,
  fiftyTwoWeekChange?: Resolver<ResolversTypes['Float'], ParentType, ContextType>,
  fiftyTwoWeekChangePercent?: Resolver<ResolversTypes['Float'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type CompanyProfileResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['CompanyProfile'] = ResolversParentTypes['CompanyProfile']> = ResolversObject<{
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  phoneNumber?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  website?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  sector?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  industry?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  fullTimeEmployees?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type MarketResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Market'] = ResolversParentTypes['Market']> = ResolversObject<{
  exchangeName?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  region?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  language?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  timezone?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  currency?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  marketState?: Resolver<ResolversTypes['MarketState'], ParentType, ContextType>,
  gmtOffset?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type PricePointResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['PricePoint'] = ResolversParentTypes['PricePoint']> = ResolversObject<{
  time?: Resolver<ResolversTypes['MyDate'], ParentType, ContextType>,
  price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type Resolvers<ContextType = MyContext> = ResolversObject<{
  Query?: QueryResolvers<ContextType>,
  MyDate?: GraphQLScalarType,
  Stock?: StockResolvers<ContextType>,
  Quote?: QuoteResolvers<ContextType>,
  PriceHistory?: PriceHistoryResolvers<ContextType>,
  CompanyProfile?: CompanyProfileResolvers<ContextType>,
  Market?: MarketResolvers<ContextType>,
  PricePoint?: PricePointResolvers<ContextType>,
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = MyContext> = Resolvers<ContextType>;
