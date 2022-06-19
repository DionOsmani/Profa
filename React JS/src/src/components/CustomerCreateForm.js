import React, {useState} from 'react'
import Constants from '../utilities/Constants'

export default function CustomerCreateForm(props) {
    const initialFormData = Object.freeze({
        companyName: "",
        companyEmail: "",
        companyAddress: ""
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

    const customerToCreate = {
        customerId: 0,
        companyName: formData.companyName,
        companyEmail: formData.companyEmail,
        companyAddress: formData.companyAddress
    };

    const url = Constants.API_URL_CREATE_CUSTOMER;

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
           
        },
        body: JSON.stringify(customerToCreate)
      })
      .then(response => response.json())
      .then(responseCustomerFromServer =>{
        console.log(responseCustomerFromServer);
      })
      .catch((error) => {
          console.log(error);
        alert(error);
      });
      props.onCustomerCreated(customerToCreate);
};

  return (
    <div>
        <form className='w-50 mx-auto'>
            <h2 className='mt-2'>Create new customer</h2><br></br>
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
            <button onClick={() => props.onCustomerCreated(null)} className="btn btn-secondary btn-lf 2-100 mt-2">Cancel</button>
        </form>
    </div>
  )
}
