import React from 'react'
import StoreListings from '../Store/StoreListings'
import ProductListings from '../product/ProductListings'

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
        <a className="btn btn-outline-light btn-lg mt" href="#!" role="button" style={{position: 'center',}}>Browse Products</a>
      </div>
    </div>
  </div>
</div>


<StoreListings/>
<ProductListings/>

   


    </>

  )
}
