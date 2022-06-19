import React, {useEffect, useState} from 'react'
import Constants from '../utilities/Constants';
import CustomerCreateForm from './CustomerCreateForm';
import CustomerUpdateForm from './CustomerUpdateForm';

function CustomerTable()  {
    const [customers, setCustomer] = useState([]);
    const [showingCreateNewCustomerForm, setShowingCreateNewCustomerForm] = useState(false);
    const [customerCurrentlyBeingUpdated, setCustomerCurrentlyBeingUpdated] = useState(null);

    function getCustomer(){
    const url = Constants.API_URL_GET_ALL_CUSTOMERS;
    
    fetch(url, {
      method: 'GET',
      headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => response.json())
    .then(customersFromServer =>{
      console.log(customersFromServer);
      setCustomer(customersFromServer.value);
    })
    .catch((error) => {
        alert(localStorage.getItem('token'))
      alert(error);
    });
  }

  function deleteCustomer(customerId){
    const url = `${Constants.API_URL_DELETE_CUSTOMER_BY_ID}/${customerId}`;
    
    fetch(url, {
      method: 'DELETE',
      headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => response.json())
    .then(responseFromServer =>{
      console.log(responseFromServer);
      onCustomerDeleted(customerId);
    })
    .catch((error) => {
        console.log(error);
      alert(error);
    });
  }
  
return (
    <div className='m-5'>
        
       { useEffect(() => {
    getCustomer();
  }, [])}
        
        {(customers.length>0 && showingCreateNewCustomerForm === false && customerCurrentlyBeingUpdated === null) && renderCustomerTable() }
        
        {showingCreateNewCustomerForm && <CustomerCreateForm onCustomerCreated={onCustomerCreated}/>}

        {customerCurrentlyBeingUpdated!==null&& <CustomerUpdateForm customer={customerCurrentlyBeingUpdated} onCustomerUpdated={onCustomerUpdated} />}
    </div>
  )
  
function renderCustomerTable(){
    return(
        
        <div className='w-75 mx-auto'>
        {localStorage.getItem('token') && localStorage.getItem('Role')=="Admin" && <button onClick={() => setShowingCreateNewCustomerForm(true)} className='btn btn-outline-dark btn-lg w-25 float-right m-1'>Create new customer</button>}
        <table className='table table-hover table-striped w-100 p-3 mx-auto'>
            <thead className='thead-dark'>
                <tr>
                    <th colSpan={9}>
                        <h4>Customer</h4>
                    </th>
                </tr>
                <tr>
                    <th>Company Name</th>
                    <th>Company Email</th>
                    <th>Company Address</th>                 
                    {localStorage.getItem('token') && localStorage.getItem('Role')=="Admin" && <th>Update</th>}
                    {localStorage.getItem('token') && localStorage.getItem('Role')=="Admin" && <th>Delete</th>}
                </tr>
            </thead>
            <tbody>
                {customers.map((customer) => (
                    <tr key={customer.customerId}>
                        <td>{customer.companyName}</td>
                        <td>{customer.companyEmail}</td>
                        <td>{customer.companyAddress}</td>
                        {localStorage.getItem('token') && localStorage.getItem('Role')=="Admin" && <td><button onClick={() => setCustomerCurrentlyBeingUpdated(customer) } className='btn btn-dark btn-lg mx-3 my-3'>Update</button></td>}
                        {localStorage.getItem('token') && localStorage.getItem('Role')=="Admin" && <td><button onClick={() => {if(window.confirm(`Are you sure you want to delete this customer?`)) deleteCustomer(customer.customerId)}} className='btn btn-secondary btn-lg mx-3 my-3'>Delete</button></td>}
                    </tr>
                ))}
            </tbody>
        </table>

    </div>
    )

    
}


function onCustomerCreated(createdCustomer){
    setShowingCreateNewCustomerForm(false);
    if(createdCustomer === null){
        return;
    }


    alert('Customer successfully created');

    getCustomer();
}

function onCustomerUpdated(updatedCustomer){
    setCustomerCurrentlyBeingUpdated(null);
    if(updatedCustomer === null){
        return;
    }

    let customersCopy=[...customers];

    const index = customersCopy.findIndex((customersCopyCustomer, currentIndex) => {
        if(customersCopyCustomer.customerId === updatedCustomer.customerId){
            return true;
        }
    });

    if(index!== -1){
        customersCopy[index] = updatedCustomer;
    }
    setCustomer(customersCopy);
    alert('Customer successfully updated');

    getCustomer();
}


function onCustomerDeleted(deletedCustomerCustomerId){
    let customersCopy=[...customers];

    const index = customersCopy.findIndex((customersCopyCustomer, currentIndex) => {
        if(customersCopyCustomer.customerId === deletedCustomerCustomerId){
            return true;
        }
    });

    if(index!== -1){
        customersCopy.splice(index,1);
    }
    setCustomer(customersCopy);
    alert('Customer successfully deleted');

    getCustomer();
}

}


export default CustomerTable