import React, {useState} from 'react'
import Constants from '../utilities/Constants'

export default function StaffCreateForm(props) {
    const initialFormData = Object.freeze({
        firstname: "",
        surname: "",
        email: "",
        pass: "",
        BranchId: "",
        phoneNumber: "",
        age: '',
        gjinia: '',
        wage: '',
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
        BranchId: formData.BranchId,
        phoneNumber: formData.phoneNumber,
        age: formData.age,
        gjinia: formData.gjinia,
        wage: formData.wage
    };

    const url = Constants.API_URL_CREATE_STAFF;

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
           
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
            <h2 className='mt-2'>Create new staff</h2><br></br>
            <div className='mt-2'>
                <label className='h5 form-label'>Staff name</label>
                <input value={formData.firstname} name='firstname' type="text" className="form-control" placeholder='Name...' onChange={handleChange} />
            </div>
            <div className='mt-2'>
                <label className='h5 form-label'>Staff surname</label>
                <input value={formData.surname} name='surname' type="text" className="form-control" placeholder='Surname...' onChange={handleChange} />
            </div>
            <div className='mt-2'>
                <label className='h5 form-label'>Staff email</label>
                <input value={formData.email} name='email' type="text" className="form-control" placeholder='Email...' onChange={handleChange} />
            </div>
            <div className='mt-2'>
                <label className='h5 form-label'>Staff pass</label>
                <input value={formData.pass} name='pass' type="password" className="form-control" placeholder='Password...' onChange={handleChange} />
            </div>
            <div className='mt-2'>
                <label className='h5 form-label'>Staff Branch Id</label>
                <input value={formData.BranchId} name='BranchId' type="text" className="form-control" placeholder='Branch...' onChange={handleChange} />
            </div>
            <div className='mt-2'>
                <label className='h5 form-label'>Staff phone number</label>
                <input value={formData.phoneNumber} name='phoneNumber' type="text" className="form-control" placeholder='Phone Number...' onChange={handleChange} />
            </div>
            <div className='mt-2'>
                <label className='h5 form-label'>Staff age</label>
                <input value={formData.age} name='age' type="text" className="form-control" placeholder='Age...' onChange={handleChange} />
            </div>
            <div className='mt-2'>
                <label className='h5 form-label'>Staff gender</label>
                <input value={formData.gjinia} name='gjinia' type="text" className="form-control" placeholder='Gebder...' onChange={handleChange} />
            </div>
            <div className='mt-2'>
                <label className='h5 form-label'>Staff wage</label>
                <input value={formData.wage} name='wage' type="text" className="form-control" placeholder='Wage...' onChange={handleChange} />
            </div> 

            <button onClick={handleSubmit} className="btn btn-dark btn-lg w-100 mt-2">Submit</button>
            <button onClick={() => props.onStaffCreated(null)} className="btn btn-secondary btn-lf 2-100 mt-2">Cancel</button>
        </form>
    </div>
  )
}
