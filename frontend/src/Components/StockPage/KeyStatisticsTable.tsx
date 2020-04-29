import React from "react";
import styled from "styled-components/macro";
import { numberWithLetter } from "../../utils.service";
import { Stock } from "../../@generated/types";

interface KeyStatisticsTableProps extends Stock {}

export const KeyStatisticsTable: React.FC<KeyStatisticsTableProps> = ({
  quote,
  priceHistory,
}) => {
  return (
    <Table>
      <tbody>
        <TableRow>
          <TableData>
            <Label>Open</Label>
            <Data>{quote.open.toFixed(2)}</Data>
          </TableData>
          <TableData>
            <Label>Volume</Label>
            <Data>{numberWithLetter(quote.volume)}</Data>
          </TableData>
        </TableRow>
        <TableRow>
          <TableData>
            <Label>High</Label>
            <Data>{quote.high.toFixed(2)}</Data>
          </TableData>
          <TableData>
            <Label>Avg volume</Label>
            <Data>{numberWithLetter(quote.averageVolume)}</Data>
          </TableData>
        </TableRow>
        <TableRow>
          <TableData>
            <Label>Low</Label>
            <Data>{quote.low.toFixed(2)}</Data>
          </TableData>
          <TableData>
            <Label>MKT cap</Label>
            <Data>{quote.marketCap}</Data>
          </TableData>
        </TableRow>
        <TableRow>
          <TableData>
            <Label>52 wk high</Label>
            <Data>{priceHistory.fiftyTwoWeekHigh.toFixed(2)}</Data>
          </TableData>
          <TableData>
            <Label>P/E ratio</Label>
            <Data>-</Data>
          </TableData>
        </TableRow>
        <TableRow>
          <TableData>
            <Label>52 wk low</Label>
            <Data>{priceHistory.fiftyTwoWeekLow.toFixed(2)}</Data>
          </TableData>
          <TableData>
            <Label>DIV/YIELD</Label>
            <Data>0.00</Data>
          </TableData>
        </TableRow>
      </tbody>
    </Table>
  );
};

const Table = styled.table`
  font-size: 12px;
`;

const TableRow = styled.tr`
  :last-of-type {
    td {
      border-bottom: none;
    }
  }
`;

const TableData = styled.td`
  border-bottom: 1px solid #dcdcdc;
  width: 150px;
  display: inline-flex;
  justify-content: space-between;
  padding: 5px;
  font-family: SF-UI-Text-Bold;
  text-transform: uppercase;
  :first-of-type {
    margin-right: 20px;
  }
`;

const Label = styled.span`
  font-family: SF-UI-Text-Bold;
  color: #999;
`;

const Data = styled.span``;
