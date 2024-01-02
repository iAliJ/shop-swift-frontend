import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

export default function Cart(props) {
    const [cartItems, setCartItems] = useState([]);
    
    useEffect(() => {
        getCartItems();
    }, [])
    
    function getCartItems() {
        Axios.get('/cart/detail', props.headers)
        .then(res => {
            // get product details
            setCartItems(res.data.cartItems);
        })
        .catch(err => {
            console.log('Error fetchin cart data');
            console.log(err);
        })
    }

    const allCartItems = cartItems.map((item, index) => (
        <div key={index}>
            <div className="cart-item d-md-flex justify-content-between"><span className="remove-item"><i className="bi bi-trash"></i></span>
                    <div className="px-3 my-3">
                        <a className="cart-item-product" href="#">
                            <div className="cart-item-product-thumb"><img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="Product"/></div>
                            <div className="cart-item-product-info">
                                <h4 className="cart-item-product-title">{item.product.name}</h4>
                                {/* <span><strong>Type:</strong> Mirrorless</span><span><strong>Color:</strong> Black</span> */}
                            </div>
                        </a>
                    </div>
                    <div className="px-3 my-3 text-center">
                        <div className="cart-item-label">Quantity</div>
                        <div className="count-input">
                            <input type='number' value={item.quantity}/>
                        </div>
                    </div>
                    <div className="px-3 my-3 text-center">
                        <div className="cart-item-label">Subtotal</div><span className="text-xl font-weight-medium">BHD {item.price}</span>
                    </div>
                    <div className="px-3 my-3 text-center">
                        <div className="cart-item-label">Discount</div><span className="text-xl font-weight-medium">0</span>
                    </div>
                </div>
        </div>
    ));

    return (
        <div>
            <div className="container pb-5 mb-2 my-5">
                {/* Dynamic data */}
                {/* <div className="cart-item d-md-flex justify-content-between"><span className="remove-item"><i className="bi bi-trash"></i></span>
                    <div className="px-3 my-3">
                        <a className="cart-item-product" href="#">
                            <div className="cart-item-product-thumb"><img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="Product"/></div>
                            <div className="cart-item-product-info">
                                <h4 className="cart-item-product-title">Canon EOS M50 Mirrorless Camera</h4><span><strong>Type:</strong> Mirrorless</span><span><strong>Color:</strong> Black</span>
                            </div>
                        </a>
                    </div>
                    <div className="px-3 my-3 text-center">
                        <div className="cart-item-label">Quantity</div>
                        <div className="count-input">
                            <select className="form-control">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                            </select>
                        </div>
                    </div>
                    <div className="px-3 my-3 text-center">
                        <div className="cart-item-label">Subtotal</div><span className="text-xl font-weight-medium">$910.00</span>
                    </div>
                    <div className="px-3 my-3 text-center">
                        <div className="cart-item-label">Discount</div><span className="text-xl font-weight-medium">$35.00</span>
                    </div>
                </div> */}
                {allCartItems}

    <div className="d-sm-flex justify-content-between align-items-center text-center text-sm-left">
        <div className="py-2"><span className="d-inline-block align-middle text-sm font-weight-medium  mr-2">Subtotal: </span><span className="d-inline-block align-middle text-xl font-weight-medium">$188.50</span></div>
    </div>
    <hr className="my-2"/>
    <div className="row pt-3 pb-5 mb-2">
        <div className="col-sm-6 mb-3"><a className="btn btn-style-1 btn-secondary btn-block" href="#"><i className="fe-icon-refresh-ccw"></i>&nbsp;Update Cart</a></div>
        <div className="col-sm-6 mb-3"><a className="btn btn-style-1 btn-primary btn-block" href="checkout-address.html"><i className="fe-icon-credit-card"></i>&nbsp;Checkout</a></div>
    </div>

       
    </div>
        </div>
    )
}
