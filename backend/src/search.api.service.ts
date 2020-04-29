import { Stock, Interval } from "./@generated/types";
import { RESTDataSource } from "apollo-datasource-rest";

export class SearchApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://www.alphavantage.co/";
  }
  API_KEY = "RXVQ30PJTRMXC0TJ";

  async search(query: string) {
    const result = await this.get(
      `query?function=SYMBOL_SEARCH&keywords=${query}&apikey=${this.API_KEY}`
    );
    return result["bestMatches"].map((stock: resultItem) => {
      return {
        symbol: stock["1. symbol"],
        name: stock["2. name"],
        type: stock["3. type"],
      };
    });
  }
}

interface resultItem {
  [key: string]: string;
}
