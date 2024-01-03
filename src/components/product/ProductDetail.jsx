import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Axios from 'axios';

export default function ProductDetail(props) {

    const {id} = useParams();
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);

    const handleChange = (e) => {
        e.preventDefault();
        setQuantity(e.target.value);
    }

    useEffect(() => {
        getProduct(id);
    }, [])

    const addToCart = () => {
      console.log(id)
      Axios.get(`/cartitem/update?id=${id}&qnt=${quantity}`, props.headers)
      .then(() => {
          console.log(`Item ${props._id} added to cart`);
      })
      .catch((err) => {
          console.log('Error adding item to cart');
          console.log(err);
      })
  }

    function getProduct(productId){
        Axios.get(`/product/detail?id=${productId}`)
        .then(res => {
            setProduct(res.data.product);
        })
        .catch(err => {
            console.log('error getting product data');
            console.log(err);
        })
    }
  // A single product page.
  // Props will recieve product object that contains all the details
  return (
    <>
      <div className="container mt-5 mb-5">
        <div className="row d-flex justify-content-center">
          <div className="col-md-10">
            <div className="card">
              <div className="row">
                <div className="col-md-6">
                  <div className="images p-3">
                    <div className="text-center p-4">
                      <img
                        id="main-image"
                        src={product.image}
                        width="250"
                        alt="Product"
                      />
                    </div>                    
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="product p-4">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center"></div>
                    </div>
                    <div className="mt-4 mb-3">
                      <h5 className="text-uppercase">{product.name}</h5>
                      <div className="price d-flex flex-row align-items-center">
                        <h3 className="act-price">BHD {product.price}</h3>
                        {/* <div className="ml-2">
                          <small className="dis-price">$59</small>
                          <span>40% OFF</span>
                        </div> */}
                      </div>
                    </div>
                    <p className="about">
                    {product.description}
                    </p>

                    <div className="cart mt-4 align-items-center">
                    <Link onClick={addToCart}  class="btn btn-primary my-2">Add to Cart</Link>
                    <input type='number' min='1' name='qnt' onChange={handleChange} value={quantity}/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
