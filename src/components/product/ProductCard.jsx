import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard(props) {
    // TODO... add price, selling units, available units and quantity selector
    return (
        <div className='card'>
            <img src='...' className='card-img-top'/>
            <div class="card-body">
            <h5 class="card-title">{props.name}</h5>
            <p class="card-text">Product description goes here in this paragraph tag.</p>
            <Link to={`/products/${props._id}`} class="btn btn-primary">Product Details</Link>
        </div>
        </div>
    )
}
