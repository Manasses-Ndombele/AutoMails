import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import Home from './routes/Home'
import Thanks from './routes/Thanks'
import Help from './routes/Help'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={ <Home /> } />
      <Route path='/thanks' element={ <Thanks /> } />
      <Route path='/help' element={ <Help /> } />
    </Routes>
  </BrowserRouter>
)
