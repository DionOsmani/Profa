import React, {useEffect, useState} from 'react'
import Constants from '../utilities/Constants';
import ProductCreateForm from './ProductCreateForm';
import ProductUpdateForm from './ProductUpdateForm';

function ProductTable()  {
    const [products, setProduct] = useState([]);
    const [showingCreateNewProductForm, setShowingCreateNewProductForm] = useState(false);
    const [productCurrentlyBeingUpdated, setProductCurrentlyBeingUpdated] = useState(null);

    function getProduct(){
    const url = Constants.API_URL_GET_ALL_PRODUCTS;
    
    fetch(url, {
      method: 'GET'
    })
    .then(response => response.json())
    .then(productsFromServer =>{
      console.log(productsFromServer);
      setProduct(productsFromServer.value);
    })
    .catch((error) => {
      alert(error);
    });
  }

  function deleteProduct(productId){
    const url = `${Constants.API_URL_DELETE_PRODUCT_BY_ID}/${productId}`;
    
    fetch(url, {
      method: 'DELETE'
    })
    .then(response => response.json())
    .then(responseFromServer =>{
      console.log(responseFromServer);
      onProductDeleted(productId);
    })
    .catch((error) => {
        console.log(error);
      alert(error);
    });
  }
  
return (
    <div className='m-5'>
        
       { useEffect(() => {
    getProduct();
  }, [])}
        
        {(products.length>0 && showingCreateNewProductForm === false && productCurrentlyBeingUpdated === null) && renderProductTable() }
        
        {showingCreateNewProductForm && <ProductCreateForm onProductCreated={onProductCreated}/>}

        {productCurrentlyBeingUpdated!==null&& <ProductUpdateForm product={productCurrentlyBeingUpdated} onProductUpdated={onProductUpdated} />}
    </div>
  )
  
function renderProductTable(){
    return(
        
        <div className='w-75 mx-auto'>
        <button onClick={() => setShowingCreateNewProductForm(true)} className='btn btn-outline-dark btn-lg w-25 float-right'>Create new product</button>
        <table className='table table-hover table-striped w-100 p-3 mx-auto'>
            <thead className='thead-dark'>
                <tr>
                    <th colSpan={6}>
                        <h4>Products</h4>
                    </th>
                </tr>
                <tr>
                    <th>Product Type</th>
                    <th>Amount</th>
                    <th>Price</th>
                    <th>Total</th>
                    <th>Update</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {products.map((product) => (
                    <tr key={product.productId}>
                        <td>{product.productType}</td>
                        <td>{product.amount}</td>
                        <td>{product.price}$</td>
                        <td>{product.amount * product.price}$</td>
                        <td><button onClick={() => setProductCurrentlyBeingUpdated(product) } className='btn btn-dark btn-lg mx-3 my-3'>Update</button></td>
                        <td><button onClick={() => {if(window.confirm(`Are you sure you want to delete this product?`)) deleteProduct(product.productId)}} className='btn btn-secondary btn-lg mx-3 my-3'>Delete</button></td>
                    </tr>
                ))}
            </tbody>
        </table>

    </div>
    )

    
}


function onProductCreated(createdProduct){
    setShowingCreateNewProductForm(false);
    if(createdProduct === null){
        return;
    }


    alert('Product successfully created');

    getProduct();
}

function onProductUpdated(updatedProduct){
    setProductCurrentlyBeingUpdated(null);
    if(updatedProduct === null){
        return;
    }

    let productsCopy=[...products];

    const index = productsCopy.findIndex((productCopyProduct, currentIndex) => {
        if(productCopyProduct.productId === updatedProduct.productId){
            return true;
        }
    });

    if(index!== -1){
        productsCopy[index] = updatedProduct;
    }
    setProduct(productsCopy);
    alert('Product successfully updated');

    getProduct();
}


function onProductDeleted(deletedProductProductId){
    let productsCopy=[...products];

    const index = productsCopy.findIndex((productsCopyProduct, currentIndex) => {
        if(productsCopyProduct.productId === deletedProductProductId){
            return true;
        }
    });

    if(index!== -1){
        productsCopy.splice(index,1);
    }
    setProduct(productsCopy);
    alert('Product successfully deleted');

    getProduct();
}

}


export default ProductTable