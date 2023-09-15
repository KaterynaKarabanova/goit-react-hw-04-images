import { StyledBtn } from './LoadMore.styled';
import PropTypes from 'prop-types';
export const LoadMore = ({ loadMore }) => {
  return (
    <StyledBtn type="button" onClick={e => loadMore(e)}>
      Load More
    </StyledBtn>
  );
};
LoadMore.propTypes = {
  loadMore: PropTypes.func,
};
