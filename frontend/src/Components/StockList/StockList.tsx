import React from 'react';
import styled from 'styled-components/macro';
import { StockListItem } from './StockListItem';
import { Stock } from '../../@generated/types';
import { useParams, useHistory } from 'react-router-dom';
import { MatchParams } from '../../routes';

interface StockListProps {
    stocks: Pick<Stock, 'name' | 'symbol'>[];
}

export const StockList: React.FC<StockListProps> = ({ stocks }) => {
    let { symbol } = useParams<MatchParams>();
    console.log(symbol);
    let history = useHistory();
    const handleClick = (symbol: string) => {
        history.push(`/stocks/${symbol}`);
    };

    const StockItems = stocks.map(
        (stock: Pick<Stock, 'name' | 'symbol'>, index) => (
            <StockListItem
                key={index}
                {...stock}
                isActive={symbol === stock.symbol}
                onStockSelect={handleClick}
            />
        )
    );

    return <Root>{stocks && StockItems}</Root>;
};

// TODO: remove
const Root = styled.div``;
