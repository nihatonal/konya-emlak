import React from 'react';
import ReactDOM from 'react-dom';

const Backdrop = props => {
  return ReactDOM.createPortal(
    <div className="fixed top-0 left-0 z-80 bg-bvs-dropBack/80 w-full h-screen" onClick={props.onClick}></div>,
    document.getElementById('backdrop-hook')
  );
};

export default Backdrop;
