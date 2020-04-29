import React from "react";
import styled from "styled-components/macro";
import { ReactComponent as Logo } from "../../assets/icons/watermelon.svg";
import { Menu } from "./Menu";

interface SidebarProps {}

export const Sidebar: React.FC<SidebarProps> = ({}) => {
  return (
    <Root>
      <LogoContainer>
        <Logo />
      </LogoContainer>
      <Menu />
    </Root>
  );
};

const Root = styled.aside`
  width: 170px;
  background-color: #f4f7f9;
  box-shadow: 0px 0 3px #999;
  z-index: 1;
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: stretch;
  background-color: #21ce99;
  height: 60px;
  svg {
    display: block;
    margin: auto;
    width: 60px;
    height: 60px;
    padding: 10px;
    path {
      fill: white;
    }
    /* #outside {
      fill: #0a815c;
    }
    #inside {
      fill: #ff4d2d;
    } */
  }
`;
