import React from 'react';
import {Link} from 'react-router-dom';

export default function (props) {
  return (
    <div>
        <div className="vh-100 d-flex flex-column flex-shrink-0 p-3">
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                    <Link to='profile' className="nav-link btn-default">
                    Profile
                    </Link>
                </li>
                <li>
                    <Link to='orders' className="nav-link text-white">
                    Orders
                    </Link>
                </li>
                <li>
                    <Link to='stores' className="nav-link text-white">
                    Manage Stores
                    </Link>
                </li>
                <li>
                    <Link to='products' className="nav-link text-white">
                    Manage Products
                    </Link>
                </li>
                <li>
                    <Link to='logout' className="nav-link text-white">
                    Logout
                    </Link>
                </li>
            </ul>
            <div>
            </div>
        </div>
    </div>
    )
}
