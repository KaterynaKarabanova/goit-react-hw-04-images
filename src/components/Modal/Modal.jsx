import PropTypes from 'prop-types';
import { StyledModalOverlay, StyledModal } from './Modal.styled';
import React, { useEffect } from 'react';
export const Modal = ({ currentImg, toggleModal, modalOpen }) => {
  const keyDown = e => {
    if (e.code === 'Escape') {
      toggleModal('');
    }
    if (!modalOpen) {
      window.removeEventListener('keydown', keyDown);
    }
  };
  useEffect(() => {
    window.addEventListener('keydown', keyDown);
  }, []);
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
  toggleModal: PropTypes.func,
  currentImg: PropTypes.string,
};
