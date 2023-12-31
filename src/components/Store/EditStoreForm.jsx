import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import Axios from 'axios';

export default function EditStoreForm(props) {
    const userId = props.userData._id;
    const [storeData, setStoreData] = useState({user: userId})
    const navigate = useNavigate();

    useEffect(() => {
        getStoreData(userId);
    }, [])

    const handleChange = (e) => {
        const store = {...storeData};
        store[e.target.name] = e.target.value;
        setStoreData(store)
    }
    
    const handleUpdateStore = (e) => {
        e.preventDefault();
        const store = {...storeData};
        setStoreData(store);
        updateStore(storeData);
    }

    function getStoreData(userId) {
        Axios.get(`/user/store?user=${userId}`)
        .then((res) => {
            setStoreData(res.data.store);
        })
    }

    function updateStore(store) {
        console.log(store);
        Axios.post('/store/edit', store, props.headers)
        .catch((err) => {
            console.log('error updating store');
            console.log(err);
        });
    }

    return (
        <div>
            <h2>Modify your store!</h2>
            <form onSubmit={handleUpdateStore}>
                <div>
                    <label className="form-label my-3" for="storeName">Store Name</label>
                    <input type="text" name="name" className="form-control" onChange={handleChange} placeholder="Enter store name" value={storeData.name}/>
                </div>
                <div>
                    <label className="form-label my-3" for="storeLogo">Store Logo</label>
                    <input type="text" name="logo" className="form-control" onChange={handleChange} placeholder="Replace this with file browser" value={storeData.logo}/>
                </div>
                <div>
                    <label className="form-label my-3" for="storeAddress">Store Address</label>
                    <input type="text" name="address" className="form-control" onChange={handleChange} placeholder="Address" value={storeData.address}/>
                </div>
                <div>
                    <label className="form-label my-3" for="storeCategory">Store Category</label>
                    <input type="text" name="category" className="form-control" placeholder="Category" value={storeData.category}/>
                </div>
                <div>
                    <input className='btn btn-primary my-3' type="submit" value="Edit Store"/>
                </div>
            </form>
        </div>
    )
}
