import React, { useState } from "react";
import "./index.css";
import "./theme/_index.scss";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import styled from "styled-components/macro";
import { Sidebar } from "./Components/Sidebar/Sidebar";
import { Search } from "./Components/Search";
// TODO:
// import { StockList } from "./Components/StockList";
import { StockList } from "./Components/StockList/StockList";
import { StockPage } from "./Components/StockPage/StockPage";

// TODO: move somewhere else
export interface MatchParams {
  symbol?: string;
}

const App: React.FC = () => {
  // TODO: remove initialStock
  const [stocks, setStocks] = useState(initialStocks);

  // TODO: move to inline
  const handleSearch = (data: any) => {
    setStocks(data);
  };

  return (
    <Root>
      <Router>
        {/* TODO: NavSidebar */}
        <Sidebar />
        {/* TODO: Put Switch here */}
        {/* TODO: ListSection => StocksSidebar */}
        <ListSection>
          <Search onSearch={handleSearch} />
          {stocks && <StockList stocks={stocks} />}
        </ListSection>
        <MainContent>
          <Switch>
            {/* TODO: create routes.ts */}
            <Route path={`/symbol/:symbol`} component={StockPage} />
          </Switch>
        </MainContent>
      </Router>
    </Root>
  );
};

export default App;

const Root = styled.main`
  overflow: hidden;
  display: flex;
  align-items: stretch;
  height: 100vh;
`;

const ListSection = styled.section`
  background-color: #f4f7f9;
  width: 300px;
`;

const MainContent = styled.section`
  flex: 1;
  background-color: #ffffff;
  box-shadow: 0 0 16px 0px #dcdcdc;
  overflow-y: scroll;
`;

const initialStocks = [
  { name: "Apple Inc.", symbol: "AAPL" },
  { name: "Microsoft Inc.", symbol: "MSFT" },
  { name: "Amazon.com, Inc.", symbol: "AMZN" },
  {
    name: "Alphabet Inc. ",
    symbol: "GOOG",
  },
  { name: "Tesla, Inc.", symbol: "TSLA" },
  { name: "Facebook, Inc.", symbol: "FB" },
];
