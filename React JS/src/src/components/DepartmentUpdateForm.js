import React, {useState} from 'react'
import Constants from '../utilities/Constants'

export default function DepartmentUpdateForm(props) {
    const initialFormData = Object.freeze({
        specialisation: props.department.specialisation,
        branchId: props.department.branchId
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

    const departmentToUpdate = {
        departmentId: props.department.departmentId,
        specialisation: formData.specialisation,
        branchId: formData.branchId
    };

    const url = Constants.API_URL_UPDATE_DEPARTMENT;

    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(departmentToUpdate)
      })
      .then(response => response.json())
      .then(responseDepartmentFromServer =>{
        console.log(responseDepartmentFromServer);
      })
      .catch((error) => {
          console.log(error);
        alert(error);
      });
      props.onDepartmentUpdated(departmentToUpdate);
};

  return (
    <div>
        <form className='w-50 mx-auto'>
            <h1 className='mt-3'>Updating department</h1>
            <div className='mt-3'>
                <label className='h4 form-label'>Specialisation</label>
                <input value={formData.specialisation} name='specialisation' type="text" className="form-control" onChange={handleChange} />
            </div>
            <div className='mt-3'>
                <label className='h4 form-label'>Branch ID</label>
                <input value={formData.branchId} name='branchId' type="text" className="form-control" onChange={handleChange} />
            </div>
            

            <button onClick={handleSubmit} className="btn btn-dark btn-lg w-100 mt-3">Submit</button>
            <button onClick={() => props.onDepartmentUpdated(null)} className="btn btn-secondary btn-lf 2-100 mt-3">Cancel</button>
        </form>
    </div>
  )
}
