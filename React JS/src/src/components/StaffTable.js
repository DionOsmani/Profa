import React, {useEffect, useState} from 'react'
import Constants from '../utilities/Constants';
import StaffCreateForm from './StaffCreateForm';
import StaffUpdateForm from './StaffUpdateForm';

function StaffTable()  {
    const [staffs, setStaff] = useState([]);
    const [showingCreateNewStaffForm, setShowingCreateNewStaffForm] = useState(false);
    const [staffCurrentlyBeingUpdated, setStaffCurrentlyBeingUpdated] = useState(null);

    function getStaff(){
    const url = Constants.API_URL_GET_ALL_STAFFS;
    
    fetch(url, {
      method: 'GET',
      headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => response.json())
    .then(staffsFromServer =>{
      console.log(staffsFromServer);
      setStaff(staffsFromServer.value);
    })
    .catch((error) => {
        alert(localStorage.getItem('token'))
      alert(error);
    });
  }

  function deleteStaff(staffId){
    const url = `${Constants.API_URL_DELETE_STAFF_BY_ID}/${staffId}`;
    
    fetch(url, {
      method: 'DELETE',
      headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => response.json())
    .then(responseFromServer =>{
      console.log(responseFromServer);
      onStaffDeleted(staffId);
    })
    .catch((error) => {
        console.log(error);
      alert(error);
    });
  }
  
return (
    <div className='m-5'>
        
       { useEffect(() => {
    getStaff();
  }, [])}
        
        {(staffs.length>0 && showingCreateNewStaffForm === false && staffCurrentlyBeingUpdated === null) && renderStaffTable() }
        
        {showingCreateNewStaffForm && <StaffCreateForm onStaffCreated={onStaffCreated}/>}

        {staffCurrentlyBeingUpdated!==null&& <StaffUpdateForm staff={staffCurrentlyBeingUpdated} onStaffUpdated={onStaffUpdated} />}
    </div>
  )
  
function renderStaffTable(){
    return(
        
        <div className='w-75 mx-auto'>
        {localStorage.getItem('token') && localStorage.getItem('Role')=="Admin" && <button onClick={() => setShowingCreateNewStaffForm(true)} className='btn btn-outline-dark btn-lg w-25 float-right m-1'>Create new staff</button>}
        <table className='table table-hover table-striped w-100 p-3 mx-auto'>
            <thead className='thead-dark'>
                <tr>
                    <th colSpan={9}>
                        <h4>Staff</h4>
                    </th>
                </tr>
                <tr>
                    <th>Name</th>
                    <th>Surname</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>Age</th>
                    <th>Gender</th>
                    <th>Wage</th>
                    <th>Role</th>                    
                    {localStorage.getItem('token') && localStorage.getItem('Role')=="Admin" && <th>Update</th>}
                    {localStorage.getItem('token') && localStorage.getItem('Role')=="Admin" && <th>Delete</th>}
                </tr>
            </thead>
            <tbody>
                {staffs.map((staff) => (
                    <tr key={staff.staffId}>
                        <td>{staff.firstname}</td>
                        <td>{staff.surname}</td>
                        <td>{staff.email}</td>
                        <td>{staff.phoneNumber}</td>
                        <td>{staff.age}</td>
                        <td>{staff.gjinia}</td>
                        <td>{staff.wage}</td>
                        <td>{staff.role}</td>
                        {localStorage.getItem('token') && localStorage.getItem('Role')=="Admin" && <td><button onClick={() => setStaffCurrentlyBeingUpdated(staff) } className='btn btn-dark btn-lg mx-3 my-3'>Update</button></td>}
                        {localStorage.getItem('token') && localStorage.getItem('Role')=="Admin" && <td><button onClick={() => {if(window.confirm(`Are you sure you want to delete the staff named "${staff.firstname}"?`)) deleteStaff(staff.staffId)}} className='btn btn-secondary btn-lg mx-3 my-3'>Delete</button></td>}
                    </tr>
                ))}
            </tbody>
        </table>

    </div>
    )

    
}


function onStaffCreated(createdStaff){
    setShowingCreateNewStaffForm(false);
    if(createdStaff === null){
        return;
    }


    alert('Staff successfully created');

    getStaff();
}

function onStaffUpdated(updatedStaff){
    setStaffCurrentlyBeingUpdated(null);
    if(updatedStaff === null){
        return;
    }

    let staffsCopy=[...staffs];

    const index = staffsCopy.findIndex((staffsCopyStaff, currentIndex) => {
        if(staffsCopyStaff.staffId === updatedStaff.staffId){
            return true;
        }
    });

    if(index!== -1){
        staffsCopy[index] = updatedStaff;
    }
    setStaff(staffsCopy);
    alert('Staff successfully updated');

    getStaff();
}


function onStaffDeleted(deletedStaffStaffId){
    let staffsCopy=[...staffs];

    const index = staffsCopy.findIndex((staffsCopyStaff, currentIndex) => {
        if(staffsCopyStaff.staffId === deletedStaffStaffId){
            return true;
        }
    });

    if(index!== -1){
        staffsCopy.splice(index,1);
    }
    setStaff(staffsCopy);
    alert('Staff successfully deleted');

    getStaff();
}

}


export default StaffTable