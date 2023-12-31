import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import Axios from 'axios';

export default function CreateStoreForm(props) {
    const userId = props.userData._id;
    const [newStore, setNewStore] = useState({user: userId})
    const navigate = useNavigate();

    const handleChange = (e) => {
        const store = {...newStore};
        store[e.target.name] = e.target.value;
        setNewStore(store)
    }
    
    const handleCreateStore = (e) => {
        e.preventDefault();
        const store = {...newStore};
        setNewStore(store);
        createStore(newStore);
    }

    function createStore(store) {
        console.log(userId);
        Axios.post('/store/create', store, props.headers)
        .then((store) => {
            // navigate to /stores
            console.log(store);
            props.setHasStore(true);
            navigate('/dashboard/stores');
        })
    }

    return (
        <div>
            <h2>Let's create your store!</h2>
            <form onSubmit={handleCreateStore}>
                <div>
                    <label className="form-label my-3" for="storeName">Store Name</label>
                    <input type="text" name="name" className="form-control" onChange={handleChange} placeholder="Enter store name"/>
                </div>
                <div>
                    <label className="form-label my-3" for="storeLogo">Store Logo</label>
                    <input type="text" name="logo" className="form-control" onChange={handleChange} placeholder="Replace this with file browser"/>
                </div>
                <div>
                    <label className="form-label my-3" for="storeAddress">Store Address</label>
                    <input type="text" name="address" className="form-control" onChange={handleChange} placeholder="Address"/>
                </div>
                <div>
                    <input className='btn btn-primary my-3' type="submit" value="Create Store"/>
                </div>
            </form>
        </div>
    )
}
