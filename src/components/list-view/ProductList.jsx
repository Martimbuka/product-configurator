import React, { useState } from 'react';
import ListView from './ListView';
import ListViewHeader from './ListViewHeader';
import MyItemRender from './MyItemRender';
import '../../style/list-view.css';
import '../../style/view-item.css';

const MyHeader = () => {
  return (
    <ListViewHeader style={{ fontSize: '18px' }} className="pl-3 pb-2 pt-2">
      Списък с конфигурируеми продукти
    </ListViewHeader>
  );
};

const ProductList = () => {
  const [data, setData] = useState([ {ProductID: 1, width: 0, height: 0} ]);

  const saveData = (editItem) => {
    setData(data.map(e => (e.ProductID === editItem.ProductID ? { ...editItem, edit: false } : e)));
  };

  const deleteItem = ({ ProductID }) => {
    // let confirmDelete = window.confirm('Сигурни ли сте, че искате да изтриете този продукт?');
    // if (!confirmDelete) {
    //   return;
    // }
    let newData = data.filter(({ ProductID: id }) => id !== ProductID);
    newData = newData.map((item, index) => ({ ...item, ProductID: index + 1 }));
    setData(newData);
  };

  const addProduct = () => {
      const newProduct = {
        ProductID: data.length ? Math.max(...data.map(p => p.ProductID)) + 1 : 1,
        edit: false
      };
      setData([...data, newProduct]);
  };

  const MyCustomItem = (props) => (
    <MyItemRender {...props} saveItem={saveData} deleteItem={deleteItem} dataLength={data.length} />
  );

  return (
    <div>

      <ListView
        data={data}
        item={MyCustomItem}
        style={{ width: '100%', height: 400 }}
        header={MyHeader}
      >

      </ListView>
      {data.length < 7 && <div className="add-product-form">
        <button className='add-button' onClick={addProduct}>Добави</button>
      </div>}
    </div>
  );
};

export default ProductList;
