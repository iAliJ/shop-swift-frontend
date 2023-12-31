import React from 'react'

export default function StoreCard(props) {
    // TODO... add price, selling units, available units and quantity selector
    return (
        <div className='card'>
            <img src='...' className='card-img-top'/>
            <div class="card-body">
            <h5 class="card-title">{props.name}</h5>
            <p class="card-text">Store description goes here in this paragraph tag.</p>
            <button href="#" class="btn btn-primary">Visit Store</button>
        </div>
        </div>
    )
}
