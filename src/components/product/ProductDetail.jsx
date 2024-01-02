import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Axios from 'axios';

export default function ProductDetail(props) {

    const {id} = useParams();
    const [product, setProduct] = useState({});

    useEffect(() => {
        getProduct(id);
    }, [])

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
                    <div className="thumbnail text-center">
                      <img
                        onClick="change_image(this)"
                        src="https://i.imgur.com/Rx7uKd0.jpg"
                        width="70"
                      />
                      <img
                        onClick="change_image(this)"
                        src="https://i.imgur.com/Dhebu4F.jpg"
                        width="70"
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
                      <span className="text-uppercase text-muted brand">
                       {product.store}
                      </span>
                      <h5 className="text-uppercase">{product.name}</h5>
                      <div className="price d-flex flex-row align-items-center">
                        <span className="act-price">{product.price}</span>
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
                      <button className="btn btn-danger text-uppercase mr-2 px-4">
                        Add to cart
                      </button>
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
