export enum Interval {
  MINUTE = "1m",
  TWO_MINUTES = "2m",
  FIVE_MINUTES = "5m",
  FIFTEEN_MINUTES = "15m",
  THIRTY_MINUTES = "30m",
  HOUR = "1h",
  FOUR_HOURS = "5h",
  DAY = "1d",
  WEEK = "1wk",
  MONTH = "1mo",
  THREE_MONTH = "3mo",
}

export enum InstrumentType {
  EQUITY,
  ETF,
  FOREX,
}

export enum MarketState {
  PRE,
  PREPRE,
  REGULAR,
  POST,
  POSTPOST,
  CLOSED,
}

//Convert timeRange to number of days in order to calculate return value
export enum TimeRange {
  DAY = 1,
  FIVE_DAYS = 5,
  MONTH = 30,
  THREE_MONTH = 90,
  SIX_MONTH = 180,
  YEAR = 365,
  TWO_YEARS = 730,
  FIVE_YEARS = 1825,
  TEN_YEARS = 3650,
  YTD = "YTD",
  MAX = "MAX",
}
