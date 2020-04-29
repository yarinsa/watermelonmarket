import React from "react";
import styled from "styled-components/macro";
import { H1, H3, Spinner } from "@blueprintjs/core";
import { KeyStatisticsTable } from "./KeyStatisticsTable";
import theme from "../../theme/theme.module.scss";
import { useRouteMatch } from "react-router-dom";
import { MatchParams } from "../../App";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { ReactComponent as Loader } from '../../assets/Loader.svg'
import { LineChart, Line, Legend, Tooltip, ResponsiveContainer, ComposedChart } from "recharts";
import {formatDataToChart} from '../../utils.service'
import { Chart } from "../Chart";

interface StockPageProps {}

export const StockPage: React.FC<StockPageProps> = ({}) => {
  let match = useRouteMatch<MatchParams>("/symbol/:symbol");

  const { data, loading, error } = useQuery(GET_STOCK_INFO, {
    variables: {
      symbol: match?.params.symbol,
    },
  });

  if(data) console.log(data.stock.quote.change)
  // console.log(error)
  
  return (
    <Root>
      {!loading && data && 
      (<div>
      <Header>
        <TitleRow>{data.stock.quote.price.toFixed(2)}</TitleRow>
        <SecondaryRow>
          <SecondaryText isPositive={data.stock.quote.change > 0} >{data.stock.quote.change.toFixed(2)} ({data.stock.quote.changePercent.toFixed(2)}%)</SecondaryText>
           <Symbol>{data.stock.symbol}</Symbol>
        </SecondaryRow>
        <SecondaryRow>
          <SecondaryText>{data.stock.market.exchangeName} {data.stock.market.marketState}</SecondaryText>
          <SecondaryText>{data.stock.name}</SecondaryText>
        </SecondaryRow>
      </Header>
      <ChartContainer> 
        <Chart chartData={data.stock.chartData} symbol={data.stock.symbol} />

      </ChartContainer>
      <InfoContainer>
        <InfoItem>
          <InfoItemTitle>Stats</InfoItemTitle>
          <KeyStatisticsTable {...data.stock} />
        </InfoItem>
        <InfoItem>
          <InfoItemTitle>About</InfoItemTitle>
          <CompanyDescription>
            {data.stock.companyProfile.description}
          </CompanyDescription>
          <ShowMore>Show more</ShowMore>
        </InfoItem>
      </InfoContainer>
      </div>)}
      {loading && <Loader/>}
    </Root>
  );
};


const Root = styled.section`
  padding: 0 20px;
  padding-top: 20px;
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid rgba(41, 41, 41, 0.15);
  padding-bottom: 30px;
`;

const TitleRow = styled(H1)``;

const SecondaryRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SecondaryText = styled.span<{isPositive? : boolean}>`
  display: block;
  color: ${(props) => {
    if (props.isPositive=== false){
      return "#FF4D2D"
    }
    if (props.isPositive=== true){
      return "#21ce99"
    }
    return "#999"
  }};
  font-size: 14px;
  line-height: 18px;
`;

const Symbol = styled.span`
  font-family: SF-UI-Display-Bold;
  font-size: 14px;
`;

const ChartContainer = styled.div`
  flex: 1;
  height: 300px;
  width:100%;
  border-bottom: 1px solid rgba(41, 41, 41, 0.15);
`;

const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid rgba(41, 41, 41, 0.15);
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  :nth-of-type(2) {
    flex: 1;
    margin-left: 40px;
  }
`;

const InfoItemTitle = styled(H3)`
  font-size: 18px !important;
  font-family: SF-UI-Text-Bold;
`;

const CompanyDescription = styled.p`
  flex: 1;
  margin: 0;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
  color: #666;
`;

const ShowMore = styled.a`
  text-transform: uppercase;
  font-weight: 800;
`;

const StyledChart = styled(ComposedChart)`
.recharts-layer.recharts-line-dots{
  display:none;
}`

const GET_STOCK_INFO = gql`
  query StockInfo($symbol: ID!) {
    stock(symbol: $symbol) {
      name
      symbol
      quote {
        price
        open
        high
        low
        change
        changePercent
        volume
        averageVolume
      }
      companyProfile {
        description
      }
      priceHistory{
        fiftyTwoWeekLow
        fiftyTwoWeekHigh
      }
      market {
        marketState
        exchangeName
        currency
      }
      chartData(timeRange:  YEAR,interval: DAY){
        time
        price
      }
   }
  }
`;
