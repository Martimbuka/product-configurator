import React from 'react';

const ListView = ({ data, item: ItemComponent, style, header: HeaderComponent }) => {
  return (
    <div style={style} className="list-view-container">
      {HeaderComponent && <HeaderComponent />}
      <ul>
        {data.map(item => (
          <li key={item.ProductID} className="list-view-item">
            <ItemComponent dataItem={item} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListView;
