import React, { useState, useEffect } from 'react'
import { Navigate } from "react-router-dom";
import Axios from 'axios';
import CreateStoreForm from '../../../components/Store/CreateStoreForm';
import EditStoreForm from '../../../components/Store/EditStoreForm';

export default function StoreIndex(props) {
  // TODO... Create a function here that fetch data from server to check if the seller owns any stores and if they do then display the sotre otherwise let them create a new store
  useEffect(() => {
    checkIfUserOwnsStore();
  }, [])
  
  const userId = props.userData._id;
  const [hasStore, setHasStore] = useState(false);

  function checkIfUserOwnsStore() {
    Axios.get(`/user/store?user=${userId}`)
    .then((res) => {
      if(res.data.store){
        setHasStore(true);
      }
      else{
        setHasStore(false);
      }
    })
  }
  return (
    <>
    <div>
    {(props.userData.role === 'seller') ? <h1>Welcome to your store page</h1> : <Navigate to="/" replace={true} />}
      {(hasStore) ? <EditStoreForm userData={props.userData} headers={props.headers}/> : <CreateStoreForm setHasStore={setHasStore} userData={props.userData} headers={props.headers}/>}
    </div>
    </>
  )
}
