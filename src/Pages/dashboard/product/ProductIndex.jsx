import React, { useState, useEffect } from 'react';
import { Link, Navigate, Outlet } from 'react-router-dom';
import Axios from 'axios';
import AddProduct from '../../../components/product/AddProduct';
import EditProduct from '../../../components/product/EditProduct';
import ProductsTable from '../../../components/product/ProductsTable';

export default function ProductIndex(props) {
  useEffect(() => {
    checkIfUserOwnsProduct();
  }, []);
  const userId = props.userData._id;
  const [hasProduct, setHasProduct] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null); // State to hold the selected product


  function checkIfUserOwnsProduct() {
    Axios.get(`/user/product?user=${userId}`)
      .then((res) => {
        if (res.data.product) {
          setHasProduct(true);
        } else {
          setHasProduct(false);
        }
      })
      // .catch((err) => {
      //   console.log('Error checking if user owns product');
      //   console.log(err);
      // });
  }



    // Function to handle the edit button click in ProductsTable
    const handleEdit = (product) => {
      setSelectedProduct(product);
    };

  return (
    <>
    {props.userData.role === 'seller' ? (
       <>
       <h1>Welcome to your product page</h1>
       <Link className="btn btn-primary" to="add">Add Product</Link>
     </>
      
    ) : (
      <Navigate to="/" replace={true} />
    )}

<ProductsTable
            userData={props.userData}
            headers={props.headers}
            onEdit={handleEdit}/>
            <Outlet/>
  </>
  )
    }
// }

//     <div>
//       {hasProduct ? (

        
//         // products details
//         <div>
          
//           <ProductsTable
//             userData={props.userData}
//             headers={props.headers}
//             onEdit={handleEdit} // Pass the handleEdit function to ProductsTable
//           />
//           {selectedProduct && (
//             <EditProduct
//               userData={props.userData}
//               headers={props.headers}
//               selectedProduct={selectedProduct} // Pass the selected product to EditProduct
//             />
//           )}
//         </div>
//       ) : (
//         <AddProduct
//           setHasProduct={setHasProduct}
//           userData={props.userData}
//           headers={props.headers}
//         />
//       )}
//     </div>
//   </>

    
//   );
// }