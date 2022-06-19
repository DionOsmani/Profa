import React, {useState} from 'react'
import Constants from '../utilities/Constants'

export default function StaffPaymentCreateForm(props) {
    const initialFormData = Object.freeze({
        paymentDate: "",
        staffId: ""
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

    const staffPaymentToCreate = {
        staffPaymentId: 0,
        paymentDate: formData.paymentDate,
        staffId: formData.staffId
    };

    const url = Constants.API_URL_CREATE_STAFFPAYMENT;

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
           
        },
        body: JSON.stringify(staffPaymentToCreate)
      })
      .then(response => response.json())
      .then(responseStaffPaymentFromServer =>{
        console.log(responseStaffPaymentFromServer);
      })
      .catch((error) => {
          console.log(error);
        alert(error);
      });
      props.onStaffPaymentCreated(staffPaymentToCreate);
};

  return (
    <div>
        <form className='w-50 mx-auto'>
            <h2 className='mt-2'>Create new staffPayment</h2><br></br>
            <div className='mt-2'>
                <label className='h5 form-label'>StaffPayment Date</label>
                <input value={formData.paymentDate} name='paymentDate' type="date" className="form-control" placeholder='Date...' onChange={handleChange} />
            </div>
            <div className='mt-2'>
                <label className='h5 form-label'>Product ID</label>
                <input value={formData.staffId} name='staffId' type="number" className="form-control" placeholder='Staff ID...' onChange={handleChange} />
            </div>

            <button onClick={handleSubmit} className="btn btn-dark btn-lg w-100 mt-2">Submit</button>
            <button onClick={() => props.onStaffPaymentCreated(null)} className="btn btn-secondary btn-lf 2-100 mt-2">Cancel</button>
        </form>
    </div>
  )
}
