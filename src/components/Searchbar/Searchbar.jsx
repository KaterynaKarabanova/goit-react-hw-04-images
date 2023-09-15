import PropTypes from 'prop-types';
import {
  StyledHeader,
  StyledSearchBtn,
  StyledInput,
  StyledForm,
} from './Searchbar.styled.js';
export const Searchbar = ({ onSubmit }) => {
  return (
    <StyledHeader>
      <StyledForm onSubmit={e => onSubmit(e)}>
        <StyledSearchBtn type="submit">
          <span>Search</span>
        </StyledSearchBtn>

        <StyledInput
          type="text"
          name="search"
          autoFocus
          placeholder="Search images and photos"
        />
      </StyledForm>
    </StyledHeader>
  );
};
Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
