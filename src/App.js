
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

import Signin from './components/user/Signin';
import Signup from './components/user/Signup';
import {Routes, Route, Link} from "react-router-dom"
import  Axios  from 'axios';
import {jwtDecode} from "jwt-decode"

function App() {
  return (
    <div className="App">
      <h1>Shop Swift App !</h1>
      <div>
        <Signin></Signin>
      </div>
    </div>
  );
}

export default App;
