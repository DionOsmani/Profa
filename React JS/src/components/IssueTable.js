import React, {useEffect, useState} from 'react'
import Constants from '../utilities/Constants';
import IssueCreateForm from './IssueCreateForm';
import IssueUpdateForm from './IssueUpdateForm';

function IssueTable()  {
    const [issues, setIssue] = useState([]);
    const [showingCreateNewIssueForm, setShowingCreateNewIssueForm] = useState(false);
    const [issueCurrentlyBeingUpdated, setIssueCurrentlyBeingUpdated] = useState(null);

    function getIssue(){
    const url = Constants.API_URL_GET_ALL_ISSUES;
    
    fetch(url, {
      method: 'GET',
      headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => response.json())
    .then(issuesFromServer =>{
      console.log(issuesFromServer);
      setIssue(issuesFromServer.value);
    })
    .catch((error) => {
        alert(localStorage.getItem('token'))
      alert(error);
    });
  }

  function deleteIssue(issuesId){
    const url = `${Constants.API_URL_DELETE_ISSUE_BY_ID}/${issuesId}`;
    
    fetch(url, {
      method: 'DELETE',
      headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => response.json())
    .then(responseFromServer =>{
      console.log(responseFromServer);
      onIssueDeleted(issuesId);
    })
    .catch((error) => {
        console.log(error);
      alert(error);
    });
  }
  
return (
    <div className='m-5'>
        
       { useEffect(() => {
    getIssue();
  }, [])}
        
        {(issues.length>0 && showingCreateNewIssueForm === false && (
        localStorage.getItem('Role')==="Admin" ||
        localStorage.getItem('Role')==="HeadAdmin"  ||
        localStorage.getItem('Role')==="bHead"  ||
        localStorage.getItem('Role')==="dHead") 
        && issueCurrentlyBeingUpdated === null) && renderIssueTable() }
        
        {showingCreateNewIssueForm && (
        localStorage.getItem('Role')==="Admin" ||
        localStorage.getItem('Role')==="HeadAdmin"  ||
        localStorage.getItem('Role')==="bHead"  ||
        localStorage.getItem('Role')==="dHead") 
        && <IssueCreateForm onIssueCreated={onIssueCreated}/>}

        {issueCurrentlyBeingUpdated!==null && (
        localStorage.getItem('Role')==="Admin" ||
        localStorage.getItem('Role')==="HeadAdmin"  ||
        localStorage.getItem('Role')==="bHead"  ||
        localStorage.getItem('Role')==="dHead") 
        && <IssueUpdateForm issue={issueCurrentlyBeingUpdated} onIssueUpdated={onIssueUpdated} />}
    </div>
  )
  
function renderIssueTable(){
    return(
        
        <div className='w-75 mx-auto'>
        {localStorage.getItem('token') && localStorage.getItem('Role')=="Admin" && <button onClick={() => setShowingCreateNewIssueForm(true)} className='btn btn-outline-dark btn-lg w-25 float-right m-1'>Create new issue</button>}
        <table className='table table-hover table-striped w-100 p-3 mx-auto'>
            <thead className='thead-dark'>
                <tr>
                    <th colSpan={9}>
                        <h4>Issue</h4>
                    </th>
                </tr>
                <tr>
                    <th>Issue</th>
                    <th>Staff ID</th>             
                    <th>Update</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {issues.map((issue) => (
                    <tr key={issue.issuesId}>
                        <td>{issue.issues}</td>
                        <td>{issue.staffId}</td>
                        <td><button onClick={() => setIssueCurrentlyBeingUpdated(issue) } className='btn btn-dark btn-lg mx-3 my-3'>Update</button></td>
                        <td><button onClick={() => {if(window.confirm(`Are you sure you want to delete this issue?`)) deleteIssue(issue.issuesId)}} className='btn btn-secondary btn-lg mx-3 my-3'>Delete</button></td>
                    </tr>
                ))}
            </tbody>
        </table>

    </div>
    )

    
}


function onIssueCreated(createdIssue){
    setShowingCreateNewIssueForm(false);
    if(createdIssue === null){
        return;
    }


    alert('Issue successfully created');

    getIssue();
}

function onIssueUpdated(updatedIssue){
    setIssueCurrentlyBeingUpdated(null);
    if(updatedIssue === null){
        return;
    }

    let issuesCopy=[...issues];

    const index = issuesCopy.findIndex((issuesCopyIssue, currentIndex) => {
        if(issuesCopyIssue.issuesId === updatedIssue.issuesId){
            return true;
        }
    });

    if(index!== -1){
        issuesCopy[index] = updatedIssue;
    }
    setIssue(issuesCopy);
    alert('Issue successfully updated');

    getIssue();
}


function onIssueDeleted(deletedIssueIssueId){
    let issuesCopy=[...issues];

    const index = issuesCopy.findIndex((issuesCopyIssue, currentIndex) => {
        if(issuesCopyIssue.issuesId === deletedIssueIssueId){
            return true;
        }
    });

    if(index!== -1){
        issuesCopy.splice(index,1);
    }
    setIssue(issuesCopy);
    alert('Issue successfully deleted');

    getIssue();
}

}


export default IssueTable