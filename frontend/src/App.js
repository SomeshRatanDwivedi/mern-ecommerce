
import Home from './pages/HomePage/Home';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import ProductDetails from './pages/productDetailsPage/ProductDetails';
import ProductPage from './pages/productPage/ProductPage';
import LoginSignup from './pages/userLoginSignup/LoginSignup';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { loadUser } from './actions/userAction';
import UserOptions from './components/userOptions/UserOptions';
import Profile from './pages/profile/Profile';
import UpdateProfile from './pages/updateProfile/UpdateProfile';
import UpdatePassword from './pages/updatePassword/UpdatePassword';
import ForgotPassword from './pages/forgotPassword/ForgotPassword';
import ResetPassword from './pages/resetPassword/ResetPassword';
import Cart from './pages/cart/Cart';
import Shipping from './pages/shipping/Shipping';
import ConfirmOrder from './pages/confirmOrder/ConfirmOrder';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Payment from './pages/payment/Payment';
import Success from './pages/paymentSuccess/success';
import ProtectedRoute from './components/protectedRoute';
import Orders from './pages/orders/Orders';
import Math from './test/Math';
import OrderDetails from './pages/orders/OrderDetails';

function App() {


  const dispatch=useDispatch();
  const {isAuthenticated, user, error}=useSelector(state=>state.user);
  const stripeApiKey ="pk_test_51ND4gfSFsrC4Ofl19E674RuIe6u2x0doimFnGrruSyuIPfq7pauQnXIOv29anvD161WmCk5JoVkURzNRyC1p3E3c00PhDd44Z6";

  const stripePromise = loadStripe(stripeApiKey);

  useEffect(()=>{
    if(error){
         toast.error(error)
    }
     dispatch(loadUser())
  }, [dispatch])



  return (
    <BrowserRouter>
      <Header />
      {
        isAuthenticated && <UserOptions user={user}/>
      }
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/product/:id' element={<ProductDetails/>} />
        <Route path='/Products' element={<ProductPage />} />
        <Route path='/login-signup' element={<LoginSignup/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/update-profile' element={<UpdateProfile/>}/>
        <Route path='/update-password' element={<UpdatePassword/>} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/password/reset/:token' element={<ResetPassword />} />
        <Route path='/Cart' element={<Cart />} />
        <Route path='/shipping' element={<Shipping/>}/>
        <Route path='/order/confirm' element={<ConfirmOrder />} />
        <Route path="/process/payment" element={<Elements stripe={stripePromise}><Payment /></Elements>} />
        <Route path="/success" element={<ProtectedRoute Component={Success}/>} />
        <Route path="/orders" element={<ProtectedRoute Component={Orders} />} />
        <Route path='/math' element={<Math/>}/>
        <Route path='/order/:id' element={<OrderDetails/>}/>

      </Routes>
       <Footer />
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
