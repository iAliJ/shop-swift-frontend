import React from 'react'
import { Navigate } from "react-router-dom";

export default function StoreIndex(props) {
  // TODO... Create a function here that fetch data from server to check if the seller owns any stores and if they do then display the sotre otherwise let them create a new store
  return (
    <>
    {(props.userData.role === 'seller') ? <h1>Welcome to your store</h1> : <Navigate to="/" replace={true} />}
    <div>
      <p>Let's manage your store</p>
      <p>Here the seller can edit information about the store they own</p>
      <p>For now lets be able to manage one store and in the future we implement multiple stores</p>
    </div>
    </>
  )
}
