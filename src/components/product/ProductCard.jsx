import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

export default function ProductCard(props) {
    // TODO... add price, selling units, available units and quantity selector
    const [quantity, setQuantity] = useState(1);

    const handleChange = (e) => {
        e.preventDefault();
        setQuantity(e.target.value);
    }

    const addToCart = () => {
        console.log(quantity);
        console.log(props._id);
        Axios.get(`/cartitem/update?id=${props._id}&qnt=${quantity}`, props.headers)
        .then(() => {
            console.log(`Item ${props._id} added to cart`);
        })
        .catch((err) => {
            console.log('Error adding item to cart');
            console.log(err);
        })
    }

    return (
        <div className='card p-3 card text-center d-flex align-items-center justify-content-center'>
            <img src={props.image} className='card-img-top' style={{height: 200, width:200}}/>
            <div class="card-body">
            <h5 class="card-title">{props.name}</h5>
            <p class="card-text">{props.description}</p>
            <h3 class="card-text">BHD {props.price}</h3>
            <Link to={`/products/${props._id}`} class="btn btn-primary">Product Details</Link><br/>
            <div>
                <Link onClick={addToCart}  class="btn btn-primary my-2">Add to Cart</Link>
                <input type='number' min='1' name='qnt' onChange={handleChange} value={quantity}/>
            </div>
        </div>
        </div>
    )
}
