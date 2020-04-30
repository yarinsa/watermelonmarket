import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

interface MenuProps {}

export const Menu: React.FC<MenuProps> = ({}) => {
  return (
    <MenuList>
      <MenuListItem exact to="/">
        My Stocks
      </MenuListItem>
    </MenuList>
  );
};

const MenuList = styled.nav`
  margin-top: 20px;
`;

const activeClassName = "nav-item-active";

const MenuListItem = styled(NavLink).attrs({ activeClassName })`
  display: flex;
  align-items: center;
  line-height: 40px;
  color: inherit;
  padding: 0 20px;
  transition: all 0.2s;
  text-transform: capitalize;
  color: #9eabb5;
  font-family: SF-UI-Text-Bold;
  :hover {
    color: #333;
  }
  &.${activeClassName} {
    /* box-shadow: inset 0 -3px #3f1184; */
    color: #333;
  }
`;
