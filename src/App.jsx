import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Components/Header/Header'
import { Route, Routes } from 'react-router-dom';
import Home from './Components/Home/Home';
import Cart from './Components/Cart/Cart';
function App() {


  return (
    <>
    <Header />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/cart' element={<Cart />} />
    </Routes>
    </>
  )
}

export default App
