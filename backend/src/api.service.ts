import { Stock, Interval } from "./@generated/types";
import { RESTDataSource } from "apollo-datasource-rest";

export class StocksApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://query1.finance.yahoo.com/";
  }

  async getQuote(symbol: Stock["symbol"]) {
    const result = await this.get(`v7/finance/quote?symbols=${symbol}`);
    // console.log("ou got here"
    // );
    // console.log(result["quoteResponse"].result);
    return result["quoteResponse"].result[0];
  }
  async getQuoteSummery(symbol: Stock["symbol"]) {
    return await this.get(
      `v10/finance/quoteSummary/${symbol}?modules=assetProfile,recommendationTrend,cashflowStatementHistory,indexTrend,defaultKeyStatistics,industryTrend,incomeStatementHistory,fundOwnership,insiderHolders,calendarEvents,upgradeDowngradeHistory,balanceSheetHistory,earningsTrend,secFilings,institutionOwnership,majorHoldersBreakdown,balanceSheetHistoryQuarterly,earningsHistory,majorDirectHolders,netSharePurchaseActivity,insiderTransactions,sectorTrend,incomeStatementHistoryQuarterly,cashflowStatementHistoryQuarterly,earnings,financialData`
    )
      .then((result) => {
        return result["quoteSummary"].result[0];
      })
      .then((result) => {
        const totalData = {};
        Object.entries(result).forEach(([key, value]) => {
          Object.assign(totalData, value);
        });
        return totalData;
      });
  }

  //   PARAMS: &period1=0

  // the 0 values for period1 gets us the oldest data available
  // PARAMS: &period2=9999999999

  // The 9999999999 value for period2 gets us the latest data
  // as long as it is bigger than the current unix timestamp
  // PARAMS: &interval=3mo

  // interval=1m for about the past 4-5 days
  // interval=5m for the past 80(ish) days.
  // PARAMS: &includePrePost=true

  // Add pre & post market prices
  // PARAMS: &events=div,split

  // Add dividends & splits
  // ****** PARAMS ******** //
  // from - start date od the data formatted as timestamp
  // ****  represented in yahoo API as "period1"
  // ****  value 0 will return the oldest data available
  // to -  end date of the data formatted as timestamp
  // ****  represented in yahoo API as "period2"
  // ****  value 9999999999 will return the latest data available
  // interval -  what time intervals should the data be requested

  async getChartData(
    symbol: Stock["symbol"],
    from: number,
    to: number,
    interval: string
  ) {
    return await this.get(
      `/v8/finance/chart/?symbol=${symbol}&period1=${from}&period2=${to}&interval=${interval}`
    ).then((result) => {
      console.log(result);
      return this._extractChartData(result);
    });
  }

  _extractChartData(fetchedData: any): any {
    let result = fetchedData.chart.result[0];
    let ohlcv = result.indicators.quote[0];
    return result.timestamp.map((timestamp: number, index: number) => {
      return {
        date: timestamp,
        open: +ohlcv.open[index],
        high: +ohlcv.high[index],
        low: +ohlcv.low[index],
        close: +ohlcv.close[index],
        volume: +ohlcv.volume[index],
      };
    });
  }
}
// example_price_data = "https://query1.finance.yahoo.com/v8/finance/chart/MSFT?symbol=MSFT&period1=0&period2=9999999999&interval=1d&includePrePost=true&events=div%2Csplit"
