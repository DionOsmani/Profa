import React, {useEffect, useState} from 'react'
import Constants from '../utilities/Constants';
import StaffPaymentCreateForm from './StaffPaymentCreateForm';
import StaffPaymentUpdateForm from './StaffPaymentUpdateForm';

function StaffPaymentTable()  {
    const [staffPayments, setStaffPayment] = useState([]);
    const [showingCreateNewStaffPaymentForm, setShowingCreateNewStaffPaymentForm] = useState(false);
    const [staffPaymentCurrentlyBeingUpdated, setStaffPaymentCurrentlyBeingUpdated] = useState(null);

    function getStaffPayment(){
    const url = Constants.API_URL_GET_ALL_STAFFPAYMENTS;
    
    fetch(url, {
      method: 'GET',
      headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => response.json())
    .then(staffPaymentsFromServer =>{
      console.log(staffPaymentsFromServer);
      setStaffPayment(staffPaymentsFromServer.value);
    })
    .catch((error) => {
        alert(localStorage.getItem('token'))
      alert(error);
    });
  }

  function deleteStaffPayment(paymentId){
    const url = `${Constants.API_URL_DELETE_STAFFPAYMENT_BY_ID}/${paymentId}`;
    
    fetch(url, {
      method: 'DELETE',
      headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => response.json())
    .then(responseFromServer =>{
      console.log(responseFromServer);
      onStaffPaymentDeleted(paymentId);
    })
    .catch((error) => {
        console.log(error);
      alert(error);
    });
  }
  
return (
    <div className='m-5'>
        
       { useEffect(() => {
    getStaffPayment();
  }, [])}
        
        {(staffPayments.length>0 && showingCreateNewStaffPaymentForm === false && staffPaymentCurrentlyBeingUpdated === null) && renderStaffPaymentTable() }
        
        {showingCreateNewStaffPaymentForm && <StaffPaymentCreateForm onStaffPaymentCreated={onStaffPaymentCreated}/>}

        {staffPaymentCurrentlyBeingUpdated!==null&& <StaffPaymentUpdateForm staffPayment={staffPaymentCurrentlyBeingUpdated} onStaffPaymentUpdated={onStaffPaymentUpdated} />}
    </div>
  )
  
function renderStaffPaymentTable(){
    return(
        
        <div className='w-75 mx-auto'>
        {localStorage.getItem('token') && localStorage.getItem('Role')=="Admin" && <button onClick={() => setShowingCreateNewStaffPaymentForm(true)} className='btn btn-outline-dark btn-lg w-25 float-right m-1'>Create new staffPayment</button>}
        <table className='table table-hover table-striped w-100 p-3 mx-auto'>
            <thead className='thead-dark'>
                <tr>
                    <th colSpan={9}>
                        <h4>StaffPayment</h4>
                    </th>
                </tr>
                <tr>
                    <th>Date</th>
                    <th>Staff ID</th>                 
                    {localStorage.getItem('token') && localStorage.getItem('Role')=="Admin" && <th>Update</th>}
                    {localStorage.getItem('token') && localStorage.getItem('Role')=="Admin" && <th>Delete</th>}
                </tr>
            </thead>
            <tbody>
                {staffPayments.map((staffPayment) => (
                    <tr key={staffPayment.paymentId}>
                        <td>{staffPayment.paymentDate}</td>
                        <td>{staffPayment.staffId}</td>
                        {localStorage.getItem('token') && localStorage.getItem('Role')=="Admin" && <td><button onClick={() => setStaffPaymentCurrentlyBeingUpdated(staffPayment) } className='btn btn-dark btn-lg mx-3 my-3'>Update</button></td>}
                        {localStorage.getItem('token') && localStorage.getItem('Role')=="Admin" && <td><button onClick={() => {if(window.confirm(`Are you sure you want to delete this staffPayment?`)) deleteStaffPayment(staffPayment.staffPaymentId)}} className='btn btn-secondary btn-lg mx-3 my-3'>Delete</button></td>}
                    </tr>
                ))}
            </tbody>
        </table>

    </div>
    )

    
}


function onStaffPaymentCreated(createdStaffPayment){
    setShowingCreateNewStaffPaymentForm(false);
    if(createdStaffPayment === null){
        return;
    }


    alert('StaffPayment successfully created');

    getStaffPayment();
}

function onStaffPaymentUpdated(updatedStaffPayment){
    setStaffPaymentCurrentlyBeingUpdated(null);
    if(updatedStaffPayment === null){
        return;
    }

    let staffPaymentsCopy=[...staffPayments];

    const index = staffPaymentsCopy.findIndex((staffPaymentsCopyStaffPayment, currentIndex) => {
        if(staffPaymentsCopyStaffPayment.staffPaymentId === updatedStaffPayment.staffPaymentId){
            return true;
        }
    });

    if(index!== -1){
        staffPaymentsCopy[index] = updatedStaffPayment;
    }
    setStaffPayment(staffPaymentsCopy);
    alert('StaffPayment successfully updated');

    getStaffPayment();
}


function onStaffPaymentDeleted(deletedStaffPaymentStaffPaymentId){
    let staffPaymentsCopy=[...staffPayments];

    const index = staffPaymentsCopy.findIndex((staffPaymentsCopyStaffPayment, currentIndex) => {
        if(staffPaymentsCopyStaffPayment.staffPaymentId === deletedStaffPaymentStaffPaymentId){
            return true;
        }
    });

    if(index!== -1){
        staffPaymentsCopy.splice(index,1);
    }
    setStaffPayment(staffPaymentsCopy);
    alert('StaffPayment successfully deleted');

    getStaffPayment();
}

}


export default StaffPaymentTable