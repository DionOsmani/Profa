import React, {useState} from 'react'
import Constants from '../utilities/Constants'

export default function ProductCreateForm(props) {
    const initialFormData = Object.freeze({
        productType: "",
        amount: '',
        price: ''
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

    const productToCreate = {
        productId: 0,
        productType: formData.productType,
        amount: formData.amount,
        price: formData.price
    };

    const url = Constants.API_URL_CREATE_PRODUCT;

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(productToCreate)
      })
      .then(response => response.json())
      .then(responseProductFromServer =>{
        console.log(responseProductFromServer);
      })
      .catch((error) => {
          console.log(error);
        alert(error);
      });
      props.onProductCreated(productToCreate);
};

  return (
    <div>
        <form className='w-50 mx-auto'>
            <h1 className='mt-3'>Create new product</h1>
            <div className='mt-3'>
                <label className='h4 form-label'>Product type</label>
                <input value={formData.productType} name='productType' type="text" placeholder='Type...' className="form-control" onChange={handleChange} />
            </div>
            <div className='mt-3'>
                <label className='h4 form-label'>Amount</label>
                <input value={formData.amount} name='amount' type="number" placeholder='Amount...' className="form-control" onChange={handleChange} />
            </div>
            <div className='mt-3'>
                <label className='h4 form-label'>Price</label>
                <input value={formData.price} name='price' type="number" placeholder='Price...' className="form-control" onChange={handleChange} />
            </div>
            

            <button onClick={handleSubmit} className="btn btn-dark btn-lg w-100 mt-3">Submit</button>
            <button onClick={() => props.onProductCreated(null)} className="btn btn-secondary btn-lf 2-100 mt-3">Cancel</button>
        </form>
    </div>
  )
}
