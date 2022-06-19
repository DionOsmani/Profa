import React, {useEffect, useState} from 'react'
import Constants from '../utilities/Constants';
import MachineryCreateForm from './MachineryCreateForm';
import MachineryUpdateForm from './MachineryUpdateForm';

function MachineryTable()  {
    const [machineries, setMachinery] = useState([]);
    const [showingCreateNewMachineryForm, setShowingCreateNewMachineryForm] = useState(false);
    const [machineryCurrentlyBeingUpdated, setMachineryCurrentlyBeingUpdated] = useState(null);

    function getMachinery(){
    const url = Constants.API_URL_GET_ALL_MACHINERIES;
    
    fetch(url, {
      method: 'GET',
      headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => response.json())
    .then(machineriesFromServer =>{
      console.log(machineriesFromServer);
      setMachinery(machineriesFromServer.value);
    })
    .catch((error) => {
        alert(localStorage.getItem('token'))
      alert(error);
    });
  }

  function deleteMachinery(machineryId){
    const url = `${Constants.API_URL_DELETE_MACHINERY_BY_ID}/${machineryId}`;
    
    fetch(url, {
      method: 'DELETE',
      headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => response.json())
    .then(responseFromServer =>{
      console.log(responseFromServer);
      onMachineryDeleted(machineryId);
    })
    .catch((error) => {
        console.log(error);
      alert(error);
    });
  }
  
return (
    <div className='m-5'>
        
       { useEffect(() => {
    getMachinery();
  }, [])}
        
        {(machineries.length>0 && showingCreateNewMachineryForm === false && machineryCurrentlyBeingUpdated === null) && renderMachineryTable() }
        
        {showingCreateNewMachineryForm && <MachineryCreateForm onMachineryCreated={onMachineryCreated}/>}

        {machineryCurrentlyBeingUpdated!==null&& <MachineryUpdateForm machinery={machineryCurrentlyBeingUpdated} onMachineryUpdated={onMachineryUpdated} />}
    </div>
  )
  
function renderMachineryTable(){
    return(
        
        <div className='w-75 mx-auto'>
        {localStorage.getItem('token') && localStorage.getItem('Role')=="Admin" && <button onClick={() => setShowingCreateNewMachineryForm(true)} className='btn btn-outline-dark btn-lg w-25 float-right m-1'>Create new machinery</button>}
        <table className='table table-hover table-striped w-100 p-3 mx-auto'>
            <thead className='thead-dark'>
                <tr>
                    <th colSpan={9}>
                        <h4>Machinery</h4>
                    </th>
                </tr>
                <tr>
                    <th>Machinery Name</th>
                    <th>Department ID</th>                 
                    {localStorage.getItem('token') && localStorage.getItem('Role')=="Admin" && <th>Update</th>}
                    {localStorage.getItem('token') && localStorage.getItem('Role')=="Admin" && <th>Delete</th>}
                </tr>
            </thead>
            <tbody>
                {machineries.map((machinery) => (
                    <tr key={machinery.machineryId}>
                        <td>{machinery.machineryName}</td>
                        <td>{machinery.departmentId}</td>
                        {localStorage.getItem('token') && localStorage.getItem('Role')=="Admin" && <td><button onClick={() => setMachineryCurrentlyBeingUpdated(machinery) } className='btn btn-dark btn-lg mx-3 my-3'>Update</button></td>}
                        {localStorage.getItem('token') && localStorage.getItem('Role')=="Admin" && <td><button onClick={() => {if(window.confirm(`Are you sure you want to delete this machinery?`)) deleteMachinery(machinery.machineryId)}} className='btn btn-secondary btn-lg mx-3 my-3'>Delete</button></td>}
                    </tr>
                ))}
            </tbody>
        </table>

    </div>
    )

    
}


function onMachineryCreated(createdMachinery){
    setShowingCreateNewMachineryForm(false);
    if(createdMachinery === null){
        return;
    }


    alert('Machinery successfully created');

    getMachinery();
}

function onMachineryUpdated(updatedMachinery){
    setMachineryCurrentlyBeingUpdated(null);
    if(updatedMachinery === null){
        return;
    }

    let machineriesCopy=[...machineries];

    const index = machineriesCopy.findIndex((machineriesCopyMachinery, currentIndex) => {
        if(machineriesCopyMachinery.machineryId === updatedMachinery.machineryId){
            return true;
        }
    });

    if(index!== -1){
        machineriesCopy[index] = updatedMachinery;
    }
    setMachinery(machineriesCopy);
    alert('Machinery successfully updated');

    getMachinery();
}


function onMachineryDeleted(deletedMachineryMachineryId){
    let machineriesCopy=[...machineries];

    const index = machineriesCopy.findIndex((machineriesCopyMachinery, currentIndex) => {
        if(machineriesCopyMachinery.machineryId === deletedMachineryMachineryId){
            return true;
        }
    });

    if(index!== -1){
        machineriesCopy.splice(index,1);
    }
    setMachinery(machineriesCopy);
    alert('Machinery successfully deleted');

    getMachinery();
}

}


export default MachineryTable