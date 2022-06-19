import React, {useEffect, useState} from 'react'
import Constants from '../utilities/Constants';
import BranchCreateForm from './BranchCreateForm';
import BranchUpdateForm from './BranchUpdateForm';

function BranchTable()  {
    const [branches, setBranch] = useState([]);
    const [showingCreateNewBranchForm, setShowingCreateNewBranchForm] = useState(false);
    const [branchCurrentlyBeingUpdated, setBranchCurrentlyBeingUpdated] = useState(null);

    function getBranch(){
    const url = Constants.API_URL_GET_ALL_BRANCHES;
    
    fetch(url, {
      method: 'GET'
    })
    .then(response => response.json())
    .then(branchesFromServer =>{
      console.log(branchesFromServer);
      setBranch(branchesFromServer.value);
    })
    .catch((error) => {
      alert(error);
    });
  }

  function deleteBranch(branchId){
    const url = `${Constants.API_URL_DELETE_BRANCH_BY_ID}/${branchId}`;
    
    fetch(url, {
      method: 'DELETE'
    })
    .then(response => response.json())
    .then(responseFromServer =>{
      console.log(responseFromServer);
      onBranchDeleted(branchId);
    })
    .catch((error) => {
        console.log(error);
      alert(error);
    });
  }
  
return (
    <div className='m-5'>
        
       { useEffect(() => {
    getBranch();
  }, [])}
        
        {(branches.length>0 && showingCreateNewBranchForm === false && branchCurrentlyBeingUpdated === null) && renderBranchTable() }
        
        {showingCreateNewBranchForm && <BranchCreateForm onBranchCreated={onBranchCreated}/>}

        {branchCurrentlyBeingUpdated!==null&& <BranchUpdateForm branch={branchCurrentlyBeingUpdated} onBranchUpdated={onBranchUpdated} />}
    </div>
  )
  
function renderBranchTable(){
    return(
        
        <div className='mx-auto w-75'>
        <button onClick={() => setShowingCreateNewBranchForm(true)} className='btn btn-outline-dark btn-lg w-25 float-right'>Create new branch</button>
        <table className='table table-hover table-striped w-100 p-3 mx-auto'>
            <thead className='thead-dark'>
                <tr>
                    <th colSpan={9}>
                        <h4>Branch</h4>
                    </th>
                </tr>
                <tr>
                    <th>ID</th>
                    <th>Address</th>
                    <th>Update</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {branches.map((branch) => (
                    <tr key={branch.branchId}>
                        <td>{branch.branchId}</td>
                        <td>{branch.branchAddress}</td>
                        <td><button onClick={() => setBranchCurrentlyBeingUpdated(branch) } className='btn btn-dark btn-lg mx-3 my-3'>Update</button></td>
                        <td><button onClick={() => {if(window.confirm(`Are you sure you want to delete this branch?`)) deleteBranch(branch.branchId)}} className='btn btn-secondary btn-lg mx-3 my-3'>Delete</button></td>
                    </tr>
                ))}
            </tbody>
        </table>

    </div>
    )

    
}


function onBranchCreated(createdBranch){
    setShowingCreateNewBranchForm(false);
    if(createdBranch === null){
        return;
    }


    alert('Branch successfully created');

    getBranch();
}

function onBranchUpdated(updatedBranch){
    setBranchCurrentlyBeingUpdated(null);
    if(updatedBranch === null){
        return;
    }

    let branchesCopy=[...branches];

    const index = branchesCopy.findIndex((branchesCopyBranch, currentIndex) => {
        if(branchesCopyBranch.branchId === updatedBranch.branchId){
            return true;
        }
    });

    if(index!== -1){
        branchesCopy[index] = updatedBranch;
    }
    setBranch(branchesCopy);
    alert('Branch successfully updated');

    getBranch();
}


function onBranchDeleted(deletedBranchBranchId){
    let branchesCopy=[...branches];

    const index = branchesCopy.findIndex((branchesCopyBranch, currentIndex) => {
        if(branchesCopyBranch.branchId === deletedBranchBranchId){
            return true;
        }
    });

    if(index!== -1){
        branchesCopy.splice(index,1);
    }
    setBranch(branchesCopy);
    alert('Branch successfully deleted');

    getBranch();
}

}


export default BranchTable