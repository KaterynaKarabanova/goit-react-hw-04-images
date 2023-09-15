import { StyledGalleryItem, StyledGalleryImg } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';
export const ImageGalleryItem = ({
  id,
  webformatURL,
  largeImageURL,
  alt,
  toggleModal,
}) => {
  return (
    <StyledGalleryItem id={id} onClick={() => toggleModal(largeImageURL)}>
      <StyledGalleryImg src={webformatURL} alt={alt} />
    </StyledGalleryItem>
  );
};
ImageGalleryItem.propTypes = {
  id: PropTypes.number,
  webformatURL: PropTypes.string,
  largeImageURL: PropTypes.string,
  alt: PropTypes.string,
  toggleModal: PropTypes.func,
};
