// import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from '../src/Components/Home/Home'
import Login from '../src/Components/Login/Login'
import Main from './Components/AddProductB/main';
import AddProduct from './Components/AddProductB/AddProduct/AddProduct';
import ListProduct from './Components/AddProductB/ListProduct/ListProduct';
import Profile from './Components/Profile/Profile';
import Marketplace from '../src/Components/Marketplace/Marketplace'
import SocialMedia from './Components/SocilaMedia/SocialMedia/SocialMedia';
import Notifications from './Components/Notification/Notification';
import Signup from './Components/Signup/Signup'
import Info from './Components/info/Info'
import CreatePost from './Components/SocilaMedia/Post/CReatePost/CreatePost';
import Forum from './Components/Forums/Forum';
import Cart from './Components/Marketplace/Cart';
import Payment from './Components/Marketplace/Payment';
import Sub from './Components/Marketplace/SubBoxes';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/info' element={<Info />} />
        <Route path='/' element={<Home />} />
        <Route path="/home/business" element={<Main />} />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/listproduct" element={<ListProduct />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/home/marketplace" element={<Marketplace />} />
        <Route path="/home/SocialMedia" element={<SocialMedia />} />
        <Route path="/home/notification" element={<Notifications />} />
        <Route path='/home/create-post' element={<CreatePost />} />
        <Route path="/home/forum" element={<Forum />} />
        <Route path="/home/marketplace/cart" element={<Cart />} />
        <Route path="/home/marketplace/payment" element={<Payment />} />
        <Route path="/home/sub" element={<Sub />} />

      </Routes>
    </div>
  );
}

export default App;
