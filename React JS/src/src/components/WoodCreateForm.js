import React, {useState} from 'react'
import Constants from '../utilities/Constants'

export default function WoodCreateForm(props) {
    const initialFormData = Object.freeze({
        barCode: "",
        amount: "",
        branchId: ""
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

    const woodToCreate = {
        woodId: 0,
        barCode: formData.barCode,
        amount: formData.amount,
        branchId: formData.branchId
    };

    const url = Constants.API_URL_CREATE_WOOD;

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
           
        },
        body: JSON.stringify(woodToCreate)
      })
      .then(response => response.json())
      .then(responseWoodFromServer =>{
        console.log(responseWoodFromServer);
      })
      .catch((error) => {
          console.log(error);
        alert(error);
      });
      props.onWoodCreated(woodToCreate);
};

  return (
    <div>
        <form className='w-50 mx-auto'>
            <h2 className='mt-2'>Create new wood</h2><br></br>
            <div className='mt-2'>
                <label className='h5 form-label'>Barcode</label>
                <input value={formData.barCode} name='barCode' type="text" className="form-control" placeholder='Barcode...' onChange={handleChange} />
            </div>
            <div className='mt-2'>
                <label className='h5 form-label'>Amount</label>
                <input value={formData.amount} name='amount' type="number" className="form-control" placeholder='Amount...' onChange={handleChange} />
            </div>
            <div className='mt-2'>
                <label className='h5 form-label'>Branch ID</label>
                <input value={formData.branchId} name='branchId' type="number" className="form-control" placeholder='Branch ID...' onChange={handleChange} />
            </div>

            <button onClick={handleSubmit} className="btn btn-dark btn-lg w-100 mt-2">Submit</button>
            <button onClick={() => props.onWoodCreated(null)} className="btn btn-secondary btn-lf 2-100 mt-2">Cancel</button>
        </form>
    </div>
  )
}
