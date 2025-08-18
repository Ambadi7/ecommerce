
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "slick-carousel/slick/slick.css";
import { AuthContextProvider } from '../context/AuthContext.jsx'
import { SearchContextProvider } from '../context/SearchContext.jsx'
import { CartContextProvider } from '../context/CartContext.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <SearchContextProvider>
      <CartContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>,
      </CartContextProvider>
    </SearchContextProvider>
  </AuthContextProvider>
  
)
