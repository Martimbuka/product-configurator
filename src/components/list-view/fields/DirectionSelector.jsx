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
        className={`direction-option ${direction === 'Навътре, ляво' ? 'selected' : ''}`}
        onClick={() => handleDirectionChange({target: {value: "Навътре, ляво"}})}>
        <DirectionImg direction="Навътре, ляво" />
      </div>
      <div
        className={`direction-option ${itemData.direction === 'Навътре, дясно' ? 'selected' : ''}`}
        onClick={() => handleDirectionChange({target: {value: "Навътре, дясно"}})}>
        <DirectionImg direction="Навътре, дясно" />
      </div>
      <div
        className={`direction-option ${itemData.direction === 'Навън, ляво' ? 'selected' : ''}`}
        onClick={() => handleDirectionChange({target: {value: "Навън, ляво"}})}>
        <DirectionImg direction="Навън, ляво" />
      </div>
      <div
        className={`direction-option ${itemData.direction === 'Навън, дясно' ? 'selected' : ''}`}
        onClick={() => handleDirectionChange({target: {value: "Навън, дясно"}})}>
        <DirectionImg direction="Навън, дясно" />
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