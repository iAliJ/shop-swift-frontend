import React from 'react'
import { Link } from 'react-router-dom';

export default function StoreCard(props) {
    // TODO... add price, selling units, available units and quantity selector
    return (
        <div className='card'>
            <img src={props.logo} className='card-img-top' style={{height: 200, width:200}}/>
            <div class="card-body">
            <h5 class="card-title">{props.name}</h5>
            <p class="card-text">{props.description}</p>
            <Link to={`/stores/${props._id}`} class="btn btn-primary">Visit Store</Link>
        </div>
        </div>
    )
}
