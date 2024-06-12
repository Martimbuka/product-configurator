import React, { useState } from 'react';
import LockImg from './LockImg';
import ButtonImg from './ButtonImg';
import { confirmAlert } from 'react-confirm-alert';
import Field from './Field';

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
              value={itemData.frameSize.width}
            />
            <input
              type="number"
              name='height'
              value={itemData.frameSize.height}
              onChange={handleChange}
            />
          </div>
          <div className='button-container'>
            <button type='button' className='save-button' onClick={handleSave}><ButtonImg type='save' /></button>
            <button type='button' className='cancel-button' onClick={() => setEditMode(false)}><ButtonImg type='cancel' /></button>
          </div>
        </div>
      ) : (
        <div style={{ width: '100%' }}>
          <div className='view-item'>
            <Field>{itemData.ProductID}</Field>
            <Field className='item frameSize'>
              <span>Широчина - {itemData.frameSize.width}<span className='unit'>mm</span></span>
              <span>Височина - {itemData.frameSize.height}<span className='unit'>mm</span></span>
            </Field>
            <Field>
              <span>{itemData.direction.inOut}</span>
              <span>{itemData.direction.leftRight}</span>
              </Field>
            <Field >{itemData.hinges}</Field>
            <Field>{itemData.wing}</Field>
            <Field>
              <span>{itemData.lock}<LockImg lock={itemData.lock}/></span>
              </Field>
            <Field>{itemData.sealColor}</Field>
            <Field>{itemData.quantity}</Field>
          </div>
          <div className='button-container'>
            <button type='button' className='view-button' onClick={() => setEditMode(true)}><ButtonImg type='view' /></button>
            <button type='button' className='edit-button' onClick={() => setEditMode(true)}><ButtonImg type='edit' /></button>
            {dataLength > 1 && <button type='button' className='delete-button' onClick={handleDelete} style={ {fontWeight: 'bold'}}>X</button>}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyItemRender;
