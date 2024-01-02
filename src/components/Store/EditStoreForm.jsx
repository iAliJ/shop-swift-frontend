import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import Axios from 'axios';

export default function EditStoreForm(props) {
    const userId = props.userData._id;
    const [storeData, setStoreData] = useState({user: userId})
    const navigate = useNavigate();
    const formData = new FormData();
    let file = '';

    useEffect(() => {
        getStoreData(userId);
    }, [])

    const handleChange = (e) => {
        const store = {...storeData};
        store[e.target.name] = e.target.value;
        setStoreData(store)
    }

    const handleFileChange = (e) => {
        e.preventDefault();
        if(e.target.files) {
            file = e.target.files[0];
        }
    }
    
    const handleUpdateStore = (e) => {
        e.preventDefault();
        const store = {...storeData};
        setStoreData(store);
        // append all store data
        Object.keys(storeData).forEach(key => {
            formData.append(key, storeData[key]);
        })
        // formData.append('store', storeData);
        formData.append('file', file);
        console.log(formData);
        updateStore();
    }

    function getStoreData(userId) {
        Axios.get(`/user/store?user=${userId}`)
        .then((res) => {
            setStoreData(res.data.store);
        })
    }

    function updateStore() {
        props.headers.headers['Content-Type'] = 'multipart/form-data';
        Axios.post('/store/edit', formData, props.headers)
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
                    <label className="form-label my-3" for="storeDescription">Store Description</label>
                    <textarea type="text" name="description" className="form-control" onChange={handleChange} placeholder="Enter description for the store" value={storeData.description}/>
                </div>
                <div>
                    <label className="form-label my-3" for="storeLogo">Store Logo</label>
                    <input type="file" accept='.png,.jpg,.jpeg' name="logo" className="form-control" onChange={handleFileChange}/>
                </div>
                <div>
                    <label className="form-label my-3" for="storeAddress">Store Address</label>
                    <input type="text" name="address" className="form-control" onChange={handleChange} placeholder="Address" value={storeData.address}/>
                </div>
                <div>
                    <input className='btn btn-primary my-3' type="submit" value="Edit Store"/>
                </div>
            </form>
        </div>
    )
}
