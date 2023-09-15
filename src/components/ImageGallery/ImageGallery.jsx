import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { StyledGallery } from './ImageGallery.styled';
import PropTypes from 'prop-types';
export const ImageGallery = ({ gallery, toggleModal }) => {
  return (
    <StyledGallery>
      {gallery.map(el => (
        <ImageGalleryItem
          toggleModal={toggleModal}
          key={el.id}
          id={el.id}
          webformatURL={el.webformatURL}
          largeImageURL={el.largeImageURL}
          alt={el.tags}
        />
      ))}
    </StyledGallery>
  );
};
ImageGallery.propTypes = {
  gallery: PropTypes.array,
  toggleModal: PropTypes.func,
};
