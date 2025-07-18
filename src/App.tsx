import React, { createContext } from 'react';
import './App.css';
import AppRouter from './routes';

export const BuscaContext = createContext('');

function App() {
  return (
    <BuscaContext.Provider value={'foo'}>
      <AppRouter />
    </BuscaContext.Provider>
  );
}

export default App;
