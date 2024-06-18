// src/components/list-view/EditPopup.jsx
import React from 'react';
import DirectionSelector from './fields/DirectionSelector';
import ColorSelector from './fields/ColorSelector';
import LockSelector from './fields/LockSelector';

const EditMode = ({ itemData, setItemData, closePopup, saveItem }) => {
  const [tempItemData, setTempItemData] = React.useState(itemData);

  React.useEffect(() => {
    setTempItemData(itemData);
  }, [itemData]);

  const handleSave = () => {
    setItemData(tempItemData);
    saveItem(tempItemData);
    closePopup();
  };

  const handleCancel = () => {
    setTempItemData(itemData);
    closePopup();
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    const [parent, child] = name.split('.');

    if (child) {
      setTempItemData(prevState => ({
        ...prevState,
        [parent]: {
          ...prevState[parent],
          [child]: value
        }
      }));
    } else {
      setTempItemData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  return (
    <div className="edit-popup">
      {/* Implement your form and inputs here using itemData and setItemData */}
      <div className='frameSize-edit'>
        <div className='title'>Размер на рамката</div>
        <div className='content'>
          <div>Ширина</div>
          <div>Височина</div>
          <input required type='number' name='frameSize.width' onChange={handleChange} placeholder='LB, mm' />
          <input required type='number' name='frameSize.height' onChange={handleChange} placeholder='HB, mm' />
        </div>
      </div>
      <div>
        <div className='title'>Посока на отваряне</div>
        <DirectionSelector itemData={tempItemData} setItemData={setTempItemData} />
      </div>
      <div>
        <div className='title'>Брой панти</div>
        {/* It should accept values only from 2 to 10 */}
        <input required type='number' name='hinges' value={itemData.hinges} onChange={handleChange} />
      </div>
      <div>
        <div className='title'>Крило</div>
        <input required type='text' name='wing' value={itemData.wing} onChange={handleChange} />
      </div>
      <div>
        <div className='title'>Брава с магнитен насрещник</div>
        <LockSelector itemData={tempItemData} setItemData={setTempItemData} />
      </div>
      <div>
        <div className='title'>Уплътнение</div>
        <ColorSelector itemData={tempItemData} setItemData={setTempItemData} />
      </div>
      <div>
        <div className='title'>Брой</div>
        <input required type='number' name='quantity' value={itemData.quantity} onChange={handleChange} />
      </div>

      <div className='edit-buttons'>
        <button type='button' className='save-button' onClick={handleSave}>Запази</button>
        <button type='button' className='cancel-button' onClick={handleCancel}>Отмени</button>
      </div>
    </div>
  );
};

export default EditMode;