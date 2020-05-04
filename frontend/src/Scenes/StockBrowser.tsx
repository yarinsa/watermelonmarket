import React, { useState } from 'react';
import { Search } from '../Components/Search';
import { StockList } from '../Components/StockList/StockList';
import { Switch, Route } from 'react-router-dom';
import { StockRoutes } from '../routes';
import StockPage from '../Components/StockPage';
import styled from 'styled-components/macro';

interface StockBrowserProps {}

export const StockBrowser: React.FC<StockBrowserProps> = ({}) => {
    const [stocks, setStocks] = useState(initialStocks);

    return (
        <Root>
            <StocksSidebar>
                <Search onSearch={(data: any) => setStocks(data)} />
                {stocks && <StockList stocks={stocks} />}
            </StocksSidebar>
            <MainContent>
                <StockPage />
            </MainContent>
        </Root>
    );
};

const Root = styled.div`
    display: flex;
    flex: 1;
`;
const StocksSidebar = styled.section`
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
    { name: 'Apple Inc.', symbol: 'AAPL' },
    { name: 'Microsoft Inc.', symbol: 'MSFT' },
    { name: 'Amazon.com, Inc.', symbol: 'AMZN' },
    {
        name: 'Alphabet Inc. ',
        symbol: 'GOOG',
    },
    { name: 'Tesla, Inc.', symbol: 'TSLA' },
    { name: 'Facebook, Inc.', symbol: 'FB' },
];
