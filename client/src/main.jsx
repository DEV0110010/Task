import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { store, persistor } from './redux/store.js'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import ThemeProvider from './components/ThemeProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <BrowserRouter>
   <PersistGate persistor={persistor}>
   <Provider store={store}>
    <ThemeProvider>
    <App />
    </ThemeProvider>
    </Provider>
    </PersistGate>
    </BrowserRouter>
  </StrictMode>,
)
