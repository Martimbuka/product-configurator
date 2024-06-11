import React from 'react';

const ListViewHeader = ({ style, className, children }) => {
  return (
    <div style={style} className={`list-view-header ${className}`}>
      {children}
        <div className="header-item"></div>
    </div>
  );
};

export default ListViewHeader;
