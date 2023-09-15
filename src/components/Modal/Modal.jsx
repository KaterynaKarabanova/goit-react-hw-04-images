import PropTypes from 'prop-types';
import { StyledModalOverlay, StyledModal } from './Modal.styled';
import React, { Component } from 'react';
export class Modal extends Component {
  keyDown = e => {
    if (e.code === 'Escape') {
      this.props.toggleModal('');
    }
  };
  componentDidMount() {
    window.addEventListener('keydown', this.keyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.keyDown);
  }
  onBackClick = e => {
    if (e.target === e.currentTarget) {
      this.props.toggleModal('');
    }
  };
  render() {
    return (
      <StyledModalOverlay onClick={e => this.onBackClick(e)}>
        <StyledModal>
          <img src={this.props.currentImg} alt="" />
        </StyledModal>
      </StyledModalOverlay>
    );
  }
}
Modal.propTypes = {
  toggleModal: PropTypes.func,
  currentImg: PropTypes.string,
};
