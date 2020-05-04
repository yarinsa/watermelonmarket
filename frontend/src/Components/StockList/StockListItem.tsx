import React from 'react';
import styled from 'styled-components/macro';
import { H4, Tag } from '@blueprintjs/core';
import { Stock, Interval, TimeRange } from '../../@generated/types';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { formatDataToOldChart, addCurrencySymbol } from '../../utils.service';
import { ComposedChart, Line } from 'recharts';

interface StockListItemProps extends Pick<Stock, 'symbol' | 'name'> {
    isActive: boolean;
    onStockSelect: CallableFunction;
}

export const StockListItem: React.FC<StockListItemProps> = ({
    symbol,
    name,
    isActive,
    onStockSelect,
}) => {
    // TODO: move query up.
    const { data } = useQuery(GET_STOCK_INFO, {
        variables: {
            symbol: symbol,
            interval: Interval.Day,
            timeRange: TimeRange.Month,
        },
    });

    return (
        <Root isActive={isActive} onClick={() => onStockSelect(symbol)}>
            <StockDetails>
                <Title>{symbol}</Title>
                <Subtitle>{name}</Subtitle>
            </StockDetails>
            <ChartContainer>
                {data && (
                    <ComposedChart
                        width={60}
                        height={60}
                        data={formatDataToOldChart(data.stock.chartData)}
                    >
                        <Line
                            type="monotone"
                            dataKey="close"
                            stroke="#21ce99"
                            strokeWidth={2}
                        />
                        <Line
                            type="monotone"
                            dataKey="minimizer"
                            stroke="transparent"
                            strokeWidth={3}
                        />
                        <Line
                            type="monotone"
                            dataKey="maximizer"
                            stroke="transparent"
                            strokeWidth={3}
                        />
                    </ComposedChart>
                )}
            </ChartContainer>
            {data && (
                <StyledTag isPositive={data.stock.quote.change > 0}>
                    {addCurrencySymbol(
                        data.stock.quote.price.toFixed(2),
                        data.stock.market.currency
                    )}
                </StyledTag>
            )}
        </Root>
    );
};

const Root = styled.div<{ isActive: boolean }>`
    height: 60px;
    box-shadow: 40px 0px 1px #999;
    padding-left: 40px;
    padding-right: 15px;
    cursor: pointer;
    background-color: ${props => (props.isActive ? 'white' : 'unset')};
    box-shadow: ${props =>
        props.isActive ? '-9px 0px 10px #dcdcdc' : '40px 0px 1px #999'};
    position: ${props => (props.isActive ? 'relative' : 'unset')};
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const StockDetails = styled.div`
    text-transform: uppercase;
    margin-right: 10px;
`;

const Title = styled(H4)`
    line-height: 8px !important;
    font-size: 16px !important;
    font-family: SF-UI-Text-Bold;
    margin: 0;
`;

const Subtitle = styled.span`
    display: block;
    color: #999;
    padding-left: 2px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 10px;
    width: 90px;
`;

const ChartContainer = styled.div`
    flex: 1;
    .recharts-layer.recharts-line-dots {
        display: none;
    }
    .recharts-wrapper {
        cursor: pointer !important;
    }
`;

const StyledTag = styled(Tag)<{ isPositive: boolean }>`
    background-color: ${props => {
        if (props.isPositive === null) {
            return '#999';
        } else if (props.isPositive) {
            return '#21ce99';
        } else {
            return '#FF4D2D';
        }
    }};
    padding: 4px 8px;
    text-align: center;
`;

const GET_STOCK_INFO = gql`
    query StockInfo(
        $symbol: ID!
        $timeRange: TimeRange!
        $interval: Interval!
    ) {
        stock(symbol: $symbol) {
            quote {
                price
                change
            }
            chartData(timeRange: $timeRange, interval: $interval) {
                time
                close
            }
            market {
                currency
            }
        }
    }
`;
