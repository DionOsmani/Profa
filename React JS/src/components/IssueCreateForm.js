import React, {useState} from 'react'
import Constants from '../utilities/Constants'

export default function IssueCreateForm(props) {
    const initialFormData = Object.freeze({
        issues: "",
        staffId: ""
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

    const issueToCreate = {
        issuesId: 0,
        issues: formData.issues,
        staffId: formData.staffId
    };

    const url = Constants.API_URL_CREATE_ISSUE;

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
           
        },
        body: JSON.stringify(issueToCreate)
      })
      .then(response => response.json())
      .then(responseIssueFromServer =>{
        console.log(responseIssueFromServer);
      })
      .catch((error) => {
          console.log(error);
        alert(error);
      });
      props.onIssueCreated(issueToCreate);
};

  return (
    <div>
        <form className='w-50 mx-auto'>
            <h2 className='mt-2'>Create new issue</h2><br></br>
            <div className='mt-2'>
                <label className='h5 form-label'>Issue</label>
                <input value={formData.issues} name='issues' type="text" className="form-control" placeholder='Issue...' onChange={handleChange} />
            </div>
            <div className='mt-2'>
                <label className='h5 form-label'>Staff ID</label>
                <input value={formData.staffId} name='staffId' type="number" className="form-control" placeholder='Staff ID...' onChange={handleChange} />
            </div>

            <button onClick={handleSubmit} className="btn btn-dark btn-lg w-100 mt-2">Submit</button>
            <button onClick={() => props.onIssueCreated(null)} className="btn btn-secondary btn-lf 2-100 mt-2">Cancel</button>
        </form>
    </div>
  )
}
