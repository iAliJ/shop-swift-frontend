import React from 'react'

export default function ProductCard(props) {
    // TODO... add price, selling units, available units and quantity selector
    return (
        <div className='card'>
            <img src='...' className='card-img-top'/>
            <div class="card-body">
            <h5 class="card-title">Product Name</h5>
            <p class="card-text">Product description goes here in this paragraph tag.</p>
            <button href="#" class="btn btn-primary">Add to cart</button>
        </div>
        </div>
    )
}
