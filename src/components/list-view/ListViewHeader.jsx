import React from 'react';

const ListViewHeader = ({ style, className, children }) => {
  return (
    <div style={style} className={`list-view-header ${className}`} id='list-view-header'>
      {children}
    </div>
  );
};

export default ListViewHeader;
