import React, {useState} from 'react'
import Constants from '../utilities/Constants'

export default function BillCreateForm(props) {
    const initialFormData = Object.freeze({
        paymentDate: "",
        productId: "",
        customerId: ""
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

    const billToCreate = {
        billId: 0,
        paymentDate: formData.paymentDate,
        productId: formData.productId,
        customerId: formData.customerId
    };

    const url = Constants.API_URL_CREATE_BILL;

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
           
        },
        body: JSON.stringify(billToCreate)
      })
      .then(response => response.json())
      .then(responseBillFromServer =>{
        console.log(responseBillFromServer);
      })
      .catch((error) => {
          console.log(error);
        alert(error);
      });
      props.onBillCreated(billToCreate);
};

  return (
    <div>
        <form className='w-50 mx-auto'>
            <h2 className='mt-2'>Create new bill</h2><br></br>
            <div className='mt-2'>
                <label className='h5 form-label'>Bill Date</label>
                <input value={formData.paymentDate} name='paymentDate' type="date" className="form-control" placeholder='Date...' onChange={handleChange} />
            </div>
            <div className='mt-2'>
                <label className='h5 form-label'>Product ID</label>
                <input value={formData.productId} name='productId' type="number" className="form-control" placeholder='Product ID...' onChange={handleChange} />
            </div>
            <div className='mt-2'>
                <label className='h5 form-label'>Customer ID</label>
                <input value={formData.customerId} name='customerId' type="number" className="form-control" placeholder='Customer ID...' onChange={handleChange} />
            </div>

            <button onClick={handleSubmit} className="btn btn-dark btn-lg w-100 mt-2">Submit</button>
            <button onClick={() => props.onBillCreated(null)} className="btn btn-secondary btn-lf 2-100 mt-2">Cancel</button>
        </form>
    </div>
  )
}
