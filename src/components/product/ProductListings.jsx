import React from 'react'
import ProductCard from './ProductCard';
import AddProduct from './AddProduct';

export default function ProductListings(props) {
    return (
        <div className='row row-cols-md-4 row-cols-sm-2 g-3 mt-4'>
            <div>
                <ProductCard/>
            </div>
            <div>
                <ProductCard/>
            </div>
            <div>
                <ProductCard/>
            </div>
            <div>
                <ProductCard/>
            </div>
            <div>
                <ProductCard/>
            </div>

            {/* <div>
               <AddProduct/> 
            </div> */}
        </div>
    )
}
