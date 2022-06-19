import React, {useState} from 'react'
import Constants from '../utilities/Constants'

export default function ExtraHourUpdateForm(props) {
    const initialFormData = Object.freeze({
        hoursDate: props.extraHour.hoursDate,
        hoursAmount: props.extraHour.hoursAmount,
        staffId: props.extraHour.staffId
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

    const extraHourToUpdate = {
        hoursId: props.extraHour.hoursId,
        hoursDate: formData.hoursDate,
        hoursAmount: formData.hoursAmount,
        staffId: formData.staffId
    };

    const url = Constants.API_URL_UPDATE_EXTRAHOUR;

    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(extraHourToUpdate)
      })
      .then(response => response.json())
      .then(responseExtraHourFromServer =>{
        console.log(responseExtraHourFromServer);
      })
      .catch((error) => {
          console.log(error);
        alert(error);
      });
      props.onExtraHourUpdated(extraHourToUpdate);
};

  return (
    <div>
        <form className='w-50 mx-auto'>
            <h2 className='mt-2'>Updating extraHour</h2>
            <div className='mt-2'>
                <label className='h5 form-label'>ExtraHour Date</label>
                <input value={formData.hoursDate} name='hoursDate' type="date" className="form-control" placeholder='Date...' onChange={handleChange} />
            </div>
            <div className='mt-2'>
                <label className='h5 form-label'>Product ID</label>
                <input value={formData.hoursAmount} name='hoursAmount' type="number" className="form-control" placeholder='Amount of hours...' onChange={handleChange} />
            </div>
            <div className='mt-2'>
                <label className='h5 form-label'>ExtraHour ID</label>
                <input value={formData.staffId} name='staffId' type="number" className="form-control" placeholder='ExtraHour ID...' onChange={handleChange} />
            </div>

            <button onClick={handleSubmit} className="btn btn-dark btn-lg w-100 mt-2">Submit</button>
            <button onClick={() => props.onExtraHourUpdated(null)} className="btn btn-secondary btn-lf 2-100 mt-3">Cancel</button>
        </form>
    </div>
  )
}
