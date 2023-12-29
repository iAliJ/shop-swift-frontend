import React, { useState } from 'react'

export default function Signup(props) {

  // TODO... handle changes from user role selected item
  const [newUser, setNewUser] = useState({})

  const handleChange = (e) => {
    const user = {...newUser};
    user[e.target.name] = e.target.value;
    setNewUser(user);
  }

  const registerHandler = (e) => {
    e.preventDefault();
    props.register(newUser);
  }

  return (
    <div className='form-signup col-4 mx-auto mt-3 text-center'>
      <h1>Sign Up</h1>
      <form onSubmit={registerHandler}>
        <div >
          <label >First Name</label>
          <input type='text' name='firstName' onChange={handleChange} className='form-control'></input>
        </div>

        <div>
          <label>Last Name</label>
          <input type='text' name='lastName' onChange={handleChange} className='form-control'></input>
        </div>

        <label>
          Phone Number
          <input type="text" name="phoneNumber" onChange={handleChange} className='form-control'/>
        </label>

        <div>
          <label>Email Address</label>
          <input type='email' name='emailAddress' onChange={handleChange} className='form-control'></input>
        </div>

        <div>
          <label>Password</label>
          <input type='password' name='password' onChange={handleChange} className='form-control'></input>
        </div>

          <div>
        <label>
          User Role
          <select name="userRole"  onChange={handleChange} className='form-control'>
            <option value="">Select Role</option>
            <option value="Buyer">Buyer</option>
            <option value="Seller">Seller</option>
          </select>
          </label>
          </div>

          <div>
            {/* I dont think this is needed */}
        <label>
          Company Name
          <input type="text" name="companyName"  onChange={handleChange} className='form-control' />
        </label>
        </div>

        <div>
          <input type='submit' value='Register' className='btn btn-primary'></input>
        </div>
        
      </form>
    </div>
  )
}
