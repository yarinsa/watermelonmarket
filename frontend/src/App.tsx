import React, { useState, useEffect } from 'react';
import './index.css';
import './theme/_index.scss';
import {
    Route,
    Switch,
    BrowserRouter as Router,
    useHistory,
    Redirect,
} from 'react-router-dom';
import styled from 'styled-components/macro';
import { Sidebar as NavSidebar } from './Components/Sidebar/Sidebar';
import { Search } from './Components/Search';
// TODO:
// import { StockList } from "./Components/StockList";
import { StockList } from './Components/StockList/StockList';
import StockPage from './Components/StockPage';
import { StockRoutes } from './routes';
import { StockBrowser } from './Scenes/StockBrowser';

const App: React.FC = () => {
    return (
        <Root>
            <NavSidebar />
            <Content>
                <Route
                    path={[StockRoutes.main, '/']}
                    component={StockBrowser}
                />
            </Content>
        </Root>
    );
};

export default App;

const Root = styled.main`
    overflow: hidden;
    display: flex;
    align-items: stretch;
    height: 100vh;
`;

const Content = styled(Switch)`
    flex: 1;
`;
