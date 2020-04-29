import React, { useState } from "react";
import styled from "styled-components/macro";
import { PriceTag } from "../PriceTag";
import { H4 } from "@blueprintjs/core";
import {
  useHistory,
  useParams,
  useRouteMatch,
  RouteComponentProps,
} from "react-router-dom";
import { Stock, Interval, TimeRange } from "../../@generated/types";
import { MatchParams } from "../../App";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { formatDataToChart } from "../../utils.service";
import { ComposedChart, Line } from "recharts";

interface StockListItemProps extends Partial<Stock> {}

export const StockListItem: React.FC<StockListItemProps> = ({
  symbol,
  name,
  quote,
}) => {
  let history = useHistory();

  let match = useRouteMatch<MatchParams>("/symbol/:symbol");

  const { data, loading, error } = useQuery(GET_STOCK_INFO, {
    variables: {
      symbol: symbol,
      interval: Interval.Day,
      timeRange: TimeRange.Month,
    },
  });

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    history.push(`/symbol/${symbol}`);
  };

  // if (error) console.log(error);

  return (
    <Root
      isActive={match?.params.symbol === symbol}
      onClick={(event) => handleClick(event)}
    >
      <Info>
        <Title>{symbol}</Title>
        <Subtitle>{name}</Subtitle>
      </Info>
      <ChartContainer>
        {data && (
          <ComposedChart
            width={60}
            height={60}
            data={formatDataToChart(data.stock.chartData)}
          >
            <Line
              type="monotone"
              dataKey="price"
              stroke="#21ce99"
              strokeWidth={2}
            />
          </ComposedChart>
        )}
      </ChartContainer>
      {data ? (
        <PriceTag
          value={data.stock.quote.price.toFixed(2)}
          isPositive={data.stock.quote.change > 0}
        />
      ) : (
        <PriceTag value={""} isPositive={null} />
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
  background-color: ${(props) => (props.isActive ? "white" : "unset")};
  box-shadow: ${(props) =>
    props.isActive ? "-9px 0px 10px #dcdcdc" : "40px 0px 1px #999"};
  position: ${(props) => (props.isActive ? "relative" : "unset")};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Info = styled.div`
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
  font-size: 12px;
  width: 90px;
`;

const ChartContainer = styled.div`
  flex: 1;
  .recharts-layer.recharts-line-dots {
    display: none;
  }
`;

const GET_STOCK_INFO = gql`
  query StockInfo($symbol: ID!, $timeRange: TimeRange!, $interval: Interval!) {
    stock(symbol: $symbol) {
      quote {
        price
        change
      }
      chartData(timeRange: $timeRange, interval: $interval) {
        time
        price
      }
    }
  }
`;
