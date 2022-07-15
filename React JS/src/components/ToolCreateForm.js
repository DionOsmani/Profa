import React, {useState} from 'react'
import Constants from '../utilities/Constants'

export default function ToolCreateForm(props) {
    const initialFormData = Object.freeze({
        toolType: "",
        amount: "",
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

    const toolToCreate = {
        toolId: 0,
        toolType: formData.toolType,
        amount: formData.amount,
        departmentId: formData.departmentId
    };

    const url = Constants.API_URL_CREATE_TOOL;

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
           
        },
        body: JSON.stringify(toolToCreate)
      })
      .then(response => response.json())
      .then(responseToolFromServer =>{
        console.log(responseToolFromServer);
      })
      .catch((error) => {
          console.log(error);
        alert(error);
      });
      props.onToolCreated(toolToCreate);
};

  return (
    <div>
        <form className='w-50 mx-auto'>
            <h2 className='mt-2'>Create new tool</h2><br></br>
            <div className='mt-2'>
                <label className='h5 form-label'>Tool Type</label>
                <input value={formData.toolType} name='toolType' type="text" className="form-control" placeholder='Tool Type...' onChange={handleChange} />
            </div>
            <div className='mt-2'>
                <label className='h5 form-label'>Amount</label>
                <input value={formData.amount} name='amount' type="number" className="form-control" placeholder='Amount...' onChange={handleChange} />
            </div>
            <div className='mt-2'>
                <label className='h5 form-label'>Department ID</label>
                <input value={formData.departmentId} name='departmentId' type="text" className="form-control" placeholder='Department ID...' onChange={handleChange} />
            </div>

            <button onClick={handleSubmit} className="btn btn-dark btn-lg w-100 mt-2">Submit</button>
            <button onClick={() => props.onToolCreated(null)} className="btn btn-secondary btn-lf 2-100 mt-2">Cancel</button>
        </form>
    </div>
  )
}
