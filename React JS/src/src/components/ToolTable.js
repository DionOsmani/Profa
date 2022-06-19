import React, {useEffect, useState} from 'react'
import Constants from '../utilities/Constants';
import ToolCreateForm from './ToolCreateForm';
import ToolUpdateForm from './ToolUpdateForm';

function ToolTable()  {
    const [tools, setTool] = useState([]);
    const [showingCreateNewToolForm, setShowingCreateNewToolForm] = useState(false);
    const [toolCurrentlyBeingUpdated, setToolCurrentlyBeingUpdated] = useState(null);

    function getTool(){
    const url = Constants.API_URL_GET_ALL_TOOLS;
    
    fetch(url, {
      method: 'GET',
      headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => response.json())
    .then(toolsFromServer =>{
      console.log(toolsFromServer);
      setTool(toolsFromServer.value);
    })
    .catch((error) => {
        alert(localStorage.getItem('token'))
      alert(error);
    });
  }

  function deleteTool(toolId){
    const url = `${Constants.API_URL_DELETE_TOOL_BY_ID}/${toolId}`;
    
    fetch(url, {
      method: 'DELETE',
      headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => response.json())
    .then(responseFromServer =>{
      console.log(responseFromServer);
      onToolDeleted(toolId);
    })
    .catch((error) => {
        console.log(error);
      alert(error);
    });
  }
  
return (
    <div className='m-5'>
        
       { useEffect(() => {
    getTool();
  }, [])}
        
        {(tools.length>0 && showingCreateNewToolForm === false && toolCurrentlyBeingUpdated === null) && renderToolTable() }
        
        {showingCreateNewToolForm && <ToolCreateForm onToolCreated={onToolCreated}/>}

        {toolCurrentlyBeingUpdated!==null&& <ToolUpdateForm tool={toolCurrentlyBeingUpdated} onToolUpdated={onToolUpdated} />}
    </div>
  )
  
function renderToolTable(){
    return(
        
        <div className='w-75 mx-auto'>
        {localStorage.getItem('token') && localStorage.getItem('Role')=="Admin" && <button onClick={() => setShowingCreateNewToolForm(true)} className='btn btn-outline-dark btn-lg w-25 float-right m-1'>Create new tool</button>}
        <table className='table table-hover table-striped w-100 p-3 mx-auto'>
            <thead className='thead-dark'>
                <tr>
                    <th colSpan={9}>
                        <h4>Tool</h4>
                    </th>
                </tr>
                <tr>
                    <th>Tool Type</th>
                    <th>Amount</th>
                    <th>Department ID</th>                 
                    {localStorage.getItem('token') && localStorage.getItem('Role')=="Admin" && <th>Update</th>}
                    {localStorage.getItem('token') && localStorage.getItem('Role')=="Admin" && <th>Delete</th>}
                </tr>
            </thead>
            <tbody>
                {tools.map((tool) => (
                    <tr key={tool.toolId}>
                        <td>{tool.toolType}</td>
                        <td>{tool.amount}</td>
                        <td>{tool.departmentId}</td>
                        {localStorage.getItem('token') && localStorage.getItem('Role')=="Admin" && <td><button onClick={() => setToolCurrentlyBeingUpdated(tool) } className='btn btn-dark btn-lg mx-3 my-3'>Update</button></td>}
                        {localStorage.getItem('token') && localStorage.getItem('Role')=="Admin" && <td><button onClick={() => {if(window.confirm(`Are you sure you want to delete this tool?`)) deleteTool(tool.toolId)}} className='btn btn-secondary btn-lg mx-3 my-3'>Delete</button></td>}
                    </tr>
                ))}
            </tbody>
        </table>

    </div>
    )

    
}


function onToolCreated(createdTool){
    setShowingCreateNewToolForm(false);
    if(createdTool === null){
        return;
    }


    alert('Tool successfully created');

    getTool();
}

function onToolUpdated(updatedTool){
    setToolCurrentlyBeingUpdated(null);
    if(updatedTool === null){
        return;
    }

    let toolsCopy=[...tools];

    const index = toolsCopy.findIndex((toolsCopyTool, currentIndex) => {
        if(toolsCopyTool.toolId === updatedTool.toolId){
            return true;
        }
    });

    if(index!== -1){
        toolsCopy[index] = updatedTool;
    }
    setTool(toolsCopy);
    alert('Tool successfully updated');

    getTool();
}


function onToolDeleted(deletedToolToolId){
    let toolsCopy=[...tools];

    const index = toolsCopy.findIndex((toolsCopyTool, currentIndex) => {
        if(toolsCopyTool.toolId === deletedToolToolId){
            return true;
        }
    });

    if(index!== -1){
        toolsCopy.splice(index,1);
    }
    setTool(toolsCopy);
    alert('Tool successfully deleted');

    getTool();
}

}


export default ToolTable