import PropTypes from 'prop-types';
import {
  Header,
  SearchForm,
  Button,
  SearchLabel,
  SearchInput,
  Svg,
} from './Searchbar.styled';
import { AiOutlineSearch } from 'react-icons/ai';
import styled from 'styled-components';
import { useState } from 'react';

const SearchSvg = styled(AiOutlineSearch)`
  ${Svg}
`;

export const Searchbar = ({ onSubmit }) => {
  const [value, setValue] = useState('');

  const changeValue = ({ target }) => {
    const query = target.value;
    if (query === value || query === ' ') {
      return;
    }

    setValue(query);
  };

  const submitForm = e => {
    e.preventDefault();
    const query = e.target.query.value.trim();
    onSubmit(query);
  };

  return (
    <Header>
      <SearchForm onSubmit={submitForm}>
        <Button type="submit">
          <SearchSvg />
          <SearchLabel>Search</SearchLabel>
        </Button>
        <SearchInput
          name="query"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={changeValue}
          value={value}
        />
      </SearchForm>
    </Header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
