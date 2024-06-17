import React from 'react';
import './../../../style/direction-selector.css';

const DirectionSelector = ({ itemData, setItemData }) => {
  const handleDirectionChange = (type, value) => {
    setItemData(prevState => ({
      ...prevState,
      direction: {
        ...prevState.direction,
        [type]: value
      }
    }));
  };

  return (
    <div className="direction-selector">
      <div className="direction-group">
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
      </div>
    </div>
  );
};

export default DirectionSelector;