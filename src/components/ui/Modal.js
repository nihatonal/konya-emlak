import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import { IoCloseCircle } from 'react-icons/io5';
import Backdrop from './Backdrop';

const ModalOverlay = React.forwardRef(({ className = '', children, onClose, success = false }, ref) => {
    const content = (
        <div
            ref={ref}
            className={`
        fixed z-[99] left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2
        p-8 bg-bvs-lightGreen w-[90%] md:w-auto rounded-xl shadow-lg
        ${className}
      `}
        >
            <IoCloseCircle
                className="absolute right-4 top-4 text-2xl text-bvs-deepGreen cursor-pointer"
                onClick={onClose}
            />
            {!success && children}
        </div>
    );

    return ReactDOM.createPortal(content, document.getElementById('modal-hook'));
});

const Modal = ({ show, onClose, className, children, success }) => {
    const nodeRef = useRef(null);

    return (
        <>
            {show && <Backdrop onClick={onClose} />}
            <CSSTransition
                nodeRef={nodeRef}
                in={show}
                timeout={200}
                mountOnEnter
                unmountOnExit
                classNames="modal"
            >
                <ModalOverlay
                    ref={nodeRef}
                    className={className}
                    onClose={onClose}
                    success={success}
                >
                    {children}
                </ModalOverlay>
            </CSSTransition>
        </>
    );
};

export default Modal;
