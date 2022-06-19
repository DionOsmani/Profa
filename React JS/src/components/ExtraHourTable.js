import React, {useEffect, useState} from 'react'
import Constants from '../utilities/Constants';
import ExtraHourCreateForm from './ExtraHourCreateForm';
import ExtraHourUpdateForm from './ExtraHourUpdateForm';

function ExtraHourTable()  {
    const [extraHours, setExtraHour] = useState([]);
    const [showingCreateNewExtraHourForm, setShowingCreateNewExtraHourForm] = useState(false);
    const [extraHourCurrentlyBeingUpdated, setExtraHourCurrentlyBeingUpdated] = useState(null);

    function getExtraHour(){
    const url = Constants.API_URL_GET_ALL_EXTRAHOURS;
    
    fetch(url, {
      method: 'GET',
      headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => response.json())
    .then(extraHoursFromServer =>{
      console.log(extraHoursFromServer);
      setExtraHour(extraHoursFromServer.value);
    })
    .catch((error) => {
        alert(localStorage.getItem('token'))
      alert(error);
    });
  }

  function deleteExtraHour(hoursId){
    const url = `${Constants.API_URL_DELETE_EXTRAHOUR_BY_ID}/${hoursId}`;
    
    fetch(url, {
      method: 'DELETE',
      headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => response.json())
    .then(responseFromServer =>{
      console.log(responseFromServer);
      onExtraHourDeleted(hoursId);
    })
    .catch((error) => {
        console.log(error);
      alert(error);
    });
  }
  
return (
    <div className='m-5'>
        
       { useEffect(() => {
    getExtraHour();
  }, [])}
        
        {(extraHours.length>0 && showingCreateNewExtraHourForm === false && extraHourCurrentlyBeingUpdated === null) && renderExtraHourTable() }
        
        {showingCreateNewExtraHourForm && <ExtraHourCreateForm onExtraHourCreated={onExtraHourCreated}/>}

        {extraHourCurrentlyBeingUpdated!==null&& <ExtraHourUpdateForm extraHour={extraHourCurrentlyBeingUpdated} onExtraHourUpdated={onExtraHourUpdated} />}
    </div>
  )
  
function renderExtraHourTable(){
    return(
        
        <div className='w-75 mx-auto'>
        {localStorage.getItem('token') && localStorage.getItem('Role')=="Admin" && <button onClick={() => setShowingCreateNewExtraHourForm(true)} className='btn btn-outline-dark btn-lg w-25 float-right m-1'>Create new extraHour</button>}
        <table className='table table-hover table-striped w-100 p-3 mx-auto'>
            <thead className='thead-dark'>
                <tr>
                    <th colSpan={9}>
                        <h4>ExtraHour</h4>
                    </th>
                </tr>
                <tr>
                    <th>Date</th>
                    <th>Hours</th>
                    <th>Staff ID</th>                 
                    {localStorage.getItem('token') && localStorage.getItem('Role')=="Admin" && <th>Update</th>}
                    {localStorage.getItem('token') && localStorage.getItem('Role')=="Admin" && <th>Delete</th>}
                </tr>
            </thead>
            <tbody>
                {extraHours.map((extraHour) => (
                    <tr key={extraHour.hoursId}>
                        <td>{extraHour.hoursDate}</td>
                        <td>{extraHour.hoursAmount}</td>
                        <td>{extraHour.staffId}</td>
                        {localStorage.getItem('token') && localStorage.getItem('Role')=="Admin" && <td><button onClick={() => setExtraHourCurrentlyBeingUpdated(extraHour) } className='btn btn-dark btn-lg mx-3 my-3'>Update</button></td>}
                        {localStorage.getItem('token') && localStorage.getItem('Role')=="Admin" && <td><button onClick={() => {if(window.confirm(`Are you sure you want to delete this extraHour?`)) deleteExtraHour(extraHour.hoursId)}} className='btn btn-secondary btn-lg mx-3 my-3'>Delete</button></td>}
                    </tr>
                ))}
            </tbody>
        </table>

    </div>
    )

    
}


function onExtraHourCreated(createdExtraHour){
    setShowingCreateNewExtraHourForm(false);
    if(createdExtraHour === null){
        return;
    }


    alert('ExtraHour successfully created');

    getExtraHour();
}

function onExtraHourUpdated(updatedExtraHour){
    setExtraHourCurrentlyBeingUpdated(null);
    if(updatedExtraHour === null){
        return;
    }

    let extraHoursCopy=[...extraHours];

    const index = extraHoursCopy.findIndex((extraHoursCopyExtraHour, currentIndex) => {
        if(extraHoursCopyExtraHour.hoursId === updatedExtraHour.hoursId){
            return true;
        }
    });

    if(index!== -1){
        extraHoursCopy[index] = updatedExtraHour;
    }
    setExtraHour(extraHoursCopy);
    alert('ExtraHour successfully updated');

    getExtraHour();
}


function onExtraHourDeleted(deletedExtraHourExtraHourId){
    let extraHoursCopy=[...extraHours];

    const index = extraHoursCopy.findIndex((extraHoursCopyExtraHour, currentIndex) => {
        if(extraHoursCopyExtraHour.hoursId === deletedExtraHourExtraHourId){
            return true;
        }
    });

    if(index!== -1){
        extraHoursCopy.splice(index,1);
    }
    setExtraHour(extraHoursCopy);
    alert('ExtraHour successfully deleted');

    getExtraHour();
}

}


export default ExtraHourTable