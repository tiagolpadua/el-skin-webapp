import React from 'react';

interface DebugProps {
  children: React.ReactNode;
}

const Debug: React.FC<DebugProps> = ({ children }) => {
  return (
    <div style={{ border: '1px solid red' }}>
      {children}
    </div>
  );
};

export default Debug;
