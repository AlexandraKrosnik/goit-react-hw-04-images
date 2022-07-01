import PropTypes from 'prop-types';
import { GalleryItem, GalleryImg } from './ImageGalleryItem.styled';
import { Modal } from 'components/Modal/Modal';
import { useState } from 'react';

export const ImageGalleryItem = ({ data }) => {
  const [isModal, setIsModal] = useState(false);
  const toggleModal = () => {
    setIsModal(isModal => !isModal);
  };

  const { webformatURL, largeImageURL, tags } = data;

  return (
    <GalleryItem>
      <GalleryImg src={webformatURL} alt={tags} onClick={toggleModal} />
      {isModal && (
        <Modal onClose={toggleModal}>
          <img src={largeImageURL} alt={tags} />
        </Modal>
      )}
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
};
