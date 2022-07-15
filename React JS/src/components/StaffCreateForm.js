import React, {useState} from 'react'
import Constants from '../utilities/Constants'

export default function StaffCreateForm(props) {
    const initialFormData = Object.freeze({
        firstname: "",
        surname: "",
        email: "",
        pass: "",
        branchId: "",
        phoneNumber: "",
        age: "",
        gjinia: '',
        wage: "",
        role: "",
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

    const staffToCreate = {
        staffId: 0,
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

    const url = Constants.API_URL_CREATE_STAFF;

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(staffToCreate)
      })
      .then(response => response.json())
      .then(responseStaffFromServer =>{
        console.log(responseStaffFromServer);
      })
      .catch((error) => {
          console.log(error);
        alert(error);
      });
      props.onStaffCreated(staffToCreate);
};

  return (
    <div>
        <form className='w-50 mx-auto'>
            <h2 className='mt-2'>Create new staff</h2>
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
            <button onClick={() => props.onStaffCreated(null)} className="btn btn-secondary btn-lf 2-100 mt-3">Cancel</button>
        </form>
    </div>
  )
}
