import React, {useEffect, useState} from 'react'
import Constants from '../utilities/Constants';
import BillCreateForm from './BillCreateForm';
import BillUpdateForm from './BillUpdateForm';

function BillTable()  {
    const [bills, setBill] = useState([]);
    const [showingCreateNewBillForm, setShowingCreateNewBillForm] = useState(false);
    const [billCurrentlyBeingUpdated, setBillCurrentlyBeingUpdated] = useState(null);

    function getBill(){
    const url = Constants.API_URL_GET_ALL_BILLS;
    
    fetch(url, {
      method: 'GET',
      headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => response.json())
    .then(billsFromServer =>{
      console.log(billsFromServer);
      setBill(billsFromServer.value);
    })
    .catch((error) => {
        alert(localStorage.getItem('token'))
      alert(error);
    });
  }

  function deleteBill(billId){
    const url = `${Constants.API_URL_DELETE_BILL_BY_ID}/${billId}`;
    
    fetch(url, {
      method: 'DELETE',
      headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => response.json())
    .then(responseFromServer =>{
      console.log(responseFromServer);
      onBillDeleted(billId);
    })
    .catch((error) => {
        console.log(error);
      alert(error);
    });
  }
  
return (
    <div className='m-5'>
        
       { useEffect(() => {
    getBill();
  }, [])}
        
        {(bills.length>0 && showingCreateNewBillForm === false && billCurrentlyBeingUpdated === null) && 
        localStorage.getItem('token')  && (
        localStorage.getItem('Role')==="Admin" ||
        localStorage.getItem('Role')==="HeadAdmin"  ||
        localStorage.getItem('Role')==="bHead"  ||
        localStorage.getItem('Role')==="dHead" ||
        localStorage.getItem('Role')==="secretary") 
        && renderBillTable() }
        
        {showingCreateNewBillForm && 
        localStorage.getItem('token')  && (
        localStorage.getItem('Role')==="Admin" ||
        localStorage.getItem('Role')==="HeadAdmin"  ||
        localStorage.getItem('Role')==="bHead"  ||
        localStorage.getItem('Role')==="dHead" ||
        localStorage.getItem('Role')==="secretary") 
        && <BillCreateForm onBillCreated={onBillCreated}/>}

        {billCurrentlyBeingUpdated!==null && 
        localStorage.getItem('token')  && (
        localStorage.getItem('Role')==="Admin" ||
        localStorage.getItem('Role')==="HeadAdmin"  ||
        localStorage.getItem('Role')==="bHead"  ||
        localStorage.getItem('Role')==="dHead" ||
        localStorage.getItem('Role')==="secretary") 
        && <BillUpdateForm bill={billCurrentlyBeingUpdated} onBillUpdated={onBillUpdated} />}
    </div>
  )
  
function renderBillTable(){
    return(
        
        <div className='w-75 mx-auto'>
        <button onClick={() => setShowingCreateNewBillForm(true)} className='btn btn-outline-dark btn-lg w-25 float-right m-1'>Create new bill</button>
        <table className='table table-hover table-striped w-100 p-3 mx-auto'>
            <thead className='thead-dark'>
                <tr>
                    <th colSpan={9}>
                        <h4>Bill</h4>
                    </th>
                </tr>
                <tr>
                    <th>Date</th>
                    <th>Product ID</th>
                    <th>Customer ID</th>                 
                    <th>Update</th>
                    {localStorage.getItem('token')  && (
                    localStorage.getItem('Role')==="Admin" ||
                    localStorage.getItem('Role')==="HeadAdmin"  ||
                    localStorage.getItem('Role')==="bHead" )  
                    &&<th>Delete</th>}
                </tr>
            </thead>
            <tbody>
                {bills.map((bill) => (
                    <tr key={bill.billId}>
                        <td>{bill.paymentDate}</td>
                        <td>{bill.productId}</td>
                        <td>{bill.customerId}</td>
                        <td><button onClick={() => setBillCurrentlyBeingUpdated(bill) } className='btn btn-dark btn-lg mx-3 my-3'>Update</button></td>
                        {localStorage.getItem('token')  && (
                        localStorage.getItem('Role')==="Admin" ||
                        localStorage.getItem('Role')==="HeadAdmin"  ||
                        localStorage.getItem('Role')==="bHead" )  
                        && <td><button onClick={() => {if(window.confirm(`Are you sure you want to delete this bill?`)) deleteBill(bill.billId)}} className='btn btn-secondary btn-lg mx-3 my-3'>Delete</button></td>}
                    </tr>
                ))}
            </tbody>
        </table>

    </div>
    )

    
}


function onBillCreated(createdBill){
    setShowingCreateNewBillForm(false);
    if(createdBill === null){
        return;
    }


    alert('Bill successfully created');

    getBill();
}

function onBillUpdated(updatedBill){
    setBillCurrentlyBeingUpdated(null);
    if(updatedBill === null){
        return;
    }

    let billsCopy=[...bills];

    const index = billsCopy.findIndex((billsCopyBill, currentIndex) => {
        if(billsCopyBill.billId === updatedBill.billId){
            return true;
        }
    });

    if(index!== -1){
        billsCopy[index] = updatedBill;
    }
    setBill(billsCopy);
    alert('Bill successfully updated');

    getBill();
}


function onBillDeleted(deletedBillBillId){
    let billsCopy=[...bills];

    const index = billsCopy.findIndex((billsCopyBill, currentIndex) => {
        if(billsCopyBill.billId === deletedBillBillId){
            return true;
        }
    });

    if(index!== -1){
        billsCopy.splice(index,1);
    }
    setBill(billsCopy);
    alert('Bill successfully deleted');

    getBill();
}

}


export default BillTable