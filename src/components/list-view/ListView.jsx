import React from 'react';
import Icon from '@mdi/react';
import { mdiArrowLeftRight } from '@mdi/js';

const ListView = ({ rows, item: ItemComponent, style, header: HeaderComponent, addProduct }) => { 

  return (
    <div style={style} className="list-view-container">
      {HeaderComponent && <HeaderComponent />}
      <ul>
        <Icon path={mdiArrowLeftRight} size={20} className='sidebar-arrow'/>
        {rows.map(item => (
          <li key={item.ProductID} className="list-view-item">
            <ItemComponent dataItem={item} />
          </li>
        ))}
      </ul>
      {rows.length < 7 && <div className="add-product-form">
        <button type='button' className='add-button' onClick={addProduct}>Добави</button>
      </div>}
    </div>
  );
};

export default ListView;
