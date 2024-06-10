import React, { useState } from 'react';

const MyItemRender = ({ dataItem, saveItem, deleteItem, dataLength }) => {
  const [editMode, setEditMode] = useState(dataItem.edit || false);
  const [itemData, setItemData] = useState({ ...dataItem, width: dataItem.width, height: dataItem.height });

  const handleSave = () => {
    saveItem(itemData);
    setEditMode(false);
  };

  const handleDelete = () => {
    deleteItem(itemData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItemData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className={`list-view-item ${editMode ? 'editing' : ''}`} style={{ width: '100%' }}>
      {editMode ? (
        <div style={{ width: '100%' }}>
          <div className='edit-item'>
            <span>{itemData.ProductID}</span>
            <input
              type="number"
              name='width'
              onChange={handleChange}
              value={itemData.width}
            />
            <input
              type="number"
              name='height'
              value={itemData.height}
              onChange={handleChange}
            />
          </div>
          <div className='button-container'>
            <button className='save-button' onClick={handleSave}>Запази</button>
            <button className='cancel-button' onClick={() => setEditMode(false)}>Откажи</button>
          </div>
        </div>
      ) : (
        <div style={{ width: '100%' }}>
          <div className='view-item'>
            <span>{itemData.ProductID}</span>
            <span>{itemData.width}</span>
            <span>{itemData.height}</span>
          </div>
          <div className='button-container'>
            <button className='edit-button' onClick={() => setEditMode(true)}>Промени</button>
            {dataLength > 1 && <button className='delete-button' onClick={handleDelete}>Изтрий</button>}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyItemRender;
