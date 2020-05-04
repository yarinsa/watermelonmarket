import React, { useState, useEffect } from 'react';
import { Stock } from '../../@generated/types';
import styled from 'styled-components/macro';
import { Tab, Tabs } from '@blueprintjs/core';
import { useHistory, Switch, Route, useParams } from 'react-router-dom';
import { CompanyProfile } from './CompanyProfile';
import { ReactComponent as NothingYet } from '../../assets/nothing-here-yet.svg';
import { MatchParams } from '../../routes';

interface DrawerContentProps extends Partial<Stock> {
    name: string;
}

export const DrawerContent: React.FC<DrawerContentProps> = ({
    symbol,
    companyProfile,
    name,
}) => {
    const [selectedTab, setTab] = useState<string>('');
    let history = useHistory();
    let { tabId } = useParams<MatchParams>();

    useEffect(() => {
        if (tabId) {
            setTab(tabId);
        }
    });
    const handleTabSelection = (tabId: string) => {
        history.push(`/stocks/${symbol}/${tabId}`);
    };
    return (
        <Root>
            <Tabs
                selectedTabId={selectedTab}
                onChange={handleTabSelection}
                className="full-tabs"
            >
                <Tab id="company-profile" title="Company Profile" />
                <Tab id="my-holdings" title="My Holdings" />
            </Tabs>
            <Switch>
                <Route exact path={`/stocks/:symbol/company-profile`}>
                    <CompanyProfile {...companyProfile} name={name} />
                </Route>
                <Route exact path={`/stocks/:symbol/my-holdings`}>
                    <StyledNothingYet />
                </Route>
            </Switch>
        </Root>
    );
};

const Root = styled.main`
    display: flex;
    flex-direction: column;
    padding: 20px;
`;

const StyledNothingYet = styled(NothingYet)`
    margin: 0 auto;
    margin-top: 200px;
`;
