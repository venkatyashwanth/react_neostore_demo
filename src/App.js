import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import { MyAppBar } from './components/MyAppBar';
import Login from './components/Login';
import SignUp from './components/Signup';
import Products from './components/Products';
import AddProducts from './components/AddProducts';
import { ProductDetails } from './components/ProductDetails';
import { CartSection } from './components/CartSection';


function App() {
  return (
    <>
    <div className='containerFluid'>
    <Router>
      <MyAppBar/>
      <section>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/products" element={<Products/>}/>
          <Route path="/additems" element={<AddProducts/>}/>
          <Route path="/product-details/:id" element={<ProductDetails/>}/>
          <Route path="/cartsection" element={<CartSection/>}/>
        </Routes>
      </section>
    </Router>
    </div>
    
    </>
  );
}

export default App;
