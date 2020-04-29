import React, { useState } from "react";
import { Suggest, ItemPredicate, ItemRenderer } from "@blueprintjs/select";
import { MenuItem, Button, Spinner, Icon, InputGroup } from "@blueprintjs/core";
import styled from "styled-components/macro";
import gql from "graphql-tag";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";
import { debounce } from "lodash";
import { useHistory } from "react-router-dom";
import { useSearchQuery } from "../../../@generated/types";
import { ReactComponent as Loader } from "../../../assets/EllipsisLoader.svg";

export interface ISearchOption {
  symbol: string;
  name: string;
}

interface SearchProps {
  onSearch?: CallableFunction;
}

export const Search: React.FC<any> = ({ onSearch }) => {
  const [query, setQuery] = useState<string>("");
  let history = useHistory();
  const handleValueChange = (searchOption: ISearchOption) => {
    history.push(`/symbol/${searchOption.symbol}`);
  };

  const handleQuery = debounce((query: string) => {
    setQuery(query);
  }, 250);

  const { data, loading, error } = useQuery(SEARCH, {
    variables: {
      query: query,
    },
  });

  if (data && query.length > 0) {
    onSearch(data.searchStock);
  }
  // if (error) console.log(error);

  return (
    <Root>
      <SearchIcon icon="search" />
      <SearchInput
        placeholder="Search by symbol..."
        onInput={(event: React.FormEvent<HTMLInputElement>) =>
          handleQuery(event.currentTarget.value)
        }
      />
      {loading ? <Loader /> : <span />}
    </Root>
  );
};

const Root = styled.div`
  color: #afbac2;
  display: flex;
  align-items: center;
  height: 60px;
  padding: 0 20px;
  border-bottom: 1px solid rgba(41, 41, 41, 0.15);
`;

const SearchIcon = styled(Icon)`
  svg {
    width: 16px;
    height: 16px;
  }
`;

const SearchInput = styled.input`
  background-color: transparent;
  font-size: 16px;
  color: #666;
  border: none;
  padding-left: 10px;
  :active,
  :focus {
    border: none;
    outline: none;
  }
`;

const SEARCH = gql`
  query Search($query: String!) {
    searchStock(query: $query) {
      name
      symbol
    }
  }
`;
