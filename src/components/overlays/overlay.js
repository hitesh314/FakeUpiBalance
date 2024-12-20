import React from 'react';
import ReactDOM from 'react-dom';
import overlayStyles from '@/styles/overlays.module.css';

const Modal = ({ children }) => {
    return ReactDOM.createPortal(
        <div className={`${overlayStyles.modal}`}>
            <div className={`${overlayStyles.modalContent}`}>
                {children}
            </div>
        </div>,
        document.body
    );
};

export default Modal;