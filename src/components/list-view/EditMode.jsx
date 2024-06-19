import React from 'react';
import DirectionSelector from './fields/DirectionSelector';
import ColorSelector from './fields/ColorSelector';
import LockSelector from './fields/LockSelector';
import HingesSelector from './fields/HingesSelector';

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

  const validateFrameSize = (e) => {
    const { name, value } = e.target;
    const [, child] = name.split('.');

    if (isNaN(value)) {
      return;
    }

    if ((child === "width" || child === 'height') && value >= 0 && value <= 9999) {
      handleChange(e);
  }

  return;
}

const validateHinges = (e) => {
  const { name, value } = e.target;

  if (isNaN(value)) {
    return;
  }

  if (name === 'hinges' && value >= 2 && value <= 9) {
    handleChange(e);
    return;
  }
}

const validateQuantity = (e) => {
  const { name, value } = e.target;

  if (isNaN(value)) {
    return;
  }

  if (name === 'quantity' && value >= 0 && value <= 9999) {
    handleChange(e);
    return;
  }
}

  const handleChange = (e) => {
    const { name, value } = e.target;
    const [parent, child] = name.split('.');

    let newValue = value;

    if (child) {
      setTempItemData(prevState => ({
        ...prevState,
        [parent]: {
          ...prevState[parent],
          [child]: newValue
        }
      }));
    } else {
      setTempItemData(prevState => ({
        ...prevState,
        [name]: newValue
      }));
    }
  };

  return (
    <div className="edit-popup">
      {/* Implement your form and inputs here using itemData and setItemData */}
      <div className='frameSize-edit'>
        <div className='title'>Размер на рамката</div>
        <div className='content'>
          <div>Широчина</div>
          <div>Височина</div>
          <input
            required
            type='number'
            name='frameSize.width'
            onChange={validateFrameSize}
            placeholder='LB, mm'
            value={tempItemData.frameSize.width === 0 ? '' : tempItemData.frameSize.width}
            className='no-spinners'
          />
          <input
            required
            type='number'
            name='frameSize.height'
            onChange={validateFrameSize}
            placeholder='HB, mm'
            value={tempItemData.frameSize.height === 0 ? '' : tempItemData.frameSize.height}
            className='no-spinners'
          />
        </div>
      </div>
      <div>
        <div className='title'>Посока на отваряне</div>
        <DirectionSelector itemData={tempItemData} setItemData={setTempItemData} />
      </div>
      <div>
        <div className='title'>Брой панти</div>
        <HingesSelector itemData={tempItemData} setItemData={setTempItemData} />
      </div>
      <div>
        <div className='title'>Крило</div>
        <input
          type='text'
          name='wing'
          value={tempItemData.wing}
          onChange={handleChange}
          placeholder='MDF, грундиран' />
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
        <input
          required
          type='number'
          name='quantity'
          value={tempItemData.quantity}
          onChange={validateQuantity}
          className='no-spinners'
        />
      </div>

      <div className='edit-buttons'>
        <button type='button' className='save-button' onClick={handleSave}>Запази</button>
        <button type='button' className='cancel-button' onClick={handleCancel}>Отмени</button>
      </div>
    </div>
  );
};

export default EditMode;