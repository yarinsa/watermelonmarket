import { StocksApi } from "./api.service";
import { SearchApi } from "./search.api.service";

export interface MyContext {
  dataSources: dataSources;
  totalCollectedData: any;
}

interface dataSources {
  stocksApi: StocksApi;
  searchApi: SearchApi;
}
