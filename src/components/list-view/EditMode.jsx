// src/components/list-view/EditPopup.jsx
import React from 'react';
import ButtonImg from './ButtonImg';

const EditMode = ({ itemData, setItemData, closePopup, saveItem }) => {
  const handleSave = () => {
    // Implement save logic here
    saveItem(itemData);
    closePopup();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItemData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className="edit-popup">
      {/* Implement your form and inputs here using itemData and setItemData */}
      <button type='button' className='save-button' onClick={handleSave}><ButtonImg type='save'/></button>
      <button type='button' className='cancel-button' onClick={closePopup}><ButtonImg type='cancel'/></button>
    </div>
  );
};

export default EditMode;