import React, {useState} from 'react'
import Constants from '../utilities/Constants'

export default function StaffUpdateForm(props) {
    const initialFormData = Object.freeze({
        firstname: props.staff.firstname,
        surname: props.staff.surname,
        email: props.staff.email,
        pass: props.staff.pass,
        branchId: props.staff.branchId,
        phoneNumber: props.staff.phoneNumber,
        age: props.staff.age,
        gjinia: props.staff.gjinia,
        wage: props.staff.wage,
        role: props.staff.role,
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

    const staffToUpdate = {
        staffId: props.staff.staffId,
        firstname: formData.firstname,
        surname: formData.surname,
        email: formData.email,
        pass: formData.pass,
        branchId: formData.branchId,
        phoneNumber: formData.phoneNumber,
        age: formData.age,
        gjinia: formData.gjinia,
        wage: formData.wage,
        role: formData.role
    };

    const url = Constants.API_URL_UPDATE_STAFF;

    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(staffToUpdate)
      })
      .then(response => response.json())
      .then(responseStaffFromServer =>{
        console.log(responseStaffFromServer);
      })
      .catch((error) => {
          console.log(error);
        alert(error);
      });
      props.onStaffUpdated(staffToUpdate);
};

  return (
    <div>
        <form className='w-50 mx-auto'>
            <h2 className='mt-2'>Updating staff</h2>
            <div className='mt-2'>
                <label className='h5 form-label'>Staff name</label>
                <input value={formData.firstname} name='firstname' type="text" className="form-control" onChange={handleChange} />
            </div>
            <div className='mt-2'>
                <label className='h5 form-label'>Staff surname</label>
                <input value={formData.surname} name='surname' type="text" className="form-control" onChange={handleChange} />
            </div>
            <div className='mt-2'>
                <label className='h5 form-label'>Staff email</label>
                <input value={formData.email} name='email' type="text" className="form-control" onChange={handleChange} />
            </div>
            <div className='mt-2'>
                <label className='h5 form-label'>Staff pass</label>
                <input value={formData.pass} name='pass' type="password" className="form-control" onChange={handleChange} />
            </div>
            <div className='mt-2'>
                <label className='h5 form-label'>Staff Branch Id</label>
                <input value={formData.branchId} name='branchId' type="text" className="form-control" onChange={handleChange} />
            </div>
            <div className='mt-2'>
                <label className='h5 form-label'>Staff phone number</label>
                <input value={formData.phoneNumber} name='phoneNumber' type="text" className="form-control" onChange={handleChange} />
            </div>
            <div className='mt-2'>
                <label className='h5 form-label'>Staff age</label>
                <input value={formData.age} name='age' type="text" className="form-control" onChange={handleChange} />
            </div>
            <div className='mt-2'>
                <label className='h5 form-label'>Staff gender</label>
                <input value={formData.gjinia} name='gjinia' type="text" className="form-control" onChange={handleChange} />
            </div>
            <div className='mt-2'>
                <label className='h5 form-label'>Staff wage</label>
                <input value={formData.wage} name='wage' type="text" className="form-control" onChange={handleChange} />
            </div> 
            <div className='mt-2'>
                <label className='h5 form-label'>Staff role</label>
                <input value={formData.role} name='role' type="text" className="form-control" onChange={handleChange} />
            </div> 

            <button onClick={handleSubmit} className="btn btn-dark btn-lg w-100 mt-2">Submit</button>
            <button onClick={() => props.onStaffUpdated(null)} className="btn btn-secondary btn-lf 2-100 mt-3">Cancel</button>
        </form>
    </div>
  )
}
