import React, { useEffect, useState } from 'react'
import StoreCard from './StoreCard';
import Axios from 'axios';

export default function StoreListings(props) {
    const [stores, setStores] = useState([]);

    useEffect(() => {
        getAllStores();
    }, []);

    function getAllStores() {
        Axios.get('/store/all')
        .then(res => {
            setStores(res.data.stores);
        })
        .catch(err => {
            console.log('Error reading store data');
            console.log(err);
        });
    }

    const allStores = stores.map((store, index) => (
        <div className="mb-5" key={index}>
            <StoreCard {...store} headers={props.headers}/>
        </div>
    ));

    return (
        <div className='row row-cols-md-4 row-cols-sm-2 g-3 mt-4'>
            {allStores}
        </div>
    )
}
