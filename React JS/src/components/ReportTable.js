import React, {useEffect, useState} from 'react'
import Constants from '../utilities/Constants';
import ReportCreateForm from './ReportCreateForm';
import ReportUpdateForm from './ReportUpdateForm';

function ReportTable()  {
    const [reports, setReport] = useState([]);
    const [showingCreateNewReportForm, setShowingCreateNewReportForm] = useState(false);
    const [reportCurrentlyBeingUpdated, setReportCurrentlyBeingUpdated] = useState(null);

    function getReport(){
    const url = Constants.API_URL_GET_ALL_REPORTS;
    
    fetch(url, {
      method: 'GET',
      headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => response.json())
    .then(reportsFromServer =>{
      console.log(reportsFromServer);
      setReport(reportsFromServer.value);
    })
    .catch((error) => {
        alert(localStorage.getItem('token'))
      alert(error);
    });
  }

  function deleteReport(reportId){
    const url = `${Constants.API_URL_DELETE_REPORT_BY_ID}/${reportId}`;
    
    fetch(url, {
      method: 'DELETE',
      headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => response.json())
    .then(responseFromServer =>{
      console.log(responseFromServer);
      onReportDeleted(reportId);
    })
    .catch((error) => {
        console.log(error);
      alert(error);
    });
  }
  
return (
    <div className='m-5'>
        
       { useEffect(() => {
    getReport();
  }, [])}
        
        {(reports.length>0 && showingCreateNewReportForm === false && reportCurrentlyBeingUpdated === null) && renderReportTable() }
        
        {showingCreateNewReportForm && <ReportCreateForm onReportCreated={onReportCreated}/>}

        {reportCurrentlyBeingUpdated!==null&& <ReportUpdateForm report={reportCurrentlyBeingUpdated} onReportUpdated={onReportUpdated} />}
    </div>
  )
  
function renderReportTable(){
    return(
        
        <div className='w-75 mx-auto'>
        {localStorage.getItem('token') && localStorage.getItem('Role')=="Admin" && <button onClick={() => setShowingCreateNewReportForm(true)} className='btn btn-outline-dark btn-lg w-25 float-right m-1'>Create new report</button>}
        <table className='table table-hover table-striped w-100 p-3 mx-auto'>
            <thead className='thead-dark'>
                <tr>
                    <th colSpan={9}>
                        <h4>Report</h4>
                    </th>
                </tr>
                <tr>
                    <th>Report</th>
                    <th>Staff ID</th>                 
                    {localStorage.getItem('token') && localStorage.getItem('Role')=="Admin" && <th>Update</th>}
                    {localStorage.getItem('token') && localStorage.getItem('Role')=="Admin" && <th>Delete</th>}
                </tr>
            </thead>
            <tbody>
                {reports.map((report) => (
                    <tr key={report.reportId}>
                        <td>{report.report1}</td>
                        <td>{report.staffId}</td>
                        {localStorage.getItem('token') && localStorage.getItem('Role')=="Admin" && <td><button onClick={() => setReportCurrentlyBeingUpdated(report) } className='btn btn-dark btn-lg mx-3 my-3'>Update</button></td>}
                        {localStorage.getItem('token') && localStorage.getItem('Role')=="Admin" && <td><button onClick={() => {if(window.confirm(`Are you sure you want to delete this report?`)) deleteReport(report.reportId)}} className='btn btn-secondary btn-lg mx-3 my-3'>Delete</button></td>}
                    </tr>
                ))}
            </tbody>
        </table>

    </div>
    )

    
}


function onReportCreated(createdReport){
    setShowingCreateNewReportForm(false);
    if(createdReport === null){
        return;
    }


    alert('Report successfully created');

    getReport();
}

function onReportUpdated(updatedReport){
    setReportCurrentlyBeingUpdated(null);
    if(updatedReport === null){
        return;
    }

    let reportsCopy=[...reports];

    const index = reportsCopy.findIndex((reportsCopyReport, currentIndex) => {
        if(reportsCopyReport.reportId === updatedReport.reportId){
            return true;
        }
    });

    if(index!== -1){
        reportsCopy[index] = updatedReport;
    }
    setReport(reportsCopy);
    alert('Report successfully updated');

    getReport();
}


function onReportDeleted(deletedReportReportId){
    let reportsCopy=[...reports];

    const index = reportsCopy.findIndex((reportsCopyReport, currentIndex) => {
        if(reportsCopyReport.reportId === deletedReportReportId){
            return true;
        }
    });

    if(index!== -1){
        reportsCopy.splice(index,1);
    }
    setReport(reportsCopy);
    alert('Report successfully deleted');

    getReport();
}

}


export default ReportTable