import {
  QueryResolvers,
  ResolversTypes,
  ResolversParentTypes,
  QueryStockArgs,
  IResolvers,
  StockResolvers,
  Stock,
  InstrumentType,
  Resolvers,
  Interval,
  TimeRange,
} from "./@generated/types";
import { MyContext } from "./context";
import { GraphQLScalarType, Kind, GraphQLEnumType } from "graphql";
import { timeRangeToTimeStamp } from "./util.service";

const Query: QueryResolvers = {
  stock: async (root, { symbol }, context) => {
    const { stocksApi } = context.dataSources;
    const quote = await stocksApi.getQuote(symbol);
    const quoteSummery = await stocksApi.getQuoteSummery(symbol);
    context.totalCollectedData = { ...quote, ...quoteSummery };
    return {
      symbol: symbol,
      name: quote.shortName,
      type: quote.type,
    };
  },
  searchStock: async (root, { query }, context) => {
    const { searchApi } = context.dataSources;
    if (query.length < 2) return [];
    const result = await searchApi.search(query).then(async (result) => {
      return await result.map((result: Partial<Stock>) => {
        return {
          symbol: result.symbol,
          name: result.name,
        };
      });
    });
    if (result) {
      return result;
    }
    return [];
  },
};

const Stock: StockResolvers = {
  quote: async (parent, args, context, info) => {
    const data = context.totalCollectedData;
    return {
      price: data.regularMarketPrice,
      open: data.regularMarketOpen,
      close: data.regularMarketPreviousClose,
      low: data.regularMarketDayLow,
      high: data.regularMarketDayHigh,
      change: data.regularMarketChange,
      changePercent: data.regularMarketChangePercent,
      volume: data.regularMarketVolume,
      averageVolume: data.averageDailyVolume3Month,
      marketCap: data.enterpriseValue.raw,
      peRatio: data.regularMarketPrice / data.trailingEps.raw,
      dividend: 1.0,
      dividendPercent: 1.0,
    };
  },

  priceHistory: (parent, args, context, info) => {
    const data = context.totalCollectedData;

    return {
      fiftyTwoWeekChange: data.fiftyTwoWeekHighChange,
      fiftyTwoWeekChangePercent: data.fiftyTwoWeekHighChangePercent,
      fiftyTwoWeekHigh: data.fiftyTwoWeekHigh,
      fiftyTwoWeekLow: data.fiftyTwoWeekLow,
    };
  },

  market: (parent, args, context, info) => {
    const data = context.totalCollectedData;
    return {
      marketState: data.marketState,
      exchangeName: data.fullExchangeName,
      region: data.region,
      language: data.language,
      timezone: data.exchangeTimezoneName,
      currency: data.currency,
      gmtOffset: data.gmtOffSetMilliseconds,
    };
  },

  companyProfile: (parent, args, context, info) => {
    const data = context.totalCollectedData;
    return {
      industry: data.industry,
      sector: data.sector,
      address: data.address1,
      phoneNumber: data.phone,
      fullTimeEmployees: data.fullTimeEmployees,
      website: data.website,
      description: data.longBusinessSummary,
    };
  },

  chartData: async (parent, { timeRange, interval }, context, info) => {
    const { stocksApi } = context.dataSources;
    const castedInterval: Interval = (<any>Interval)[interval];
    const castedTimeRange: TimeRange = (<any>TimeRange)[timeRange];
    const time = timeRangeToTimeStamp(castedTimeRange);
    const { symbol } = parent;
    const validSymbol = symbol ? symbol : "";
    if (validSymbol === "") return;
    console.log("CHART ISCMDODMDOD ----------");
    const result = await stocksApi.getChartData(
      validSymbol,
      time.from,
      9999999999,
      castedInterval
    );
    return result.map((chartPoint: any) => ({
      time: chartPoint.date,
      price: chartPoint.close - 500,
    }));
  },
};

const MyDate: GraphQLScalarType = new GraphQLScalarType({
  name: "Date",
  description: "Date custom scalar type",
  parseValue(value) {
    return new Date(value); // value from the client
  },
  serialize(value) {
    return new Date(value); // value sent to the client
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(+ast.value); // ast value is always in string format
    }
    return null;
  },
});

export const resolvers: IResolvers = {
  Query,
  Stock,
  MyDate,
};
