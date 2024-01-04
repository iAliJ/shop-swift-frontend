import React from 'react';
import { Link } from 'react-router-dom';
import StoreListings from '../Store/StoreListings';
import ProductListings from '../product/ProductListings';

export default function Hero() {
  return (

    <>


<div className="p-5 text-center bg-image rounded-3" style={{backgroundImage: "url(" + "https://i.imgur.com/fuqTtqF.png" + ")",

    height: 700,
    width: 1350,}}>
    
  <div className="mask" style={{backgroundcolor: `rgba(0, 0, 0, 0.6)`, margin: 400 }}>
    <div className="d-flex justify-content-center align-items-center h-100">
      <div className="text-white">
        <h1 className="mb-3">Welcome to Wholsale App</h1>
        <Link className="btn btn-outline-light btn-lg mt" to='/products' role="button" style={{position: 'center',}}>Browse Products</Link>
      </div>
    </div>
  </div>
</div>

<h2 className='text-center mt-5'>Stores Listing</h2>
<StoreListings/>
<h2 className='text-center mt-5'>Products Listing</h2>
<ProductListings/>

   


    </>

  )
}
