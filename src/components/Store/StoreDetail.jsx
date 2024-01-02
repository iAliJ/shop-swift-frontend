import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Axios from 'axios';

export default function StoreDetail() {
    const {id} = useParams();
    const [store, setStore] = useState({});

    useEffect(() => {
        getStore(id);
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
                                    <img id="main-image" src="https://i.imgur.com/Dhebu4F.jpg" width="250" />
                                </div>
                                <div className="thumbnail text-center">
                                    <img onClick="change_image(this)" src="https://i.imgur.com/Rx7uKd0.jpg" width="70"/>
                                    <img onClick="change_image(this)" src="https://i.imgur.com/Dhebu4F.jpg" width="70"/>
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
                                    <div className="price d-flex flex-row align-items-center">  
                                        <span className="act-price">$20</span>
                                        <div className="ml-2">
                                            <small className="dis-price">$59</small><span>40% OFF</span>
                                        </div>
                                    </div>
                                </div>
                                <p className="about">Shop from a wide range of t-shirt from orianz. Pefect for your everyday use, you could pair it with a stylish pair of jeans or trousers complete the look.</p>
                                
                                <div className="cart mt-4 align-items-center">
                                    <button className="btn btn-danger text-uppercase mr-2 px-4">Add to cart</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
    )
}
