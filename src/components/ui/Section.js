import React from 'react';
import { Icon } from 'antd';

const Section = ({ title, icon = false, children, right = null, breadcrumbs = [] }) => {
  return (
    <div className="p-3 mx-3 my-3 flex-grow-1">
      <div className="mb-3 d-flex align-items-center">
        <h5 className="d-flex align-items-center font-weight-bold flex-grow-1">
          {typeof icon === 'string' && <Icon type={icon} className="mr-2" />}
          {title}
        </h5>
        {right && React.createElement(right)}
      </div>
      {children}
    </div>
  );
};

export default Section;
