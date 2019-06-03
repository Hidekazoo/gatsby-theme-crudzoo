import * as React from 'react';

const Box: React.FC = ({ children }) => {
  return (
    <div style={{ background: '#6384b3', padding: '30px 10px' }}>
      {children}
    </div>
  );
};

export default Box;
