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
    console.log(user)
    if(user){
      setIsAuth(true);
      setUser(user);
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
      // When sucsessfull redirect to dashboard page
      navigate('/dashboard');
    })
    .catch(err => {
      console.log(err);
    });
  }

  /**
   * A function to handle user login by calling the login API and set authentication token
   * @param {user credentials in JSON format} cred 
   */
  const loginHandler = (cred) => {
    Axios.post('/auth/signin', cred)
    .then(res => {
      let token = res.data.token;
      if(token != null){
        localStorage.setItem('token', token);
        const user = getUser();
        user ? setIsAuth(true) : setIsAuth(false);
        user ? setUser(user) : setUser(user);
        getUserData(user.id);
        navigate('/dashboard');
      }
    })
    .catch(err => {
      console.log("Error signing in");
      console.log(err);
      setIsAuth(false);
      setUser(null);
    })
  }

  /**
   * sets userdata state by fetching the data from the backend
   * @param {userId} userId 
   */
  const getUserData = (userId) => {
    const header = getHeaders();
    Axios.get(`/user/detail?id=${userId}`, getHeaders())
    .then(res => {
      setUserData(res.data.user);
    })
    .catch(err => {
      console.log(err);
    })
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
          <Route path="/dashboard" element={isAuth? <Dashboard userData={userData}/> : <Signin login={loginHandler}/>}>
            <Route path="profile" element={<Profile userData={userData}/>} />
            <Route path="orders" element={<OrdersPage />} />
          </Route>
          <Route path="*" element={<Error/>}/>
        </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
