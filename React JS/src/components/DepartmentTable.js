import React, {useEffect, useState} from 'react'
import Constants from '../utilities/Constants';
import DepartmentCreateForm from './DepartmentCreateForm';
import DepartmentUpdateForm from './DepartmentUpdateForm';

function DepartmentTable()  {
    const [departments, setDepartment] = useState([]);
    const [departmentsOfBranch, setDepartmentsOfBranch] = useState([]);
    const [showingCreateNewDepartmentForm, setShowingCreateNewDepartmentForm] = useState(false);
    const [departmentCurrentlyBeingUpdated, setDepartmentCurrentlyBeingUpdated] = useState(null);
    const [ViewBranchDepartments, setViewBranchDepartments] = useState(0);

    function getDepartment(){
    const url = Constants.API_URL_GET_ALL_DEPARTMENTS;
    
    fetch(url, {
      method: 'GET',
      headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => response.json())
    .then(departmentsFromServer =>{
      console.log(departmentsFromServer);
      setDepartment(departmentsFromServer.value);
    })
    .catch((error) => {
      alert(error);
    });
  }


  function getDepartmentsByBranch(branchId){
    const url = `${Constants.API_URL_GET_DEPARTMENTS_BY_BRANCH_ID}/${branchId}`;
    
    fetch(url, {
      method: 'GET',
      headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => response.json())
    .then(departmentsFromServer =>{
      console.log(departmentsFromServer);
      setDepartmentsOfBranch(departmentsFromServer);
    })
    .catch((error) => {
      alert(error);
    });
  }


  function deleteDepartment(departmentId){
    const url = `${Constants.API_URL_DELETE_DEPARTMENT_BY_ID}/${departmentId}`;
    
    fetch(url, {
      method: 'DELETE',
      headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => response.json())
    .then(responseFromServer =>{
      console.log(responseFromServer);
      onDepartmentDeleted(departmentId);
    })
    .catch((error) => {
        console.log(error);
      alert(error);
    });
  }
  
return (
    <div className='m-5'>
        
       { useEffect(() => {
    getDepartment();
  }, [])}


        
        {(departments.length>0 && showingCreateNewDepartmentForm === false && (
        localStorage.getItem('Role')==="Admin" ||
        localStorage.getItem('Role')==="HeadAdmin"  ||
        localStorage.getItem('Role')==="bHead" ) && departmentCurrentlyBeingUpdated === null) 
        && ViewBranchDepartments===0 && renderDepartmentTable() }
        
        {showingCreateNewDepartmentForm && (
        localStorage.getItem('Role')==="Admin" ||
        localStorage.getItem('Role')==="HeadAdmin"  ||
        localStorage.getItem('Role')==="bHead" ) 
        && <DepartmentCreateForm onDepartmentCreated={onDepartmentCreated}/>}

        {departmentCurrentlyBeingUpdated!==null&& (
        localStorage.getItem('Role')==="Admin" ||
        localStorage.getItem('Role')==="HeadAdmin"  ||
        localStorage.getItem('Role')==="bHead" )
        && <DepartmentUpdateForm department={departmentCurrentlyBeingUpdated} onDepartmentUpdated={onDepartmentUpdated} />}

        {ViewBranchDepartments!==0&& (
        localStorage.getItem('Role')==="Admin" ||
        localStorage.getItem('Role')==="HeadAdmin"  ||
        localStorage.getItem('Role')==="bHead" )
        && renderDepartmentsByBranchTable()}

    

    </div>
  )
  

  function renderDepartmentsByBranchTable(){
    return(
        
        <div className='mx-auto w-75'>
        <table className='table table-hover table-striped w-100 p-3 mx-auto'>
            <thead className='thead-dark'>
                <tr>
                    <th colSpan={9}>
                        <h4>Department</h4>
                    </th>
                </tr>
                <tr>
                    <th>Specialisation</th>
                    <th>Branch ID</th>
                    <th>Update</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {departmentsOfBranch.map((department) => (
                    <tr key={department.departmentId}>
                        <td>{department.specialisation}</td>
                        <td>{department.branchId}</td>
                        <td><button onClick={() => setDepartmentCurrentlyBeingUpdated(department) } className='btn btn-dark btn-lg mx-3 my-3'>Update</button></td>
                        <td><button onClick={() => {if(window.confirm(`Are you sure you want to delete this department?`)) deleteDepartment(department.departmentId)}} className='btn btn-secondary btn-lg mx-3 my-3'>Delete</button></td>
                    </tr>
                ))}
            </tbody>
        </table>

    </div>
    )
    
}





function renderDepartmentTable(){
    return(
        
        <div className='mx-auto w-75'>
        <button onClick={() => setShowingCreateNewDepartmentForm(true)} className='btn btn-outline-dark btn-lg w-25 float-right'>Create new department</button>
        <table className='table table-hover table-striped w-100 p-3 mx-auto'>
            <thead className='thead-dark'>
                <tr>
                    <th colSpan={9}>
                        <h4>Department</h4>
                    </th>
                </tr>
                <tr>
                    <th>Specialisation</th>
                    <th>Branch ID</th>
                    <th>Update</th>
                    <th>Delete</th>
                    <th>View Branch Departments</th>
                </tr>
            </thead>
            <tbody>
                {departments.map((department) => (
                    <tr key={department.departmentId}>
                        <td>{department.specialisation}</td>
                        <td>{department.branchId}</td>
                        <td><button onClick={() => setDepartmentCurrentlyBeingUpdated(department) } className='btn btn-dark btn-lg mx-3 my-3'>Update</button></td>
                        <td><button onClick={() => {if(window.confirm(`Are you sure you want to delete this department?`)) deleteDepartment(department.departmentId)}} className='btn btn-secondary btn-lg mx-3 my-3'>Delete</button></td>
                        <td><button onClick={() => {setViewBranchDepartments(department.branchId);getDepartmentsByBranch(department.branchId)}} className='btn btn-secondary btn-lg mx-3 my-3'>View Branch Departments</button></td>
                    </tr>
                ))}
            </tbody>
        </table>

    </div>
    )

    
}


function onDepartmentCreated(createdDepartment){
    setShowingCreateNewDepartmentForm(false);
    if(createdDepartment === null){
        return;
    }


    alert('Department successfully created');

    getDepartment();
    getDepartmentsByBranch();
}

function onDepartmentUpdated(updatedDepartment){
    setDepartmentCurrentlyBeingUpdated(null);
    if(updatedDepartment === null){
        return;
    }

    let departmentsCopy=[...departments];

    const index = departmentsCopy.findIndex((departmentsCopyDepartment, currentIndex) => {
        if(departmentsCopyDepartment.departmentId === updatedDepartment.departmentId){
            return true;
        }
    });

    if(index!== -1){
        departmentsCopy[index] = updatedDepartment;
    }
    setDepartment(departmentsCopy);
    alert('Department successfully updated');

    getDepartment();
    getDepartmentsByBranch();

}


function onDepartmentDeleted(deletedDepartmentDepartmentId){
    let departmentsCopy=[...departments];

    const index = departmentsCopy.findIndex((departmentsCopyDepartment, currentIndex) => {
        if(departmentsCopyDepartment.departmentId === deletedDepartmentDepartmentId){
            return true;
        }
    });

    if(index!== -1){
        departmentsCopy.splice(index,1);
    }
    setDepartment(departmentsCopy);
    alert('Department successfully deleted');

    getDepartment();
    getDepartmentsByBranch();

}

}


export default DepartmentTable