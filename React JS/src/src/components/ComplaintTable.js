import React, {useEffect, useState} from 'react'
import Constants from '../utilities/Constants';
import ComplaintCreateForm from './ComplaintCreateForm';
import ComplaintUpdateForm from './ComplaintUpdateForm';

function ComplaintTable()  {
    const [complaints, setComplaint] = useState([]);
    const [showingCreateNewComplaintForm, setShowingCreateNewComplaintForm] = useState(false);
    const [complaintCurrentlyBeingUpdated, setComplaintCurrentlyBeingUpdated] = useState(null);

    function getComplaint(){
    const url = Constants.API_URL_GET_ALL_COMPLAINTS;
    
    fetch(url, {
      method: 'GET',
      headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => response.json())
    .then(complaintsFromServer =>{
      console.log(complaintsFromServer);
      setComplaint(complaintsFromServer.value);
    })
    .catch((error) => {
        alert(localStorage.getItem('token'))
      alert(error);
    });
  }

  function deleteComplaint(complaintId){
    const url = `${Constants.API_URL_DELETE_COMPLAINT_BY_ID}/${complaintId}`;
    
    fetch(url, {
      method: 'DELETE',
      headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => response.json())
    .then(responseFromServer =>{
      console.log(responseFromServer);
      onComplaintDeleted(complaintId);
    })
    .catch((error) => {
        console.log(error);
      alert(error);
    });
  }
  
return (
    <div className='m-5'>
        
       { useEffect(() => {
    getComplaint();
  }, [])}
        
        {(complaints.length>0 && showingCreateNewComplaintForm === false && complaintCurrentlyBeingUpdated === null) && renderComplaintTable() }
        
        {showingCreateNewComplaintForm && <ComplaintCreateForm onComplaintCreated={onComplaintCreated}/>}

        {complaintCurrentlyBeingUpdated!==null&& <ComplaintUpdateForm complaint={complaintCurrentlyBeingUpdated} onComplaintUpdated={onComplaintUpdated} />}
    </div>
  )
  
function renderComplaintTable(){
    return(
        
        <div className='w-75 mx-auto'>
        {localStorage.getItem('token') && localStorage.getItem('Role')=="Admin" && <button onClick={() => setShowingCreateNewComplaintForm(true)} className='btn btn-outline-dark btn-lg w-25 float-right m-1'>Create new complaint</button>}
        <table className='table table-hover table-striped w-100 p-3 mx-auto'>
            <thead className='thead-dark'>
                <tr>
                    <th colSpan={9}>
                        <h4>Complaint</h4>
                    </th>
                </tr>
                <tr>
                    <th>Complaint</th>
                    <th>Staff ID</th>
                    {localStorage.getItem('token') && localStorage.getItem('Role')=="Admin" && <th>Update</th>}
                    {localStorage.getItem('token') && localStorage.getItem('Role')=="Admin" && <th>Delete</th>}
                </tr>
            </thead>
            <tbody>
                {complaints.map((complaint) => (
                    <tr key={complaint.complaintId}>
                        <td>{complaint.complaints}</td>
                        <td>{complaint.staffId}</td>
                        {localStorage.getItem('token') && localStorage.getItem('Role')=="Admin" && <td><button onClick={() => setComplaintCurrentlyBeingUpdated(complaint) } className='btn btn-dark btn-lg mx-3 my-3'>Update</button></td>}
                        {localStorage.getItem('token') && localStorage.getItem('Role')=="Admin" && <td><button onClick={() => {if(window.confirm(`Are you sure you want to delete this complaint?`)) deleteComplaint(complaint.complaintId)}} className='btn btn-secondary btn-lg mx-3 my-3'>Delete</button></td>}
                    </tr>
                ))}
            </tbody>
        </table>

    </div>
    )

    
}


function onComplaintCreated(createdComplaint){
    setShowingCreateNewComplaintForm(false);
    if(createdComplaint === null){
        return;
    }


    alert('Complaint successfully created');

    getComplaint();
}

function onComplaintUpdated(updatedComplaint){
    setComplaintCurrentlyBeingUpdated(null);
    if(updatedComplaint === null){
        return;
    }

    let complaintsCopy=[...complaints];

    const index = complaintsCopy.findIndex((complaintsCopyComplaint, currentIndex) => {
        if(complaintsCopyComplaint.complaintId === updatedComplaint.complaintId){
            return true;
        }
    });

    if(index!== -1){
        complaintsCopy[index] = updatedComplaint;
    }
    setComplaint(complaintsCopy);
    alert('Complaint successfully updated');

    getComplaint();
}


function onComplaintDeleted(deletedComplaintComplaintId){
    let complaintsCopy=[...complaints];

    const index = complaintsCopy.findIndex((complaintsCopyComplaint, currentIndex) => {
        if(complaintsCopyComplaint.complaintId === deletedComplaintComplaintId){
            return true;
        }
    });

    if(index!== -1){
        complaintsCopy.splice(index,1);
    }
    setComplaint(complaintsCopy);
    alert('Complaint successfully deleted');

    getComplaint();
}

}


export default ComplaintTable