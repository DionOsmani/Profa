import React, {useState} from 'react'
import Constants from '../utilities/Constants'

export default function MaterialUpdateForm(props) {
    const initialFormData = Object.freeze({
        materialType: props.material.materialType,
        amount: props.material.amount,
        barCode: props.material.barCode,
        departmentId: props.material.departmentId
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

    const materialToUpdate = {
        materialId: props.material.materialId,
        materialType: formData.materialType,
        amount: formData.amount,
        barCode: formData.barCode,
        departmentId: formData.departmentId
    };

    const url = Constants.API_URL_UPDATE_MATERIAL;

    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(materialToUpdate)
      })
      .then(response => response.json())
      .then(responseMaterialFromServer =>{
        console.log(responseMaterialFromServer);
      })
      .catch((error) => {
          console.log(error);
        alert(error);
      });
      props.onMaterialUpdated(materialToUpdate);
};

  return (
    <div>
        <form className='w-50 mx-auto'>
            <h2 className='mt-2'>Updating material</h2>
            <div className='mt-2'>
                <label className='h5 form-label'>Material Type</label>
                <input value={formData.materialType} name='materialType' type="text" className="form-control" placeholder='Material Type...' onChange={handleChange} />
            </div>
            <div className='mt-2'>
                <label className='h5 form-label'>Amount</label>
                <input value={formData.amount} name='amount' type="number" className="form-control" placeholder='Amount...' onChange={handleChange} />
            </div>
            <div className='mt-2'>
                <label className='h5 form-label'>Barcode</label>
                <input value={formData.barCode} name='barCode' type="text" className="form-control" placeholder='Barcode...' onChange={handleChange} />
            </div>
            <div className='mt-2'>
                <label className='h5 form-label'>Department ID</label>
                <input value={formData.departmentId} name='departmentId' type="number" className="form-control" placeholder='Department ID...' onChange={handleChange} />
            </div>

            <button onClick={handleSubmit} className="btn btn-dark btn-lg w-100 mt-2">Submit</button>
            <button onClick={() => props.onMaterialUpdated(null)} className="btn btn-secondary btn-lf 2-100 mt-3">Cancel</button>
        </form>
    </div>
  )
}
