import React, { useState } from 'react'
import {Link} from 'react-router-dom';

export default function MainNav(props) {


    const [isLoggedIn, setIsLoggedIn] = useState(false);

  
    const login = () => {
        setIsLoggedIn(true);
  };


    const logout = () => {
        setIsLoggedIn(false);
  };


    return (
        <header className="p-3 text-bg-dark">
            <div className="container">
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                    </a>

                    <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                    <li><Link to="/" className="nav-link px-2 text-secondary">Home</Link></li>
                    <li><Link to="/stores" className="nav-link px-2 text-white">Stores</Link></li>
                    <li><Link to="/products" className="nav-link px-2 text-white">Products</Link></li>
                    <li><Link to="/faq" className="nav-link px-2 text-white">FAQs</Link></li>
                    <li><Link to="/dashboard" className="nav-link px-2 text-white">Dashboard</Link></li>
                    </ul>

                    <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
                    <input type="search" className="form-control form-control-dark text-bg-dark" placeholder="Search..." aria-label="Search"/>
                    </form>

                    {/* if user signedin hide */}

                    <div className="text-end">
                    <Link to='/cart' className="btn btn-outline-light me-2"><i class="bi bi-cart"></i></Link>
                    <Link to='/signin' className="btn btn-outline-light me-2">Login</Link>
                    <Link to='/signup' className="btn btn-warning">Sign-up</Link>
                        {props.isAuth ? <Link to='dashboard/logout' className="btn btn-outline-light me-2">Logout</Link> : <div><Link to='/signup' className="btn btn-warning">Sign-up</Link> <Link to='/signin' className="btn btn-outline-light me-2">Login</Link></div>}

                     {/* if user is logging then show */}

                    </div>
                </div>
            </div>
    </header>
    )
}
