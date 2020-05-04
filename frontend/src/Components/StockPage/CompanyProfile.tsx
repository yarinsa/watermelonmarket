import React from 'react';
import {
    CompanyProfile as CompanyProfileInterface,
    Stock,
} from '../../@generated/types';
import { H1, Card, H4 } from '@blueprintjs/core';
import styled from 'styled-components';
import { numberWithCommas } from '../../utils.service';

interface CompanyProfileProps extends Partial<CompanyProfileInterface> {
    name: String;
}

export const CompanyProfile: React.FC<CompanyProfileProps> = ({
    address,
    fullTimeEmployees,
    description,
    industry,
    phoneNumber,
    sector,
    website,
    name,
}) => {
    return (
        <Root>
            <H1>{name}</H1>
            <Description>{description}</Description>
            <Card>
                <div>
                    <Title>Address:</Title>
                    <span>{address}</span>
                </div>
                <div>
                    <Title>Website:</Title>
                    <a href={website}>{website}</a>
                </div>
                <div>
                    <Title>Phone Number:</Title>
                    <a href={'tel:' + phoneNumber}>{phoneNumber}</a>
                </div>
                <div>
                    <Title>Employees:</Title>
                    <span>
                        {fullTimeEmployees
                            ? numberWithCommas(fullTimeEmployees)
                            : fullTimeEmployees}
                    </span>
                </div>
                <div>
                    <Title>Sector:</Title>
                    <span>{sector}</span>
                </div>
                <div>
                    <Title>Industry:</Title>
                    <span>{industry}</span>
                </div>
            </Card>
        </Root>
    );
};

const Root = styled.div``;
const Description = styled.p``;
const Title = styled(H4)`
    display: inline-block;
    font-size: 16px !important;
    margin-right: 10px;
    font-family: SF-UI-Text-Bold;
`;
