import { ReactNode, FC } from 'react';
import styled from 'styled-components';

interface DebugProps {
  children: ReactNode;
}

const DebugContainer = styled.div`
  border: 1px solid red;
`;

const Debug: FC<DebugProps> = ({ children }) => {
  return (
    <DebugContainer>
      {children}
    </DebugContainer>
  );
};

export default Debug;
