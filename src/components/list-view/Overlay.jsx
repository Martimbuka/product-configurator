import React from 'react';

const Overlay = ({ closePopup }) => (
  <div className="overlay" onClick={closePopup}></div>
);

export default Overlay;