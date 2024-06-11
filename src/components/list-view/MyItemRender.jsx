import React, { useState } from 'react';
import { ReactComponent as EditIcon } from '../../assets/edit.svg';
import { ReactComponent as SaveIcon } from '../../assets/save.svg';
import { ReactComponent as CancelIcon } from '../../assets/cancel.svg';
import { confirmAlert } from 'react-confirm-alert';

const MyItemRender = ({ dataItem, saveItem, deleteItem, dataLength }) => {
  const [editMode, setEditMode] = useState(dataItem.edit || false);
  const [itemData, setItemData] = useState({ ...dataItem, width: dataItem.width, height: dataItem.height });

  const handleSave = () => {
    saveItem(itemData);
    setEditMode(false);
  };

  const handleDelete = () => {
    confirmAlert({
      title: 'Изтриване на продукт',
      message: 'Сигурни ли сте, че искате да изтриете този продукт?',
      buttons: [
        {
          label: 'Да',
          onClick: () => {
            deleteItem(itemData);
          }
        },
        {
          label: 'Не',
          onClick: () => {}
        }
      ]
    });
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
            <button type='button' className='save-button' onClick={handleSave}><SaveIcon /></button>
            <button type='button' className='cancel-button' onClick={() => setEditMode(false)}><CancelIcon /></button>
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
            <button type='button' className='edit-button' onClick={() => setEditMode(true)}><EditIcon /></button>
            {dataLength > 1 && <button type='button' className='delete-button' onClick={handleDelete} style={ {fontWeight: 'bold'}}>X</button>}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyItemRender;
