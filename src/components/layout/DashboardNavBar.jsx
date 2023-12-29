import React from 'react';
import {Link} from 'react-router-dom';

export default function () {
  return (
    <div>
        <div class="vh-100 d-flex flex-column flex-shrink-0 p-3">
            <ul class="nav nav-pills flex-column mb-auto">
                <li class="nav-item">
                    <Link to='profile' class="nav-link active" aria-current="page">
                    Profile
                    </Link>
                </li>
                <li>
                    <Link to='orders' class="nav-link text-white">
                    Orders
                    </Link>
                </li>
                <li>
                    <Link to='stores' class="nav-link text-white">
                    Manage Stores
                    </Link>
                </li>
                <li>
                    <Link to='products' class="nav-link text-white">
                    Manage Products
                    </Link>
                </li>
                <li>
                    <Link to='logout' class="nav-link text-white">
                    Logout
                    </Link>
                </li>
            </ul>
            <hr/>
            <div>
            </div>
        </div>
    </div>
    )
}
