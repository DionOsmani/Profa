import React, {useState} from 'react'
import Constants from '../utilities/Constants'

export default function CustomerUpdateForm(props) {
    const initialFormData = Object.freeze({
        companyName: props.customer.companyName,
        companyEmail: props.customer.companyEmail,
        companyAddress: props.customer.companyAddress
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

    const customerToUpdate = {
        customerId: props.customer.customerId,
        companyName: formData.companyName,
        companyEmail: formData.companyEmail,
        companyAddress: formData.companyAddress
    };

    const url = Constants.API_URL_UPDATE_CUSTOMER;

    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(customerToUpdate)
      })
      .then(response => response.json())
      .then(responseCustomerFromServer =>{
        console.log(responseCustomerFromServer);
      })
      .catch((error) => {
          console.log(error);
        alert(error);
      });
      props.onCustomerUpdated(customerToUpdate);
};

  return (
    <div>
        <form className='w-50 mx-auto'>
            <h2 className='mt-2'>Updating customer</h2>
            <div className='mt-2'>
                <label className='h5 form-label'>Company Name</label>
                <input value={formData.companyName} name='companyName' type="text" className="form-control" placeholder='Company Name...' onChange={handleChange} />
            </div>
            <div className='mt-2'>
                <label className='h5 form-label'>Company Email</label>
                <input value={formData.companyEmail} name='companyEmail' type="text" className="form-control" placeholder='Company Email...' onChange={handleChange} />
            </div>
            <div className='mt-2'>
                <label className='h5 form-label'>Company Address</label>
                <input value={formData.companyAddress} name='companyAddress' type="text" className="form-control" placeholder='Company Address...' onChange={handleChange} />
            </div>

            <button onClick={handleSubmit} className="btn btn-dark btn-lg w-100 mt-2">Submit</button>
            <button onClick={() => props.onCustomerUpdated(null)} className="btn btn-secondary btn-lf 2-100 mt-3">Cancel</button>
        </form>
    </div>
  )
}
