import React from 'react'
import { Link } from 'react-router-dom';

export default function ProductCard(props) {
    // TODO... add price, selling units, available units and quantity selector
    return (
        <div className='card'>
            <img src='...' className='card-img-top'/>
            <div class="card-body">
            <h5 class="card-title">{props.name}</h5>
            <p class="card-text">{props.description}</p>
            <button href="#" class="btn btn-primary">Add to cart</button>
            <Link to={`/products/${props._id}`} class="btn btn-primary">View Product</Link>
        </div>
        </div>
    )
}
