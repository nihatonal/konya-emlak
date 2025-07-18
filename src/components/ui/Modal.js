import React from 'react';
import ReactDOM from "react-dom";
import { CSSTransition } from 'react-transition-group';
import { IoCloseCircle } from "react-icons/io5";
import Backdrop from './Backdrop';
// import Success from '../components/Success';


const ModalOverlay = props => {

    const content = (
        <div className={`fixed z-80 left-1/2 top-1/2
        transform -translate-x-1/2 -translate-y-1/2
        p-8 bg-bvs-lightGreen w-[90%] md:w-auto
         ${props.className}`} ref={props.ref}>
            {/* <div className="fixed top-0 left-0 " onClick={props.onClose}></div> */}
            <div className=''>
                <IoCloseCircle className='absolute right-4 top-4 text-2xl text-bvs-deepGreen cursor-pointer' onClick={props.onClose} />
                {!props.success ? props.children : <div></div>}
            </div>

        </div>
    );
    return ReactDOM.createPortal(content, document.getElementById('modal-hook'));
};

const Modal = props => {
    const nodeRef = React.useRef(null)
    return (
        <React.Fragment >
            {props.show && <Backdrop onClick={props.onClose} />}
            <CSSTransition
                nodeRef={nodeRef}
                in={props.show}
                mountOnEnter
                unmountOnExit
                timeout={200}
                classNames="modal"
            >
                <ModalOverlay {...props} />
            </CSSTransition>
        </React.Fragment>
    );
};

export default Modal;
