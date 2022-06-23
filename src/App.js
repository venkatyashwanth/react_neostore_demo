import './App.css';
import {BrowserRouter as Router,Routes,Route, Navigate} from 'react-router-dom';
import { MyAppBar } from './components/MyAppBar';
import Login from './components/Login';
import SignUp from './components/Signup';
import Products from './components/Products';
import AddProducts from './components/AddProducts';
import { ProductDetails } from './components/ProductDetails';
import { CartSection } from './components/CartSection';
import Edit from './components/Edit';
import { isAdmin, isLoggedIn } from './service/Auth';
import Notfound from './components/Notfound';

function PrivateRoute({children}){
  const auth = isLoggedIn();
  return auth? children: <Navigate to="/"/>
}

function AdminPrivateRoute({children}){
  const auth = isLoggedIn();
  const admin = isAdmin();
  return auth && admin ? children : <Navigate to="/"/>
}


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
          <Route path="/products" element={<PrivateRoute>
            <Products/>
          </PrivateRoute>}/>
          <Route path="/additems" element={<AdminPrivateRoute>
            <AddProducts/>
          </AdminPrivateRoute>}/>
          <Route path="/product-details/:id" element={<PrivateRoute>
            <ProductDetails/>
          </PrivateRoute>}/>
          <Route path="/edit/:id" element={<AdminPrivateRoute>
            <Edit/>
          </AdminPrivateRoute>}></Route>
          <Route path="/cartsection" element={<PrivateRoute>
            <CartSection/>
          </PrivateRoute>}/>
          <Route path="*" element={<Notfound/>}></Route>
        </Routes>
      </section>
    </Router>
    </div>
    
    </>
  );
}

export default App;
