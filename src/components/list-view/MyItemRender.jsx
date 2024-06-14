import React, { useState } from 'react';
import LockImg from './LockImg';
import ButtonImg from './ButtonImg';
import { confirmAlert } from 'react-confirm-alert';
import Field from './fields/Field';
import EditMode from './EditMode';
import Overlay from './Overlay';

const MyItemRender = ({ dataItem, saveItem, deleteItem, dataLength }) => {
  const [editMode, setEditMode] = useState(dataItem.edit || false);
  const [itemData, setItemData] = useState({
    ...dataItem,
    width: dataItem.frameSize.width,
    height: dataItem.frameSize.height,
    inOut: dataItem.direction.inOut,
    leftRight: dataItem.direction.leftRight,
    hinges: dataItem.hinges,
    wing: dataItem.wing,
    lock: dataItem.lock,
    sealColor: dataItem.sealColor,
    quantity: dataItem.quantity
  });

  const handleClose = () => setEditMode(false);

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
          onClick: () => { }
        }
      ]
    });
  };

  return (
    <div className={`list-view-item ${editMode ? 'editing' : ''}`} style={{ width: '100%' }}>
      {editMode ? (
        <>
          <Overlay closePopup={handleClose} />
          <EditMode
            itemData={itemData}
            setItemData={setItemData}
            closePopup={handleClose}
            saveItem={saveItem}
          />
        </>
      ) : (
        <div style={{ width: '100%' }}>
          <div className='view-item'>
            <Field>{itemData.ProductID}</Field>
            <Field className='item frameSize'>
              <span>Широчина {itemData.frameSize.width}<span className='unit'>mm</span></span>
              <span>Височина {itemData.frameSize.height}<span className='unit'>mm</span></span>
            </Field>
            <Field>
              <span>{itemData.direction.inOut}</span>
              <span>{itemData.direction.leftRight}</span>
            </Field>
            <Field >{itemData.hinges}</Field>
            <Field>{itemData.wing}</Field>
            <Field>
              <span>{itemData.lock}<LockImg lock={itemData.lock} /></span>
            </Field>
            <Field>{itemData.sealColor}</Field>
            <Field>{itemData.quantity}</Field>
          </div>
          <div className='button-container'>
            <button type='button' className='view-button' onClick={() => setEditMode(true)}><ButtonImg type='view' /></button>
            <button type='button' className='edit-button' onClick={() => setEditMode(true)}><ButtonImg type='edit' /></button>
            {dataLength > 1 && <button type='button' className='delete-button' onClick={handleDelete} style={{ fontWeight: 'bold' }}>X</button>}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyItemRender;
