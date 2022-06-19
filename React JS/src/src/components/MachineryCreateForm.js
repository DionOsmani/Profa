import React, {useState} from 'react'
import Constants from '../utilities/Constants'

export default function MachineryCreateForm(props) {
    const initialFormData = Object.freeze({
        machineryName: "",
        departmentId: ""
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

    const machineryToCreate = {
        machineryId: 0,
        machineryName: formData.machineryName,
        departmentId: formData.departmentId,
    };

    const url = Constants.API_URL_CREATE_MACHINERY;

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
           
        },
        body: JSON.stringify(machineryToCreate)
      })
      .then(response => response.json())
      .then(responseMachineryFromServer =>{
        console.log(responseMachineryFromServer);
      })
      .catch((error) => {
          console.log(error);
        alert(error);
      });
      props.onMachineryCreated(machineryToCreate);
};

  return (
    <div>
        <form className='w-50 mx-auto'>
            <h2 className='mt-2'>Create new machinery</h2><br></br>
            <div className='mt-2'>
                <label className='h5 form-label'>Machinery Name</label>
                <input value={formData.machineryName} name='machineryName' type="text" className="form-control" placeholder='Machinery Name...' onChange={handleChange} />
            </div>
            <div className='mt-2'>
                <label className='h5 form-label'>Department ID</label>
                <input value={formData.departmentId} name='departmentId' type="number" className="form-control" placeholder='Department ID...' onChange={handleChange} />
            </div>

            <button onClick={handleSubmit} className="btn btn-dark btn-lg w-100 mt-2">Submit</button>
            <button onClick={() => props.onMachineryCreated(null)} className="btn btn-secondary btn-lf 2-100 mt-2">Cancel</button>
        </form>
    </div>
  )
}
