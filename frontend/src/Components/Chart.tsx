import React, { useState, useEffect } from 'react';
import {
    ResponsiveContainer,
    // Line,
    Tooltip,
    ComposedChart,
    YAxis,
    CartesianGrid,
} from 'recharts';
import styled from 'styled-components/macro';
import { formatDataToChart, addCurrencySymbol } from '../utils.service';
import gql from 'graphql-tag';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import { Stock, Interval, TimeRange } from '../@generated/types';
import { Tabs, Tab, Popover, Button, Menu, MenuItem } from '@blueprintjs/core';
import moment from 'moment';
import { Line } from 'react-chartjs-2';
import format from 'date-format';
import { ReactComponent as Loader } from '../assets/Loader.svg';

interface ChartProps extends Partial<Stock> {}

export const Chart: React.FC<ChartProps> = ({ chartData, symbol }) => {
    const [selectedInterval, setInterval] = useState<Interval>(Interval.Day);
    const [selectedRange, setRange] = useState<TimeRange>(TimeRange.Month);
    const [selectedSymbol, setSymbol] = useState<String | undefined>(symbol);

    const handleTimeRangeSelect = (timeRange: TimeRange) => {
        setRange(timeRange);
    };

    const handleIntervalSelect = (interval: Interval) => {
        setInterval(interval);
    };

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

    const dropdownMenu = (
        <Menu>
            <MenuItem
                onClick={() => handleIntervalSelect(Interval.FiveMinutes)}
                text="Five Minutes"
            />
            <MenuItem
                onClick={() => handleIntervalSelect(Interval.FifteenMinutes)}
                text="Fifteen Minutes"
            />
            <MenuItem
                onClick={() => handleIntervalSelect(Interval.ThirtyMinutes)}
                text="Thirty Minutes"
            />
            <MenuItem
                onClick={() => handleIntervalSelect(Interval.Hour)}
                text="One Hour"
            />
            <MenuItem
                onClick={() => handleIntervalSelect(Interval.Day)}
                text="One Day"
            />
            <MenuItem
                onClick={() => handleIntervalSelect(Interval.Week)}
                text="One Week"
            />
            <MenuItem
                onClick={() => handleIntervalSelect(Interval.Month)}
                text="One Month"
            />
            <MenuItem
                onClick={() => handleIntervalSelect(Interval.ThreeMonth)}
                text="Three Month"
            />
        </Menu>
    );
    return (
        <Root>
            <IntervalMenu content={dropdownMenu} position="bottom">
                <Button
                    icon="series-configuration"
                    text={'Time Interval: ' + selectedInterval}
                    minimal
                />
            </IntervalMenu>
            <ChartContainer>
                {loading && <Loader />}
                {data && !loading && (
                    <Line
                        height={110}
                        data={formatDataToChart(data.stock.chartData)}
                        options={{
                            responsive: true,
                            tooltips: {
                                mode: 'index',
                                intersect: false,
                                callbacks: {
                                    title: (item, data) => {
                                        if (item[0].label) {
                                            return format(
                                                'dd-MM-yy hh:mm',
                                                new Date(item[0].label)
                                            );
                                        }
                                        return 'hey';
                                    },
                                },
                            },
                            hover: {
                                intersect: false,
                                mode: 'index',
                            },
                            scales: {
                                xAxes: [
                                    {
                                        display: false,
                                        gridLines: {
                                            display: false,
                                        },
                                    },
                                ],
                                yAxes: [
                                    {
                                        gridLines: {
                                            display: false,
                                            drawOnChartArea: true,
                                        },
                                    },
                                ],
                            },
                        }}
                        legend={{
                            display: false,
                        }}
                    />
                )}
                {/* <ResponsiveContainer>
                    <StyledChart
                        width={600}
                        height={250}
                        data={
                            data
                                ? data.stock.chartData
                                : formatDataToChart(chartData)
                        }
                        baseValue={30}
                    >
                        <Line
                            type="monotone"
                            dataKey="close"
                            stroke="#21ce99"
                            strokeWidth={3}
                        />
                        <Line
                            type="monotone"
                            dataKey="open"
                            stroke="beige"
                            strokeWidth={3}
                        />
                        <Line
                            type="monotone"
                            dataKey="high"
                            stroke="pink"
                            strokeWidth={3}
                        />
                        <Line
                            type="monotone"
                            dataKey="low"
                            stroke="purple"
                            strokeWidth={3}
                        />
                        {data && (
                            <Tooltip
                            // formatter={(value, name, props) => {
                            //     const { payload } = props;
                            //     return [
                            //         addCurrencySymbol(
                            //             payload.close.toFixed(2),
                            //             data.stock.market.currency
                            //         ),
                            //         moment(payload.time).format(
                            //             'MM-DD-YYYY HH:mm'
                            //         ),
                            //     ];
                            // }}
                            // labelFormatter={props => {
                            //     return 'Date | Price';
                            // }}
                            />
                        )}
                    </StyledChart>
                </ResponsiveContainer> */}
            </ChartContainer>
            <Tabs id="navbar" selectedTabId={selectedRange}>
                <Tab
                    onMouseDown={() => handleTimeRangeSelect(TimeRange.Day)}
                    id={TimeRange.Day}
                    title="1 day"
                />
                <Tab
                    onMouseDown={() =>
                        handleTimeRangeSelect(TimeRange.FiveDays)
                    }
                    id={TimeRange.FiveDays}
                    title="5 days"
                />
                <Tab
                    onMouseDown={() => handleTimeRangeSelect(TimeRange.Month)}
                    id={TimeRange.Month}
                    title="1 month"
                />
                <Tab
                    onMouseDown={() =>
                        handleTimeRangeSelect(TimeRange.ThreeMonth)
                    }
                    id={TimeRange.ThreeMonth}
                    title="3 month"
                />
                <Tab
                    onMouseDown={() => handleTimeRangeSelect(TimeRange.Year)}
                    id={TimeRange.Year}
                    title="1 year"
                />
                <Tab
                    onMouseDown={() =>
                        handleTimeRangeSelect(TimeRange.FiveYears)
                    }
                    id={TimeRange.FiveYears}
                    title="5 years"
                />
                <Tab
                    onMouseDown={() => handleTimeRangeSelect(TimeRange.Ytd)}
                    id={TimeRange.Ytd}
                    title="YTD"
                />
                <Tab
                    onMouseDown={() => handleTimeRangeSelect(TimeRange.Max)}
                    id={TimeRange.Max}
                    title="MAX"
                />
            </Tabs>
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

const ChartContainer = styled.div`
    flex: 1;
    min-height: 200px;
    width: 100%;
    position: relative;
`;
const StyledChart = styled(ComposedChart)`
    .recharts-layer.recharts-line-dots {
        display: none;
    }
    .recharts-tooltip-wrapper {
        z-index: 2;
        .recharts-default-tooltip {
            background-color: rgb(242, 251, 248);
            border-radius: 18px;
            max-height: 60px;
            line-height: 20px;
            p {
                font-family: SF-UI-Text-Bold;
            }
        }
    }
`;

const IntervalMenu = styled(Popover)``;

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

const verticalLinePlugin = {
    getLinePosition: function(chart: any, pointIndex: any) {
        const meta = chart.getDatasetMeta(0); // first dataset is used to discover X coordinate of a point
        const data = meta.data;
        return data[pointIndex]._model.x;
    },
    renderVerticalLine: function(chartInstance: any, pointIndex: any) {
        const lineLeftOffset = this.getLinePosition(chartInstance, pointIndex);
        const scale = chartInstance.scales['y-axis-0'];
        const context = chartInstance.chart.ctx;

        // render vertical line
        context.beginPath();
        context.strokeStyle = '#ff0000';
        context.moveTo(lineLeftOffset, scale.top);
        context.lineTo(lineLeftOffset, scale.bottom);
        context.stroke();

        // write label
        context.fillStyle = '#ff0000';
        context.textAlign = 'center';
        context.fillText(
            'MY TEXT',
            lineLeftOffset,
            (scale.bottom - scale.top) / 2 + scale.top
        );
    },

    afterDatasetsDraw: function(chart: any, easing: any) {
        if (chart.config.lineAtIndex) {
            chart.config.lineAtIndex.forEach((pointIndex: number) =>
                this.renderVerticalLine(chart, pointIndex)
            );
        }
    },
};
