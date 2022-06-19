import React, {useState} from 'react'
import Constants from '../utilities/Constants'

export default function DepartmentCreateForm(props) {
    const initialFormData = Object.freeze({
        specialisation: "",
        branchId: ''
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

    const departmentToCreate = {
        departmentId: 0,
        specialisation: formData.specialisation,
        branchId: formData.branchId
    };

    const url = Constants.API_URL_CREATE_DEPARTMENT;

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(departmentToCreate)
      })
      .then(response => response.json())
      .then(responseDepartmentFromServer =>{
        console.log(responseDepartmentFromServer);
      })
      .catch((error) => {
          console.log(error);
        alert(error);
      });
      props.onDepartmentCreated(departmentToCreate);
};

  return (
    <div>
        <form className='w-50 mx-auto'>
            <h1 className='mt-3'>Create new department</h1>
            <div className='mt-3'>
                <label className='h4 form-label'>Specialisation</label>
                <input value={formData.specialisation} name='specialisation' type="text" className="form-control" placeholder='Specialisation...' onChange={handleChange} />
            </div>
            <div className='mt-3'>
                <label className='h4 form-label'>Branch ID</label>
                <input value={formData.branchId} name='branchId' type="text" className="form-control" placeholder='Branch...' onChange={handleChange} />
            </div>
            

            <button onClick={handleSubmit} className="btn btn-dark btn-lg w-100 mt-3">Submit</button>
            <button onClick={() => props.onDepartmentCreated(null)} className="btn btn-secondary btn-lf 2-100 mt-3">Cancel</button>
        </form>
    </div>
  )
}
