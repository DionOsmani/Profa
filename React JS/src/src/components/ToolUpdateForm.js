import React, {useState} from 'react'
import Constants from '../utilities/Constants'

export default function ToolUpdateForm(props) {
    const initialFormData = Object.freeze({
        toolType: props.tool.toolType,
        amount: props.tool.amount,
        departmentId: props.tool.departmentId
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

    const toolToUpdate = {
        toolId: props.tool.toolId,
        toolType: formData.toolType,
        amount: formData.amount,
        departmentId: formData.departmentId
    };

    const url = Constants.API_URL_UPDATE_TOOL;

    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(toolToUpdate)
      })
      .then(response => response.json())
      .then(responseToolFromServer =>{
        console.log(responseToolFromServer);
      })
      .catch((error) => {
          console.log(error);
        alert(error);
      });
      props.onToolUpdated(toolToUpdate);
};

  return (
    <div>
        <form className='w-50 mx-auto'>
            <h2 className='mt-2'>Updating tool</h2>
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
            <button onClick={() => props.onToolUpdated(null)} className="btn btn-secondary btn-lf 2-100 mt-3">Cancel</button>
        </form>
    </div>
  )
}
