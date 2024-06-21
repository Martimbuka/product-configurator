import React, { useState } from 'react';
import LockImg from './LockImg';
import DirectionImg from './fields/DirectionImg';
import { confirmAlert } from 'react-confirm-alert';
import Field from './fields/Field';
import EditMode from './EditMode';
import Overlay from './Overlay';
import '../../style/buttons.css';
import Icon from '@mdi/react';
import { mdiDelete, mdiDeleteEmpty, mdiFileEdit, mdiPencil } from '@mdi/js';

const MyItemRender = ({ dataItem, saveItem, deleteItem, dataLength }) => {
  const [editMode, setEditMode] = useState(dataItem.edit || false);
  const [itemData, setItemData] = useState({
    ...dataItem,
    width: dataItem.frameSize.width,
    height: dataItem.frameSize.height,
    direction: dataItem.direction,
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
              <DirectionImg direction={itemData.direction} />
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
            {/* <button type='button' className='view-button' onClick={() => setEditMode(true)}><ButtonImg type='view' /></button> */}
            <button type='button' className='btn btn-edit' onClick={() => setEditMode(true)}>
              <Icon
                path={mdiFileEdit}
                size={1}
                color="blue"
                className='mdi-edit'
                title={'Редактиране'}
              />
              <Icon
                path={mdiPencil}
                size={1}
                color="blue"
                className='mdi-pencil'
                title={'Редактиране'}
              />
            </button>
            {dataLength > 1 && <button type='button' className='btn btn-delete' onClick={handleDelete}>
              <Icon
                path={mdiDelete}
                size={1}
                color="red"
                className='mdi-delete'
                title={'Изтриване'}
              />
              <Icon
                path={mdiDeleteEmpty}
                size={1}
                color="red"
                className='mdi-delete-empty'
                title={'Изтриване'}
              />
            </button>}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyItemRender;
