import React from "react";
import {
  CompanyProfile as CompanyProfileInterface,
  Stock,
} from "../../@generated/types";
import { H1 } from "@blueprintjs/core";
import styled from "styled-components";

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
    </Root>
  );
};

const Root = styled.div``;
const Description = styled.p``;
