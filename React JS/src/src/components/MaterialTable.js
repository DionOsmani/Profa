import React, {useEffect, useState} from 'react'
import Constants from '../utilities/Constants';
import MaterialCreateForm from './MaterialCreateForm';
import MaterialUpdateForm from './MaterialUpdateForm';

function MaterialTable()  {
    const [materials, setMaterial] = useState([]);
    const [showingCreateNewMaterialForm, setShowingCreateNewMaterialForm] = useState(false);
    const [materialCurrentlyBeingUpdated, setMaterialCurrentlyBeingUpdated] = useState(null);

    function getMaterial(){
    const url = Constants.API_URL_GET_ALL_MATERIALS;
    
    fetch(url, {
      method: 'GET',
      headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => response.json())
    .then(materialsFromServer =>{
      console.log(materialsFromServer);
      setMaterial(materialsFromServer.value);
    })
    .catch((error) => {
        alert(localStorage.getItem('token'))
      alert(error);
    });
  }

  function deleteMaterial(materialId){
    const url = `${Constants.API_URL_DELETE_MATERIAL_BY_ID}/${materialId}`;
    
    fetch(url, {
      method: 'DELETE',
      headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => response.json())
    .then(responseFromServer =>{
      console.log(responseFromServer);
      onMaterialDeleted(materialId);
    })
    .catch((error) => {
        console.log(error);
      alert(error);
    });
  }
  
return (
    <div className='m-5'>
        
       { useEffect(() => {
    getMaterial();
  }, [])}
        
        {(materials.length>0 && showingCreateNewMaterialForm === false && materialCurrentlyBeingUpdated === null) && renderMaterialTable() }
        
        {showingCreateNewMaterialForm && <MaterialCreateForm onMaterialCreated={onMaterialCreated}/>}

        {materialCurrentlyBeingUpdated!==null&& <MaterialUpdateForm material={materialCurrentlyBeingUpdated} onMaterialUpdated={onMaterialUpdated} />}
    </div>
  )
  
function renderMaterialTable(){
    return(
        
        <div className='w-75 mx-auto'>
        {localStorage.getItem('token') && localStorage.getItem('Role')=="Admin" && <button onClick={() => setShowingCreateNewMaterialForm(true)} className='btn btn-outline-dark btn-lg w-25 float-right m-1'>Create new material</button>}
        <table className='table table-hover table-striped w-100 p-3 mx-auto'>
            <thead className='thead-dark'>
                <tr>
                    <th colSpan={9}>
                        <h4>Material</h4>
                    </th>
                </tr>
                <tr>
                    <th>Material Type</th>
                    <th>Amount</th>
                    <th>Barcode</th>
                    <th>Department ID</th>                 
                    {localStorage.getItem('token') && localStorage.getItem('Role')=="Admin" && <th>Update</th>}
                    {localStorage.getItem('token') && localStorage.getItem('Role')=="Admin" && <th>Delete</th>}
                </tr>
            </thead>
            <tbody>
                {materials.map((material) => (
                    <tr key={material.materialId}>
                        <td>{material.materialType}</td>
                        <td>{material.amount}</td>
                        <td>{material.barCode}</td>
                        <td>{material.departmentId}</td>
                        {localStorage.getItem('token') && localStorage.getItem('Role')=="Admin" && <td><button onClick={() => setMaterialCurrentlyBeingUpdated(material) } className='btn btn-dark btn-lg mx-3 my-3'>Update</button></td>}
                        {localStorage.getItem('token') && localStorage.getItem('Role')=="Admin" && <td><button onClick={() => {if(window.confirm(`Are you sure you want to delete this material?`)) deleteMaterial(material.materialId)}} className='btn btn-secondary btn-lg mx-3 my-3'>Delete</button></td>}
                    </tr>
                ))}
            </tbody>
        </table>

    </div>
    )

    
}


function onMaterialCreated(createdMaterial){
    setShowingCreateNewMaterialForm(false);
    if(createdMaterial === null){
        return;
    }


    alert('Material successfully created');

    getMaterial();
}

function onMaterialUpdated(updatedMaterial){
    setMaterialCurrentlyBeingUpdated(null);
    if(updatedMaterial === null){
        return;
    }

    let materialsCopy=[...materials];

    const index = materialsCopy.findIndex((materialsCopyMaterial, currentIndex) => {
        if(materialsCopyMaterial.materialId === updatedMaterial.materialId){
            return true;
        }
    });

    if(index!== -1){
        materialsCopy[index] = updatedMaterial;
    }
    setMaterial(materialsCopy);
    alert('Material successfully updated');

    getMaterial();
}


function onMaterialDeleted(deletedMaterialMaterialId){
    let materialsCopy=[...materials];

    const index = materialsCopy.findIndex((materialsCopyMaterial, currentIndex) => {
        if(materialsCopyMaterial.materialId === deletedMaterialMaterialId){
            return true;
        }
    });

    if(index!== -1){
        materialsCopy.splice(index,1);
    }
    setMaterial(materialsCopy);
    alert('Material successfully deleted');

    getMaterial();
}

}


export default MaterialTable