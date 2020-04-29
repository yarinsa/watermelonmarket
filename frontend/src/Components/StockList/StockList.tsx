import React from "react";
import styled from "styled-components/macro";
import { StockListItem } from "./StockListItem";
import { Stock } from "../../@generated/types";

interface StockListProps {
  stocks: Partial<Stock>[];
}
export const StockList: React.FC<StockListProps> = ({ stocks }) => {
  const StockItems = stocks.map((stock, index) => (
    <StockListItem key={index} {...stock} />
  ));

  return <Root>{stocks && StockItems}</Root>;
};

const Root = styled.div``;
