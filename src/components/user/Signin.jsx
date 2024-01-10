import React, { useState } from 'react'
import {Link} from 'react-router-dom';

export default function Signin(props) {

  const [newUser, setNewUser] = useState({})

  const handleChange = (e) => {
    const user = {...newUser};
    user[e.target.name] = e.target.value;
    setNewUser(user)
  }

  const loginHandler = (e) => {
    e.preventDefault()
    props.login(newUser)
    e.target.reset();
  }

  return (
    <div className='form-signup col-4 mx-auto mt-3 text-center'>
      <h1>Sign In</h1>
      <form onSubmit={loginHandler}>
        <div>
          <label>Email Address</label>
          <input type='email' name='emailAddress' onChange={handleChange} className='form-control'></input>
        </div>
        <div>
          <label>Password</label>
          <input type='password' name='password' onChange={handleChange} className='form-control'></input>
        </div>
        <div>
          <input type='submit' value='Log In' className='btn btn-primary'></input>
        </div>
      </form>
      <Link to='/signup' className="mt-3 btn btn-primary">Register</Link>
    </div>
  )
}
