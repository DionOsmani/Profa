import React, {useState} from 'react'
import Constants from '../utilities/Constants'

export default function IssueUpdateForm(props) {
    const initialFormData = Object.freeze({
      issues: props.issue.issues,
        staffId: props.issue.staffId
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

    const issueToUpdate = {
        issuesId: props.issue.issuesId,
        issues: formData.issues,
        staffId: formData.staffId
    };

    const url = Constants.API_URL_UPDATE_ISSUE;

    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(issueToUpdate)
      })
      .then(response => response.json())
      .then(responseIssueFromServer =>{
        console.log(responseIssueFromServer);
      })
      .catch((error) => {
          console.log(error);
        alert(error);
      });
      props.onIssueUpdated(issueToUpdate);
};

  return (
    <div>
        <form className='w-50 mx-auto'>
            <h2 className='mt-2'>Updating issue</h2>
            <div className='mt-2'>
                <label className='h5 form-label'>Issue</label>
                <input value={formData.issues} name='issues' type="text" className="form-control" placeholder='Issue...' onChange={handleChange} />
            </div>
            <div className='mt-2'>
                <label className='h5 form-label'>Staff ID</label>
                <input value={formData.staffId} name='staffId' type="number" className="form-control" placeholder='Product ID...' onChange={handleChange} />
            </div>

            <button onClick={handleSubmit} className="btn btn-dark btn-lg w-100 mt-2">Submit</button>
            <button onClick={() => props.onIssueUpdated(null)} className="btn btn-secondary btn-lf 2-100 mt-3">Cancel</button>
        </form>
    </div>
  )
}
