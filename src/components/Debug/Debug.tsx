import React from 'react';
import styled from 'styled-components';

interface DebugProps {
  children: React.ReactNode;
}

const DebugContainer = styled.div`
  border: 1px solid red;
`;

const Debug: React.FC<DebugProps> = ({ children }) => {
  return (
    <DebugContainer>
      {children}
    </DebugContainer>
  );
};

export default Debug;
