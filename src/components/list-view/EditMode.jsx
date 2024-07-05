import React from 'react';
import DirectionSelector from './fields/DirectionSelector';
import ColorSelector from './fields/ColorSelector';
import LockSelector from './fields/LockSelector';
import HingesSelector from './fields/HingesSelector';
import WingSelector from './fields/WingSelector';

const EditMode = ({ itemData, setItemData, closePopup, saveItem }) => {
  const [tempItemData, setTempItemData] = React.useState(itemData);
  const [errors, setErrors] = React.useState({});

  const requiredFields = ['frameSize.width', 'frameSize.height', 'direction', 'hinges', 'wing', 'lock', 'sealColor', 'quantity'];


  React.useEffect(() => {
    setTempItemData(itemData);
  }, [itemData]);

  const validateForm = () => {
    const newErrors = {};
    requiredFields.forEach(field => {
      const fieldValue = field.split('.').reduce((obj, key) => obj[key], tempItemData);
      if (!fieldValue) {
        newErrors[field] = 'This field is required';
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;
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

  const handleOpacity = () => {
    document.getElementById('container').style.opacity = 1;
  }

  return (
    <div className="edit-popup">
      {handleOpacity()}
      {/* Implement your form and inputs here using itemData and setItemData */}
      <div className='frameSize-edit'>
        <div className='title'>Размер на рамката</div>
        <div className='content'>
          <div>Широчина
            {errors['frameSize.width'] && <span className='error'>*<span className='required-text'>Задължително</span></span>}
          </div>
          <div>Височина
            {errors['frameSize.height'] && <span className='error'>*<span class="required-text">Задължително</span></span>}
          </div>
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
        {/* required */}
        <div className='title'>Посока на отваряне
          {errors['direction'] && <span className='error'>*<span class="required-text">Задължително</span></span>}
        </div>
        <DirectionSelector itemData={tempItemData} setItemData={setTempItemData} />
      </div>
      <div>
        {/* required */}
        <div className='title'>Брой панти
          {errors['hinges'] && <span className='error'>*<span className='required-text'>Задължително</span></span>}

        </div>
        <HingesSelector itemData={tempItemData} setItemData={setTempItemData} />
      </div>
      <div>
        {/* required */}
        <div className='title'>Крило
          {errors['wing'] && <span className='error'>*<span className='required-text'>Задължително</span></span>}

        </div>
        <WingSelector itemData={tempItemData} setItemData={setTempItemData} />
      </div>
      <div>
        {/* required */}
        <div className='title'>Брава с магнитен насрещник
          {errors['lock'] && <span className='error'>*<span className='required-text'>Задължително</span></span>}

        </div>
        <LockSelector itemData={tempItemData} setItemData={setTempItemData} />
      </div>
      <div>
        {/* required */}
        <div className='title'>Уплътнение
          {errors['sealColor'] && <span className='error'>*<span className='required-text'>Задължително</span></span>}
        </div>
        <ColorSelector itemData={tempItemData} setItemData={setTempItemData} />
      </div>
      <div>
        <div className='title'>Брой
          {errors['quantity'] && <span className='error'>*<span className='required-text'>Задължително</span></span>}

        </div>
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