import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';


export default function Cart(props) {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [cartData, setCartData] = useState({});
    
    useEffect(() => {
        getCartItems();
        getCartData();
    }, [])

    function getCartData() {
        Axios.get(`/cart/detail`, props.headers)
        .then(res => {
            setCartData(res.data.cart);
            setTotalPrice(res.data.cart.totalPrice)
        })
    }
    
    function getCartItems() {
        Axios.get('/cart/items', props.headers)
        .then(res => {
            // get product details
            setCartItems(res.data.cartItems);
        })
        .catch(err => {
            console.log('Error fetchin cart data');
            console.log(err);
        })
    }

    function createOrderItems(item) {
        // for each cart item create order item
        Axios.post('/orderitem/create', {
            "user": props.userData._id,
            "quantity": item.quantity,
            "product": item.product,
            "store": item.product.store
        }, props.headers);
    }

    const checkout = (e) => {
        e.preventDefault();
        console.log('checking out ' + cartData._id)
        cartItems.forEach((item) => {
            createOrderItems(item);
        })

        Axios.get(`/order/create?cart=${cartData._id}`, props.headers)
        .then((cart) => {
            // empty cart
            // redirect to orders page
            console.log(cart);
            navigate('/dashboard/orders');
        })
    }

    function deleteCartItem(id) {
        console.log('deleting item ' + id);
        Axios.get(`/cartitem/delete?id=${id}`, props.headers)
        .then(() => {
            getCartItems();
            getCartData();
        })
    }

    const allCartItems = cartItems.map((item, index) => (
        <div key={index}>
            <div className="cart-item d-md-flex justify-content-between"><span className="remove-item"><i onClick={() => deleteCartItem(item._id)} className="bi bi-trash"></i></span>
                    <div className="px-3 my-3">
                        <a className="cart-item-product" href="#">
                            <div className="cart-item-product-thumb"><img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="Product"/></div>
                            <div className="cart-item-product-info">
                                <h4 className="cart-item-product-title">{item.product.name}</h4>
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
                {allCartItems}

    <div className="d-sm-flex justify-content-between align-items-center text-center text-sm-left">
        <div className="py-2"><span className="d-inline-block align-middle text-sm font-weight-medium  mr-2">Subtotal: </span><span className="d-inline-block align-middle text-xl font-weight-medium">BHD {totalPrice}</span></div>
    </div>
    <hr className="my-2"/>
    <div className="row pt-3 pb-5 mb-2">
        <div className="col-sm-6 mb-3"><div className="btn btn-style-1 btn-primary btn-block" onClick={checkout}><i class="bi bi-credit-card"></i> Checkout</div></div>
    </div>
    </div>
        </div>
    )
}
