import React, { useEffect, useState } from 'react'
import Axios from 'axios';

export default function Profile(props) {
    const [user, setUser] = useState(props.userData);

    useEffect(() => {
        console.log(user._id);
        getUser(user._id);
    }, [])
    
    const handleChange = (e) => {
        e.preventDefault();
        const newUser = {...user};
        newUser[e.target.name] = e.target.value;
        setUser(newUser);
    }

    function getUser(id) {
        Axios.get(`/user/detail?id=${id}`, props.headers)
        .then(userData => {
            setUser(userData);
        })
    }

    return (
        <div>
            <h1>
                Welcome back {props.userData.firstName} {props.userData.lastName}!
                <form onSubmit={() => {}}>
                    <div>
                        <label className="form-label my-3" for="firstName">First Name</label>
                        <input type="text" name="firstName" className="form-control" onChange={handleChange} value={user.firstName}/>
                    </div>
                    <div>
                        <label className="form-label my-3" for="storeDescription">Last Name</label>
                        <input type="text" name="lastName" className="form-control" onChange={handleChange} placeholder="Enter description for the store" value={user.lastName}/>
                    </div>
                    <div>
                        <label className="form-label my-3" for="storeAddress">Address</label>
                        <input type="text" name="address" className="form-control" onChange={handleChange} placeholder="Address" value={user.address}/>
                    </div>
                    <div>
                        <input className='btn btn-primary my-3' type="submit" value="Update Profile"/>
                    </div>
                </form>
            </h1>
        </div>
        )
}
