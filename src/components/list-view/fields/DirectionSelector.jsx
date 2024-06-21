import React, {useState} from 'react';
import './../../../style/direction-selector.css';
import DirectionImg from './DirectionImg';

const DirectionSelector = ({ itemData, setItemData }) => {
  const [direction, setDirection] = useState(itemData.direction || '');

  const handleDirectionChange = (e) => {
    const { value } = e.target;
    setDirection(value);
    setItemData(prevState => ({
      ...prevState,
      direction: value
    }));
  }

  return (
    <div className="direction-selector">
      <div
        className={`direction-option ${direction === 'inside-left' ? 'selected' : ''}`}
        onClick={() => handleDirectionChange({target: {value: "inside-left"}})}>
        <DirectionImg direction="inside-left" />
      </div>
      <div
        className={`direction-option ${itemData.direction === 'inside-right' ? 'selected' : ''}`}
        onClick={() => handleDirectionChange({target: {value: "inside-right"}})}>
        <DirectionImg direction="inside-right" />
      </div>
      <div
        className={`direction-option ${itemData.direction === 'outside-left' ? 'selected' : ''}`}
        onClick={() => handleDirectionChange({target: {value: "outside-left"}})}>
        <DirectionImg direction="outside-left" />
      </div>
      <div
        className={`direction-option ${itemData.direction === 'outside-right' ? 'selected' : ''}`}
        onClick={() => handleDirectionChange({target: {value: "outside-right"}})}>
        <DirectionImg direction="outside-right" />
      </div>



      {/* <div className="direction-group">
        <div
          className={`direction-option ${itemData.direction.inOut === 'Навътре' ? 'selected' : ''}`}
          onClick={() => handleDirectionChange('inOut', 'Навътре')}
        >
          Навътре
        </div>
        <div
          className={`direction-option ${itemData.direction.inOut === 'Навън' ? 'selected' : ''}`}
          onClick={() => handleDirectionChange('inOut', 'Навън')}
        >
          Навън
        </div>
      </div>
      <div className="direction-group">
        <div
          className={`direction-option ${itemData.direction.leftRight === 'Дясна' ? 'selected' : ''}`}
          onClick={() => handleDirectionChange('leftRight', 'Дясна')}
        >
          Дясна
        </div>
        <div
          className={`direction-option ${itemData.direction.leftRight === 'Лява' ? 'selected' : ''}`}
          onClick={() => handleDirectionChange('leftRight', 'Лява')}
        >
          Лява
        </div>
      </div> */}
    </div>
  );
};

export default DirectionSelector;