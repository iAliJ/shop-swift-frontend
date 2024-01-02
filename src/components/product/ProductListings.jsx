import React, { useEffect, useState } from 'react'

import ProductCard from './ProductCard';
import Axios from 'axios';
import AddProduct from './AddProduct';

export default function ProductListings(props) {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        getAllProducts();
    }, []);

    function getAllProducts() {
        Axios.get('/product/all')
        .then(res => {
            setProducts(res.data.products);
        })
        .catch(err => {
            console.log('Error reading product data');
            console.log(err);
        });
    }

    const allProducts = products.map((product, index) => (
        <div key={index}>
            <ProductCard {...product} headers={props.headers}/>
        </div>
    ));
    return (
        <div className='row row-cols-md-4 row-cols-sm-2 g-3 mt-4'>
            {allProducts}
        </div>
    )
}
