import React, { useState } from "react";
import { Stock } from "../../@generated/types";
import styled from "styled-components/macro";
import { Tab, Tabs } from "@blueprintjs/core";
import {
  useHistory,
  useRouteMatch,
  useLocation,
  Switch,
  Route,
} from "react-router-dom";
import { CompanyProfile } from "./CompanyProfile";
import { ReactComponent as NothingYet } from "../../assets/nothing-here-yet.svg";

interface MoreInfoProps extends Partial<Stock> {
  name: string;
}

export const MoreInfo: React.FC<MoreInfoProps> = ({
  symbol,
  companyProfile,
  name,
}) => {
  const [selectedTab, setTab] = useState();
  let history = useHistory();
  let location = useLocation();

  const handleTabSelection = (tabId: string) => {
    history.push(`/symbol/${symbol}/${tabId}`);
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
        <Route exact path={`/symbol/:symbol/company-profile`}>
          <CompanyProfile {...companyProfile} name={name} />
        </Route>
        <Route exact path={`/symbol/:symbol/my-holdings`}>
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
