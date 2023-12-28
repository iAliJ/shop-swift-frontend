import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

import Signin from './components/user/Signin';
import Signup from './components/user/Signup';
import MainNav from './components/layout/MainNav';
import {Routes, Route, Link} from "react-router-dom"
import  Axios  from 'axios';
import {jwtDecode} from "jwt-decode"

function App() {
  return (
    <div className="App">
      <MainNav></MainNav>
      <div>
        <Signin></Signin>
      </div>
    </div>
  );
}

export default App;
