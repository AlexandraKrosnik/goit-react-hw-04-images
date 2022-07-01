import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalBackground } from './Modal.styled';

const modalRoot = document.getElementById('modal-root');
export const Modal = ({ children, onClose }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    const hiddenScroll = () => {
      window.scrollTo(0, 0);
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('scroll', hiddenScroll);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('scroll', hiddenScroll);
    };
  }, [onClose]);

  return createPortal(
    <Overlay
      onClick={e => {
        if (e.target.nodeName !== 'IMG') {
          onClose();
        }
      }}
    >
      <ModalBackground>{!!children && children}</ModalBackground>
    </Overlay>,
    modalRoot
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
};
