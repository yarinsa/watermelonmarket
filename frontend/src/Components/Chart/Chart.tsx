import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import { formatDataToChart } from '../../utils.service';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { Stock, Interval, TimeRange } from '../../@generated/types';
import { Line } from 'react-chartjs-2';
import { ReactComponent as Loader } from '../../assets/EllipsisLoader.svg';
import { ChartTabs } from './ChartTabs';
import { IntervalMenu } from './IntervalMenu';
import { options, legend } from './config';
import { dataFormatter } from './chart.service';

interface ChartProps extends Partial<Stock> {
    tabs?: boolean;
    interval?: boolean;
    averageLine?: boolean;
    tooltip?: boolean;
    maintainAspectRatio?: boolean;
    height: number;
}

export const Chart: React.FC<ChartProps> = ({
    symbol,
    tabs,
    interval,
    averageLine,
    tooltip,
    maintainAspectRatio,
    height,
}) => {
    const [selectedInterval, setInterval] = useState<Interval>(Interval.Day);
    const [selectedRange, setRange] = useState<TimeRange>(TimeRange.Month);
    const [selectedSymbol, setSymbol] = useState<String | undefined>(symbol);

    useEffect(() => {
        setSymbol(symbol);
    });

    const { data, loading, error } = useQuery(GET_CHART_INFO, {
        variables: {
            symbol: symbol,
            interval: selectedInterval,
            timeRange: selectedRange,
        },
    });

    return (
        <Root>
            {interval && (
                <IntervalMenu
                    setInterval={setInterval}
                    selectedInterval={selectedInterval}
                />
            )}
            <ChartContainer height={height}>
                {loading && <ResponsiveLoader />}
                {data && !loading && (
                    <Line
                        data={dataFormatter(data.stock.chartData, averageLine)}
                        options={options(tooltip)}
                        legend={legend}
                        height={100}
                    />
                )}
            </ChartContainer>
            {tabs && (
                <ChartTabs setRange={setRange} selectedRange={selectedRange} />
            )}
        </Root>
    );
};

const Root = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .bp3-tabs {
        margin-top: -10px;
        display: flex;
        justify-content: center;
        text-transform: uppercase;
        font-family: SF-UI-Text-Bold;
    }
`;

const ChartContainer = styled.div<{ height: number }>`
    width: 100%;
    position: relative;
    height: ${props => props.height + 'px'};
`;

const ResponsiveLoader = styled(Loader)`
    width: inherit;
    height: inherit;
    max-width: 100px;
    margin: 0 auto;
`;

const GET_CHART_INFO = gql`
    query getChart($symbol: ID!, $timeRange: TimeRange!, $interval: Interval!) {
        stock(symbol: $symbol) {
            symbol
            chartData(timeRange: $timeRange, interval: $interval) {
                time
                close
                open
                high
                low
                volume
            }
            market {
                currency
            }
        }
    }
`;
