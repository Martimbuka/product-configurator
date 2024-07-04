import React, { useEffect, useState } from 'react';
import ListView from './ListView';
import ListViewHeader from './ListViewHeader';
import MyItemRender from './MyItemRender';
import EditMode from './EditMode';
import '../../style/list-view.css';
import '../../style/view-item.css';
import Overlay from './Overlay';

// const templateData = [
//   {
//     ProductID: '1',
//     frameSize: {
//       width: 0,
//       height: 0
//     },
//     direction: '',
//     hinges: '',
//     wing: '',
//     lock: '',
//     sealColor: '',
//     quantity: 1,
//     edit: false
//   }
// ];

const MyHeader = () => {

  return (
    <ListViewHeader
      style={{}}
      className=""
    >
      <div className="header-item">№</div>
      <div className="header-item">Размер на рамката</div>
      <div className="header-item">Посока на отваряне</div>
      <div className="header-item">Брой панти</div>
      <div className="header-item">Крило<br/><span className='subtitle'>MDF, грундиран</span></div>
      <div className="header-item">Брава с магнитен насрещник</div>
      <div className="header-item">Уплътнение</div>
      <div className="header-item">Брой</div>
    </ListViewHeader>
  );
};

const ProductList = ({rows, setRows}) => {
  const [currentItem, setCurrentItem] = useState(null);
  const [isEditModeOpen, setIsEditModeOpen] = useState(false);

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
    // check if the only product is the template
    // if it is, the new product will have ProductID 1, instead of NaN
    let isTemplate = rows.length === 1 && rows[0].ProductID === 'Пример';

    const newProduct = {
      ProductID: isTemplate ? 1 : rows.length ? Math.max(...rows.map(p => p.ProductID)) + 1 : 1,
      frameSize: {
        width: 0,
        height: 0
      },
      direction: '',
      hinges: '',
      wing: '',
      lock: '',
      sealColor: '',
      quantity: 1,
      edit: false
    };

    setCurrentItem(newProduct);
    setIsEditModeOpen(true);
    // setRows([...rows, newProduct]);
  };

  const handleSave = (item) => {
    setRows([...rows, item]);
    setIsEditModeOpen(false);
  }

  const handleCancel = () => {
    setIsEditModeOpen(false);
  }

  const handleEdit = (item) => {
    setCurrentItem(item);
    setIsEditModeOpen(true);
  }

  useEffect(() => {
    if (isEditModeOpen) {
      // Prevent scrolling of the background page when the edit mode is open
      document.body.style.overflow = 'hidden';
    } 
    else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isEditModeOpen]);


  /* The purpose of MyCustomItem is to serve as a wrapper or intermediary
   that enhances or modifies the props for MyItemRender. It allows
    for additional logic or data manipulation before rendering MyItemRender */
  const MyCustomItem = (props) => (
    <MyItemRender {...props} saveItem={saveData} deleteItem={deleteItem} dataLength={rows.length} editItem={handleEdit} />
  );

  return (
    <div className='ProductList'>

      <ListView
        rows={rows}
        item={MyCustomItem}
        style={{ width: '100%', height: 400 }}
        header={MyHeader}
        addProduct={addProduct}
      >

      </ListView>
      {isEditModeOpen &&
        <>
          <Overlay closePopup={handleCancel} />
          <EditMode
            itemData={currentItem}
            setItemData={setCurrentItem}
            closePopup={handleCancel}
            saveItem={handleSave}
          />
        </>}
    </div>
  );
};

export default ProductList;
