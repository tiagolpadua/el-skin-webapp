import './App.css';
import { CartProvider } from './context/CartContext';
import { SearchProvider } from './context/SearchContext';
import AppRouter from './routes';

function App() {
  return (
    <CartProvider>
      <SearchProvider>
        <AppRouter />
      </SearchProvider>
    </CartProvider>
  );
}

export default App;
