import React, { useState } from 'react';
import './App.css';
import AppRouter from './routes';
import { SearchContext } from './context/SearchContext';

function App() {
  const [search, setSearch] = useState('');

  return (
    <SearchContext value={{search: search, setSearch: setSearch}}>
      <AppRouter />
    </SearchContext>
  );
}

export default App;
