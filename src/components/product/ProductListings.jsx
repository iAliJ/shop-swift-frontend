import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard';
import Axios from 'axios';

export default function ProductListings(props) {
    // Get all products on load
    useEffect(() => {
        getAllProducts();
    }, []);

    const [products, setProducts] = useState([]);

    function getAllProducts() {
        Axios.get('/product/all')
        .then(res => {
            setProducts(res.data.products);
            console.log(products);
        })
    }

    const allProducts = products.map((product, index) => (
        <div key={index}>
            <ProductCard {...product}/>
        </div>
    ));

    return (
        <div className='row row-cols-md-4 row-cols-sm-2 g-3 mt-4'>
            {allProducts}
        </div>
    )
}
