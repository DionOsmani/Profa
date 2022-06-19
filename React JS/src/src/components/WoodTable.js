import React, {useEffect, useState} from 'react'
import Constants from '../utilities/Constants';
import WoodCreateForm from './WoodCreateForm';
import WoodUpdateForm from './WoodUpdateForm';

function WoodTable()  {
    const [woods, setWood] = useState([]);
    const [showingCreateNewWoodForm, setShowingCreateNewWoodForm] = useState(false);
    const [woodCurrentlyBeingUpdated, setWoodCurrentlyBeingUpdated] = useState(null);

    function getWood(){
    const url = Constants.API_URL_GET_ALL_WOODS;
    
    fetch(url, {
      method: 'GET',
      headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => response.json())
    .then(woodsFromServer =>{
      console.log(woodsFromServer);
      setWood(woodsFromServer.value);
    })
    .catch((error) => {
        alert(localStorage.getItem('token'))
      alert(error);
    });
  }

  function deleteWood(woodId){
    const url = `${Constants.API_URL_DELETE_WOOD_BY_ID}/${woodId}`;
    
    fetch(url, {
      method: 'DELETE',
      headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => response.json())
    .then(responseFromServer =>{
      console.log(responseFromServer);
      onWoodDeleted(woodId);
    })
    .catch((error) => {
        console.log(error);
      alert(error);
    });
  }
  
return (
    <div className='m-5'>
        
       { useEffect(() => {
    getWood();
  }, [])}
        
        {(woods.length>0 && showingCreateNewWoodForm === false && woodCurrentlyBeingUpdated === null) && renderWoodTable() }
        
        {showingCreateNewWoodForm && <WoodCreateForm onWoodCreated={onWoodCreated}/>}

        {woodCurrentlyBeingUpdated!==null&& <WoodUpdateForm wood={woodCurrentlyBeingUpdated} onWoodUpdated={onWoodUpdated} />}
    </div>
  )
  
function renderWoodTable(){
    return(
        
        <div className='w-75 mx-auto'>
        {localStorage.getItem('token') && localStorage.getItem('Role')=="Admin" && <button onClick={() => setShowingCreateNewWoodForm(true)} className='btn btn-outline-dark btn-lg w-25 float-right m-1'>Create new wood</button>}
        <table className='table table-hover table-striped w-100 p-3 mx-auto'>
            <thead className='thead-dark'>
                <tr>
                    <th colSpan={9}>
                        <h4>Wood</h4>
                    </th>
                </tr>
                <tr>
                    <th>Barcode</th>
                    <th>Amount</th>
                    <th>Branch ID</th>                 
                    {localStorage.getItem('token') && localStorage.getItem('Role')=="Admin" && <th>Update</th>}
                    {localStorage.getItem('token') && localStorage.getItem('Role')=="Admin" && <th>Delete</th>}
                </tr>
            </thead>
            <tbody>
                {woods.map((wood) => (
                    <tr key={wood.woodId}>
                        <td>{wood.barCode}</td>
                        <td>{wood.amount}</td>
                        <td>{wood.branchId}</td>
                        {localStorage.getItem('token') && localStorage.getItem('Role')=="Admin" && <td><button onClick={() => setWoodCurrentlyBeingUpdated(wood) } className='btn btn-dark btn-lg mx-3 my-3'>Update</button></td>}
                        {localStorage.getItem('token') && localStorage.getItem('Role')=="Admin" && <td><button onClick={() => {if(window.confirm(`Are you sure you want to delete this wood?`)) deleteWood(wood.woodId)}} className='btn btn-secondary btn-lg mx-3 my-3'>Delete</button></td>}
                    </tr>
                ))}
            </tbody>
        </table>

    </div>
    )

    
}


function onWoodCreated(createdWood){
    setShowingCreateNewWoodForm(false);
    if(createdWood === null){
        return;
    }


    alert('Wood successfully created');

    getWood();
}

function onWoodUpdated(updatedWood){
    setWoodCurrentlyBeingUpdated(null);
    if(updatedWood === null){
        return;
    }

    let woodsCopy=[...woods];

    const index = woodsCopy.findIndex((woodsCopyWood, currentIndex) => {
        if(woodsCopyWood.woodId === updatedWood.woodId){
            return true;
        }
    });

    if(index!== -1){
        woodsCopy[index] = updatedWood;
    }
    setWood(woodsCopy);
    alert('Wood successfully updated');

    getWood();
}


function onWoodDeleted(deletedWoodWoodId){
    let woodsCopy=[...woods];

    const index = woodsCopy.findIndex((woodsCopyWood, currentIndex) => {
        if(woodsCopyWood.woodId === deletedWoodWoodId){
            return true;
        }
    });

    if(index!== -1){
        woodsCopy.splice(index,1);
    }
    setWood(woodsCopy);
    alert('Wood successfully deleted');

    getWood();
}

}


export default WoodTable