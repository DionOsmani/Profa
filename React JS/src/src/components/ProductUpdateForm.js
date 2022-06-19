import React, {useState} from 'react'
import Constants from '../utilities/Constants'

export default function ProductUpdateForm(props) {
    const initialFormData = Object.freeze({
        productType: props.product.productType,
        amount: props.product.amount,
        price: props.product.price
    });

  const [formData, setFormData] = useState(initialFormData);

  

const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });
};

const handleSubmit = (e) => {
    e.preventDefault();

    const productToUpdate = {
        productId: props.product.productId,
        productType: formData.productType,
        amount: formData.amount,
        price: formData.price
    };

    const url = Constants.API_URL_UPDATE_PRODUCT;

    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(productToUpdate)
      })
      .then(response => response.json())
      .then(responseProductFromServer =>{
        console.log(responseProductFromServer);
      })
      .catch((error) => {
          console.log(error);
        alert(error);
      });
      props.onProductUpdated(productToUpdate);
};

  return (
    <div>
        <form className='w-50 mx-auto'>
            <h1 className='mt-3'>Updating product</h1>
            <div className='mt-3'>
                <label className='h4 form-label'>Product Type</label>
                <input value={formData.productType} name='productType' type="text" className="form-control" onChange={handleChange} />
            </div>
            <div className='mt-3'>
                <label className='h4 form-label'>Amount</label>
                <input value={formData.amount} name='amount' type="text" className="form-control" onChange={handleChange} />
            </div>
            <div className='mt-3'>
                <label className='h4 form-label'>Price</label>
                <input value={formData.price} name='price' type="text" className="form-control" onChange={handleChange} />
            </div>

            <button onClick={handleSubmit} className="btn btn-dark btn-lg w-100 mt-3">Submit</button>
            <button onClick={() => props.onProductUpdated(null)} className="btn btn-secondary btn-lf 2-100 mt-3">Cancel</button>
        </form>
    </div>
  )
}
