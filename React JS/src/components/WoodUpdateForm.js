import React, {useState} from 'react'
import Constants from '../utilities/Constants'

export default function WoodUpdateForm(props) {
    const initialFormData = Object.freeze({
        barCode: props.wood.barCode,
        amount: props.wood.amount,
        branchId: props.wood.branchId
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

    const woodToUpdate = {
        woodId: props.wood.woodId,
        barCode: formData.barCode,
        amount: formData.amount,
        branchId: formData.branchId
    };

    const url = Constants.API_URL_UPDATE_WOOD;

    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(woodToUpdate)
      })
      .then(response => response.json())
      .then(responseWoodFromServer =>{
        console.log(responseWoodFromServer);
      })
      .catch((error) => {
          console.log(error);
        alert(error);
      });
      props.onWoodUpdated(woodToUpdate);
};

  return (
    <div>
        <form className='w-50 mx-auto'>
            <h2 className='mt-2'>Updating wood</h2>
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
            <button onClick={() => props.onWoodUpdated(null)} className="btn btn-secondary btn-lf 2-100 mt-3">Cancel</button>
        </form>
    </div>
  )
}
