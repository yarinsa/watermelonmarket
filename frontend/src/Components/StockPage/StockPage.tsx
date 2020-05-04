import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { H1, H3, Spinner, Drawer, Button } from '@blueprintjs/core';
import { KeyStatisticsTable } from './KeyStatisticsTable';
import theme from '../../theme/theme.module.scss';
import { useRouteMatch, useHistory, useParams } from 'react-router-dom';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { ReactComponent as Loader } from '../../assets/Loader.svg';
import { ReactComponent as Placeholder } from '../../assets/no-stock-placeholder.svg';
import { formatDataToChart, addCurrencySymbol } from '../../utils.service';
import { Chart } from '../Chart';
import { DrawerContent } from './DrawerContent';
import { MatchParams } from '../../routes';

interface StockPageProps {}

export const StockPage: React.FC<StockPageProps> = ({}) => {
    const { symbol } = useParams();

    const [isDrawerOpen, setDrawer] = useState(false);
    const { data, loading, error } = useQuery(GET_STOCK_INFO, {
        variables: {
            symbol: symbol,
        },
    });

    let history = useHistory();
    const handleDrawer = (isOpen: boolean, route?: string) => {
        if (isOpen) {
            setDrawer(false);
            history.push(`/stocks/${symbol}`);
        } else {
            setDrawer(true);
            history.push(`/stocks/${symbol}/${route}`);
        }
    };

    if (error) console.log(error);

    return (
        <Root>
            {!symbol && !loading && (
                <PlaceholderContainer>
                    <Placeholder />
                </PlaceholderContainer>
            )}
            {!loading && data && (
                <div>
                    <Header>
                        <TitleRow>
                            {addCurrencySymbol(
                                data.stock.quote.price.toFixed(2),
                                data.stock.market.currency
                            )}
                        </TitleRow>
                        <SecondaryRow>
                            <SecondaryText
                                isPositive={data.stock.quote.change > 0}
                            >
                                {addCurrencySymbol(
                                    data.stock.quote.change.toFixed(2),
                                    data.stock.market.currency
                                )}{' '}
                                ({data.stock.quote.changePercent.toFixed(2)}%)
                            </SecondaryText>
                            <Symbol>{data.stock.symbol}</Symbol>
                        </SecondaryRow>
                        <SecondaryRow>
                            <SecondaryText>
                                {data.stock.market.exchangeName}{' '}
                                {data.stock.market.marketState}
                            </SecondaryText>
                            <SecondaryText>{data.stock.name}</SecondaryText>
                        </SecondaryRow>
                    </Header>
                    <ChartContainer>
                        <Chart
                            chartData={data.stock.chartData}
                            symbol={data.stock.symbol}
                        />
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
                            <ShowMore
                                onClick={() =>
                                    handleDrawer(false, 'company-profile')
                                }
                            >
                                Show more
                            </ShowMore>
                            <Drawer
                                isOpen={isDrawerOpen}
                                onClose={() => handleDrawer(true)}
                            >
                                <DrawerContent {...data.stock} />
                            </Drawer>
                        </InfoItem>
                    </InfoContainer>
                    <ControlsContainer>
                        <Button
                            intent="primary"
                            onClick={() => handleDrawer(false, 'my-holdings')}
                        >
                            Add To My Holdings
                        </Button>
                    </ControlsContainer>
                </div>
            )}
            {loading && <Loader />}
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

const SecondaryText = styled.span<{ isPositive?: boolean }>`
    display: block;
    color: ${props => {
        if (props.isPositive === false) {
            return '#FF4D2D';
        }
        if (props.isPositive === true) {
            return '#21ce99';
        }
        return '#999';
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
    width: 100%;
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

const ControlsContainer = styled.div`
    display: flex;
    flex-direction: row-reverse;
    padding: 10px;
`;

const PlaceholderContainer = styled.div`
    margin: auto;
    text-align: center;
    margin-top: 100px;
`;

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
                address
                phoneNumber
                website
                sector
                industry
                sector
                fullTimeEmployees
            }
            priceHistory {
                fiftyTwoWeekLow
                fiftyTwoWeekHigh
            }
            market {
                marketState
                exchangeName
                currency
            }
            chartData(timeRange: YEAR, interval: DAY) {
                time
                close
                open
                high
                low
                volume
            }
        }
    }
`;
