import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import  Axios  from 'axios';
import {jwtDecode} from "jwt-decode"

// Import components and pages
import Home from './Pages/Home';
import Signin from './components/user/Signin';
import Signup from './components/user/Signup';
import NavBar from './components/layout/NavBar';
import Dashboard from './Pages/dashboard/Dashboard';
import Error from './Pages/Error';
import Profile from './Pages/dashboard/Profile';
import OrdersPage from './Pages/dashboard/OrdersPage';
import SellerStorePage from './Pages/dashboard/store/StoreIndex';
import SellerProductPage from './Pages/dashboard/product/ProductIndex';
import Logout from './components/user/Logout';
import ProductsPage from './components/product/ProductListings';
import ProductDetail from './components/product/ProductDetail';
import StorePage from './components/Store/StoreListings';
import StoreDetail from './components/Store/StoreDetail';

function App() {
  const navigate = useNavigate();
  // Instead of IsAuth use IsLoggedin
  const [isAuth, setIsAuth] = useState(false);
  // Change this to userId it makes more sense
  const [user, setUser] = useState({});
  const [userData, setUserData] = useState({});

  function getHeaders() {
    const headers = {
      headers: {
          "Authorization": "Bearer " + localStorage.getItem('token')
      }
  }
  return headers;
}

  useEffect(() => {
    const user = getUser();
    if(user){
      setIsAuth(true);
      setUser(user);
      getUserData(user.id);
    }
    else{
      localStorage.removeItem('token');
      setIsAuth(false);
      setUser(null);
    }
  }, []);

  /**
   * A function that calls API to register a user in the database
   * @param {The use to be registered} user 
   */
  const registerHandler = (user) => {
    Axios.post('/auth/signup', user)
    .then(res => {
      // if sucsessfull then login
      loginHandler({emailAddress: user.emailAddress, password: user.password})
    })
    .catch(err => {
      console.log(err);
    });
  }

  const logoutHandler = (e) => {
    // e.preventDefault();
    localStorage.removeItem("token");
    setIsAuth(false);
    setUser(null);
    navigate('/');
  }

  /**
   * A function to handle user login by calling the login API and set authentication token
   * @param {user credentials in JSON format} cred 
   */
  const loginHandler = async (cred) => {
    try{
      const res = await Axios.post('/auth/signin', cred);
      let token = res.data.token;
      if(token != null){
        localStorage.setItem('token', token);
        const user = getUser();
        user ? setIsAuth(true) : setIsAuth(false);
        user ? setUser(user) : setUser(user);
        await getUserData(user.id);
        navigate('/dashboard/profile');
      }
  }
    catch(err) {
      console.log("Error signing in");
      console.log(err);
      setIsAuth(false);
      setUser(null);
    }
  }

  /**
   * sets userdata state by fetching the data from the backend
   * @param {userId} userId 
   */
  const getUserData = async (userId) => {
    try{
      const header = getHeaders();
      const res = await Axios.get(`/user/detail?id=${userId}`, getHeaders());
      setUserData(res.data.user);
    }
    catch(err){
      console.log(err);
    }
  }

  // TODO... Move these into helper modules
  const getUser = () => {
    const token = getToken();
    return token ? jwtDecode(token).user : null
  }

  const getToken = () => {
    const token = localStorage.getItem("token");
    return token;
  }

  return (
    <>
    <div className='bg-dark text-light'>
      <div className='container bg-dark'>
        <NavBar></NavBar>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/signup" element={<Signup register={registerHandler}/>}/>
          <Route path="/signin" element={<Signin login={loginHandler}/>}/>
          <Route path="/products" element={<ProductsPage/>}/>
          <Route path="/products/:id" element={<ProductDetail/>}/>
          <Route path="/stores" element={<StorePage/>}/>
          <Route path="/stores/:id" element={<StoreDetail/>}/>
          
          {/* TODO... need to send userData to the parent element only */}
          <Route path="/dashboard" element={isAuth? <Dashboard/> : <Signin login={loginHandler}/>}>
            <Route index element={<Profile userData={userData}/>} />
            <Route path="profile" element={<Profile userData={userData}/>} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="stores" element={<SellerStorePage userData={userData} headers={getHeaders()}/>} />
            <Route path="products" element={<SellerProductPage userData={userData} headers={getHeaders()}/>} />
            <Route path='logout' element={<Logout logout={logoutHandler}/>}/>
          </Route>
          <Route path="*" element={<Error/>}/>
        </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
