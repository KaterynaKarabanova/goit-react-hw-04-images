import PropTypes from 'prop-types';
import { StyledModalOverlay, StyledModal } from './Modal.styled';
import React, { useEffect } from 'react';

export const Modal = ({ currentImg, toggleModal, modalOpen }) => {
  useEffect(() => {
    const keyDown = e => {
      if (e.code === 'Escape') {
        toggleModal('');
      }
      if (!modalOpen) {
        window.removeEventListener('keydown', keyDown);
      }
    };

    window.addEventListener('keydown', keyDown);

    return () => {
      window.removeEventListener('keydown', keyDown);
    };
  }, [modalOpen, toggleModal]);

  const onBackClick = e => {
    if (e.target === e.currentTarget) {
      toggleModal('');
    }
  };

  return (
    <StyledModalOverlay onClick={e => onBackClick(e)}>
      <StyledModal>
        <img src={currentImg} alt="" />
      </StyledModal>
    </StyledModalOverlay>
  );
};

Modal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  currentImg: PropTypes.string,
  modalOpen: PropTypes.bool,
};
