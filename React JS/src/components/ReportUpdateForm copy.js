import React, {useState} from 'react'
import Constants from '../utilities/Constants'

export default function ReportUpdateForm(props) {
    const initialFormData = Object.freeze({
        report1: props.report.report1,
        staffId: props.report.staffId
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

    const reportToUpdate = {
        reportId: props.report.reportId,
        report1: formData.report1,
        staffId: formData.staffId
    };

    const url = Constants.API_URL_UPDATE_REPORT;

    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(reportToUpdate)
      })
      .then(response => response.json())
      .then(responseReportFromServer =>{
        console.log(responseReportFromServer);
      })
      .catch((error) => {
          console.log(error);
        alert(error);
      });
      props.onReportUpdated(reportToUpdate);
};

  return (
    <div>
        <form className='w-50 mx-auto'>
            <h2 className='mt-2'>Updating report</h2>
            <div className='mt-2'>
                <label className='h5 form-label'>Report </label>
                <input value={formData.report1} name='report1' type="text" className="form-control" placeholder='Report...' onChange={handleChange} />
            </div>
            <div className='mt-2'>
                <label className='h5 form-label'>Staff ID</label>
                <input value={formData.staffId} name='staffId' type="number" className="form-control" placeholder='Staff ID...' onChange={handleChange} />
            </div>

            <button onClick={handleSubmit} className="btn btn-dark btn-lg w-100 mt-2">Submit</button>
            <button onClick={() => props.onReportUpdated(null)} className="btn btn-secondary btn-lf 2-100 mt-3">Cancel</button>
        </form>
    </div>
  )
}
