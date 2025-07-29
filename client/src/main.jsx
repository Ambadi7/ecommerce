
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { AuthContextProvider } from '../context/AuthContext.jsx'
import "slick-carousel/slick/slick.css";
import { SearchContextProvider } from '../context/SearchContext.jsx'

createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <SearchContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    </SearchContextProvider>
  </AuthContextProvider>
  
)
