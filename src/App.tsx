import './App.css';
import { SearchProvider } from './context/SearchContext';
import AppRouter from './routes';

function App() {
  return (
    <SearchProvider>
      <AppRouter />
    </SearchProvider>
  );
}

export default App;
