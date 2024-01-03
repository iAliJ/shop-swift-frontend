import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import CustomerOrder from '../../components/order/CustomerOrder';
import SellerOrder from '../../components/order/SellerOrder';
export default function Orders(props) {
  return (
    <>
    {
      (props.userData.role === 'buyer') ? <CustomerOrder userData={props.userData} headers={props.headers}/> : <SellerOrder userData={props.userData} headers={props.headers}/>
    }
    </>
  )
}
