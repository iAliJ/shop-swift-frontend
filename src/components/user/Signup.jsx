import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Axios from 'axios';



export default function Signup(props) {
  // TODO... handle changes from user role selected item
  const [options, setOptions] = useState([]);
  const [role, setRole] = useState('');
  const [newUser, setNewUser] = useState({})
  console.log(newUser);
  
  const handleChange = (e) => {
    const user = {...newUser};
    user[e.target.name] = e.target.value;
    setNewUser(user);
  }


  const registerHandler = (e) => {
    e.preventDefault();
    props.register(newUser);
  }

  const handleSelectChange = (e) =>{ 
    setRole(e.target.value)
    const user = {...newUser};
    user.role = role;
    setNewUser(user);
  }

  return (
    <div className='form-signup col-4 mx-auto mt-3 text-center'>
      <h1>Sign Up</h1>
      <form onSubmit={registerHandler}>
        <div>
          <label >First Name</label>
          <input type='text' name='firstName' onChange={handleChange} className='form-control'></input>
        </div>
        <div>
          <label>Last Name</label>
          <input type='text' name='lastName' onChange={handleChange} className='form-control'></input>
        </div>
        <div>
          <label for="phoneNumber">Phone Number</label>
          <input type="text" name="phoneNumber" onChange={handleChange} className='form-control'/>
        </div>
        <div>
          <label>Email Address</label>
          <input type='email' name='emailAddress' onChange={handleChange} className='form-control'></input>
        </div>
        <div>
          <label>Password</label>
          <input type='password' name='password' onChange={handleChange} className='form-control'></input>
        </div>
        <div>
          <label>User Role</label>
          <select name="userRole"  onChange={handleSelectChange} className='form-control'>
            <option value="">Select Role</option>
            <option value="buyer">buyer</option>
            <option value="seller">seller</option>
          </select>

            </div>
       
        <div>
            {/* I dont think this is needed */}
          <label>Company Name</label>
          <input type="text" name="companyName"  onChange={handleChange} className='form-control' />
        </div>
        <div>
          <input type='submit' value='Register' className='btn btn-primary'></input>
        </div>
      </form>
    </div>
  )
}