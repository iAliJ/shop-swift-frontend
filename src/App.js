import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import {Routes, Route, Link } from "react-router-dom"
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
  return (
    <>
    <div className='bg-dark text-light'>
      <div className='container bg-dark'>
        <NavBar></NavBar>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/signin" element={<Signin/>}/>
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
