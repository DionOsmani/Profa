import React, {useState} from 'react'
import Constants from '../utilities/Constants'

export default function BillUpdateForm(props) {
    const initialFormData = Object.freeze({
        paymentDate: props.bill.paymentDate,
        productId: props.bill.productId,
        billId: props.bill.billId
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

    const billToUpdate = {
        billId: props.bill.billId,
        paymentDate: formData.paymentDate,
        productId: formData.productId,
        billId: formData.billId
    };

    const url = Constants.API_URL_UPDATE_BILL;

    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(billToUpdate)
      })
      .then(response => response.json())
      .then(responseBillFromServer =>{
        console.log(responseBillFromServer);
      })
      .catch((error) => {
          console.log(error);
        alert(error);
      });
      props.onBillUpdated(billToUpdate);
};

  return (
    <div>
        <form className='w-50 mx-auto'>
            <h2 className='mt-2'>Updating bill</h2>
            <div className='mt-2'>
                <label className='h5 form-label'>Bill Date</label>
                <input value={formData.paymentDate} name='paymentDate' type="date" className="form-control" placeholder='Date...' onChange={handleChange} />
            </div>
            <div className='mt-2'>
                <label className='h5 form-label'>Product ID</label>
                <input value={formData.productId} name='productId' type="number" className="form-control" placeholder='Product ID...' onChange={handleChange} />
            </div>
            <div className='mt-2'>
                <label className='h5 form-label'>Bill ID</label>
                <input value={formData.billId} name='billId' type="number" className="form-control" placeholder='Bill ID...' onChange={handleChange} />
            </div>

            <button onClick={handleSubmit} className="btn btn-dark btn-lg w-100 mt-2">Submit</button>
            <button onClick={() => props.onBillUpdated(null)} className="btn btn-secondary btn-lf 2-100 mt-3">Cancel</button>
        </form>
    </div>
  )
}
