import React, {useState} from 'react'
import Constants from '../utilities/Constants'

export default function ComplaintUpdateForm(props) {
    const initialFormData = Object.freeze({
        complaints: props.complaint.complaints,
        staffId: props.complaint.staffId,
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

    const complaintToUpdate = {
        complaintId: props.complaint.complaintId,
        complaints: formData.complaints,
        staffId: formData.staffId,
    };

    const url = Constants.API_URL_UPDATE_COMPLAINT;

    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(complaintToUpdate)
      })
      .then(response => response.json())
      .then(responseComplaintFromServer =>{
        console.log(responseComplaintFromServer);
      })
      .catch((error) => {
          console.log(error);
        alert(error);
      });
      props.onComplaintUpdated(complaintToUpdate);
};

  return (
    <div>
        <form className='w-50 mx-auto'>
            <h2 className='mt-2'>Updating complaint</h2>
            <div className='mt-2'>
                <label className='h5 form-label'>Complaint</label>
                <input value={formData.complaints} name='complaints' type="text" className="form-control" placeholder='Complaint...' onChange={handleChange} />
            </div>
            <div className='mt-2'>
                <label className='h5 form-label'>Staff ID</label>
                <input value={formData.staffId} name='staffId' type="number" className="form-control" placeholder='Staff ID...' onChange={handleChange} />
            </div>
            

            <button onClick={handleSubmit} className="btn btn-dark btn-lg w-100 mt-2">Submit</button>
            <button onClick={() => props.onComplaintUpdated(null)} className="btn btn-secondary btn-lf 2-100 mt-3">Cancel</button>
        </form>
    </div>
  )
}
