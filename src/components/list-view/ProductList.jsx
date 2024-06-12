import React, { useState } from 'react';
import ListView from './ListView';
import ListViewHeader from './ListViewHeader';
import MyItemRender from './MyItemRender';
import '../../style/list-view.css';
import '../../style/view-item.css';

const templateData = [
  {
    ProductID: 1,
    frameSize: {
      width: 100,
      height: 100
    },
    direction: 'Навътре-дясно',
    hinges: 2,
    wing: 'Ляво',
    lock: 'CB',
    sealColor: 'Бяло',
    quantity: 1,
    edit: false
  }
];

const MyHeader = () => {

  return (
    <ListViewHeader
      style={{ fontSize: '18px' }}
      className="pl-3 pb-2 pt-2"
    >
          <div className="header-item">№</div>
          <div className="header-item">Размер на рамката</div>
          <div className="header-item">Посока на отваряне</div>
          <div className="header-item">Брой панти</div>
          <div className="header-item">Крило</div>
          <div className="header-item">Брава с магнитен насрещник</div>
          <div className="header-item">Уплътнение</div>
          <div className="header-item">Брой</div>
    </ListViewHeader>
  );
};

const ProductList = () => {
  const [rows, setRows] = useState(templateData);

  const saveData = (editItem) => {
    setRows(rows.map(e => (e.ProductID === editItem.ProductID ? { ...editItem, edit: false } : e)));
  };

  const deleteItem = ({ ProductID }) => {
    // The sequence of the ProductID remains sequential
    // Example: [1, 2, 3, 4, 5] -> delete 3 -> [1, 2, 3, 4]
    // This is because the ProductID only serves as a unique identifier for the user
    let newData = rows.filter(({ ProductID: id }) => id !== ProductID);
    newData = newData.map((item, index) => ({ ...item, ProductID: index + 1 }));
    setRows(newData);
  };

  const addProduct = () => {
    const newProduct = {
      ProductID: rows.length ? Math.max(...rows.map(p => p.ProductID)) + 1 : 1,
      frameSize: {
        width: 0,
        height: 0
      },
      direction: '',
      hinges: 0,
      wing: '',
      lock: '',
      sealColor: '',
      quantity: 1,
      edit: false
    };
    setRows([...rows, newProduct]);
  };

 

  const MyCustomItem = (props) => (
    <MyItemRender {...props} saveItem={saveData} deleteItem={deleteItem} dataLength={rows.length} />
  );

  return (
    <div>

      <ListView
        rows={rows}
        item={MyCustomItem}
        style={{ width: '100%', height: 400 }}
        header={MyHeader}
        addProduct={addProduct}
      >

      </ListView>
    </div>
  );
};

export default ProductList;
