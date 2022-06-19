import React, {useState} from 'react'
import Constants from '../utilities/Constants'

export default function ExtraHourCreateForm(props) {
    const initialFormData = Object.freeze({
        hoursDate: "",
        hoursAmount: "",
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

    const extraHourToCreate = {
        hoursId: 0,
        hoursDate: formData.hoursDate,
        hoursAmount: formData.hoursAmount,
        staffId: formData.staffId
    };

    const url = Constants.API_URL_CREATE_EXTRAHOUR;

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
           
        },
        body: JSON.stringify(extraHourToCreate)
      })
      .then(response => response.json())
      .then(responseExtraHourFromServer =>{
        console.log(responseExtraHourFromServer);
      })
      .catch((error) => {
          console.log(error);
        alert(error);
      });
      props.onExtraHourCreated(extraHourToCreate);
};

  return (
    <div>
        <form className='w-50 mx-auto'>
            <h2 className='mt-2'>Create new extraHour</h2><br></br>
            <div className='mt-2'>
                <label className='h5 form-label'>ExtraHour Date</label>
                <input value={formData.hoursDate} name='hoursDate' type="date" className="form-control" placeholder='Date...' onChange={handleChange} />
            </div>
            <div className='mt-2'>
                <label className='h5 form-label'>Hours put in</label>
                <input value={formData.hoursAmount} name='hoursAmount' type="number" className="form-control" placeholder='Amount of hours...' onChange={handleChange} />
            </div>
            <div className='mt-2'>
                <label className='h5 form-label'>Staff ID</label>
                <input value={formData.staffId} name='staffId' type="number" className="form-control" placeholder='Staff ID...' onChange={handleChange} />
            </div>

            <button onClick={handleSubmit} className="btn btn-dark btn-lg w-100 mt-2">Submit</button>
            <button onClick={() => props.onExtraHourCreated(null)} className="btn btn-secondary btn-lf 2-100 mt-2">Cancel</button>
        </form>
    </div>
  )
}
