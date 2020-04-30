import React, { useState, useEffect } from "react";
import {
  ResponsiveContainer,
  Line,
  Tooltip,
  ComposedChart,
  YAxis,
  CartesianGrid,
} from "recharts";
import styled from "styled-components";
import { formatDataToChart } from "../utils.service";
import gql from "graphql-tag";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";
import { Stock, Interval, TimeRange } from "../@generated/types";
import { Tabs, Tab, Popover, Button, Menu, MenuItem } from "@blueprintjs/core";
import moment from "moment";

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
        <Button icon="series-configuration" text="Time Interval" minimal />
      </IntervalMenu>
      <ChartContainer>
        <ResponsiveContainer>
          <StyledChart
            width={600}
            height={250}
            data={
              data
                ? formatDataToChart(data.stock.chartData)
                : formatDataToChart(chartData)
            }
            baseValue={30}
          >
            <Line
              type="monotone"
              dataKey="price"
              stroke="#21ce99"
              strokeWidth={3}
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
            <Line type="monotone" dataKey="500" stroke="pink" strokeWidth={3} />
            <Tooltip
              formatter={(value, name, props) => {
                const { payload } = props;
                return [
                  payload.price.toFixed(3),
                  moment(payload.time).format("MM-DD-YYYY HH:mm"),
                ];
              }}
              labelFormatter={(props) => {
                return "Date / Price";
              }}
            />
          </StyledChart>
        </ResponsiveContainer>
      </ChartContainer>
      <Tabs id="navbar" selectedTabId={selectedRange}>
        <Tab
          onMouseDown={() => handleTimeRangeSelect(TimeRange.Day)}
          id={TimeRange.Day}
          title="1 day"
        />
        <Tab
          onMouseDown={() => handleTimeRangeSelect(TimeRange.FiveDays)}
          id={TimeRange.FiveDays}
          title="5 days"
        />
        <Tab
          onMouseDown={() => handleTimeRangeSelect(TimeRange.Month)}
          id={TimeRange.Month}
          title="1 month"
        />
        <Tab
          onMouseDown={() => handleTimeRangeSelect(TimeRange.ThreeMonth)}
          id={TimeRange.ThreeMonth}
          title="3 month"
        />
        <Tab
          onMouseDown={() => handleTimeRangeSelect(TimeRange.Year)}
          id={TimeRange.Year}
          title="1 year"
        />
        <Tab
          onMouseDown={() => handleTimeRangeSelect(TimeRange.FiveYears)}
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
  height: 260px;
  width: 100%;
`;
const StyledChart = styled(ComposedChart)`
  .recharts-layer.recharts-line-dots {
    display: none;
  }
`;

const IntervalMenu = styled(Popover)`
  position: absolute;
  top: 5px;
  z-index: 1;
`;

const GET_CHART_INFO = gql`
  query getChart($symbol: ID!, $timeRange: TimeRange!, $interval: Interval!) {
    stock(symbol: $symbol) {
      symbol
      chartData(timeRange: $timeRange, interval: $interval) {
        time
        price
      }
    }
  }
`;
