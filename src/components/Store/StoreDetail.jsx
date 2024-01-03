import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Axios from 'axios';
import ProductCard from '../product/ProductCard';

export default function StoreDetail(props) {
    const {id} = useParams();
    const [store, setStore] = useState({});
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getStore(id);
        getAllStoreProducts();
    }, [])

    function getStore(storeId){
        Axios.get(`/store/detail?id=${storeId}`)
        .then(res => {
            setStore(res.data.store);
        })
        .catch(err => {
            console.log('error getting store data');
            console.log(err);
        })
    }

    function getAllStoreProducts() {
        Axios.get(`/product/bystore?id=${id}`)
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

    // A single product page. 
    // Props will recieve product object that contains all the details
    return (
    <>
    <div className="container mt-5 mb-5">
        <div className="row d-flex justify-content-center">
            <div className="col-md-10">
                <div className="card">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="images p-3">
                                <div className="text-center p-4">
                                    <img id="main-image" src={store.logo} width="250" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="product p-4">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="d-flex align-items-center">
                                        </div>
                                </div>
                                <div className="mt-4 mb-3">
                                    <h4 className="text-uppercase">{store.name}</h4>
                                </div>
                                <p className="about">{store.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <h2 className='mt-5 text-center'>List of our products</h2>
            <div className='row row-cols-md-4 row-cols-sm-2 g-3 mt-4'>
                {allProducts}
            </div>
            </div>
        </div>
    </div>
    </>
    )
}
