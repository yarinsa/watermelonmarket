import React from "react";
import { Tag } from "@blueprintjs/core";
import styled from "styled-components/macro";

interface PriceTagProps {
  value: string;
  isPositive: boolean | null;
}

export const PriceTag: React.FC<PriceTagProps> = ({ value, isPositive }) => {
  return <StyledTag isPositive={isPositive}>{value}</StyledTag>;
};

const StyledTag = styled(Tag)<Partial<PriceTagProps>>`
  background-color: ${(props) => {
    if (props.isPositive === null) {
      return "#999";
    } else if (props.isPositive) {
      return "#21ce99";
    } else {
      return "#FF4D2D";
    }
  }};
  padding: 4px 8px;
  text-align: center;
`;
