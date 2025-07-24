import React from 'react';
import ReactDOM from 'react-dom';

const Backdrop = ({ onClick }) => {
  return ReactDOM.createPortal(
    <div
      onClick={onClick}
      className="fixed inset-0 z-[98] bg-bvs-dropBack/80"
    />,
    document.getElementById('backdrop-hook')
  );
};

export default Backdrop;
