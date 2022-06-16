import React, {useState} from 'react'
import Constants from '../utilities/Constants'

export default function BranchUpdateForm(props) {
    const initialFormData = Object.freeze({
        branchAddress: props.branch.branchAddress
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

    const branchToUpdate = {
        branchId: props.branch.branchId,
        branchAddress: formData.branchAddress
    };

    const url = Constants.API_URL_UPDATE_BRANCH;

    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
           
        },
        body: JSON.stringify(branchToUpdate)
      })
      .then(response => response.json())
      .then(responseBranchFromServer =>{
        console.log(responseBranchFromServer);
      })
      .catch((error) => {
          console.log(error);
        alert(error);
      });
      props.onBranchUpdated(branchToUpdate);
};

  return (
    <div>
        <form className='w-50 mx-auto'>
            <h2 className='mt-4'>Updating branch</h2>
            <div className='mt-4'>
                <label className='h3 form-label'>Branch Address</label>
                <input value={formData.branchAddress} name='branchAddress' type="text" className="form-control" onChange={handleChange} />
            </div>
            

            <button onClick={handleSubmit} className="btn btn-dark btn-lg w-100 mt-4">Submit</button>
            <button onClick={() => props.onBranchUpdated(null)} className="btn btn-secondary btn-lf 2-100 mt-3">Cancel</button>
        </form>
    </div>
  )
}
