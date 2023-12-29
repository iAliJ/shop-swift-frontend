import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from 'react';
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
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState({});

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
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="profile" element={<Profile />} />
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
