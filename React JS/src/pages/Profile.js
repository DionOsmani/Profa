import React from 'react'
import Constants from '../utilities/Constants'
import {useState, useEffect} from 'react'
import { render } from '@testing-library/react';

function Profile  () {
    

    const [staff, setStaff] = useState(null);
    function getStaffById(staffId){
        const url = `${Constants.API_URL_GET_STAFF_BY_ID}/${staffId}`;
        

        fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          })
          .then(response => response.json())
          .then(staffFromServer =>{
            console.log(staffFromServer);
            setStaff(staffFromServer);
          })
          .catch((error) => {
            alert(error);
          });
    }

    
    const handleChange = (e) => {
        setStaff({
            ...staff,
            [e.target.name]: e.target.value
        });
    };

    
const handleSubmit = (e) => {
    e.preventDefault();

    const staffToUpdate = {
        staffId: localStorage.getItem('UserID'),
        firstname: staff.firstname,
        surname: staff.surname,
        email: staff.email,
        pass: staff.pass,
        branchId: staff.branchId,
        phoneNumber: staff.phoneNumber,
        age: staff.age,
        gjinia: staff.gjinia,
        wage: staff.wage,
        role: staff.role
    };

    const url = Constants.API_URL_UPDATE_STAFF;

    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(staffToUpdate)
      })
      .then(response => response.json())
      .then(responseStaffFromServer =>{
        console.log(responseStaffFromServer);
        onStaffUpdated(staffToUpdate);
      })
      .catch((error) => {
          console.log(error);
        alert(error);
      });
      
};


  return (
    <div className='fullWidth'>
        { useEffect(() => {
            getStaffById(localStorage.getItem('UserID'));
        }, [])}

        
 

        {staff!==null && renderProfile()}



        
    </div>
  )

  function renderProfile(){
    return (
    <form>
            <table className='profile-table table table-hover table-striped w-50 p-3 mx-auto mt-5 '>
                <tbody>
                    <tr>
                        <td className='profile-td' colSpan={2}><img className='profile-image' src={require('../assets/default.jpg')} /></td>
                    </tr>
                    <tr >
                        <td className='profile-td'>
                            <label className='form-label'>First Name</label>
                            <input value={staff.firstname} name='firstname' type="text" className="form-control" onChange={handleChange} /><br />

                            <label  className='form-label'>Surname</label>
                            <input value={staff.surname}  name='surname' type="text" className="form-control" onChange={handleChange} /><br />

                            <label className='form-label'>Email</label>
                            <input value={staff.email} name='email' type="text" className="form-control" onChange={handleChange} /><br />

                            <label className='form-label'>Age</label>
                            <input value={staff.age} name='age' type="number" className="form-control" onChange={handleChange} /><br />


                        </td>
                        <td className='profile-td'>
                            <label className='form-label'>Gender</label>
                            <input value={staff.gjinia} name='gjinia' type="text" className="form-control" onChange={handleChange} /><br />

                            <label className='form-label'>Phone Number</label>
                            <input value={staff.phoneNumber} name='phoneNumber' type="number" className="form-control" onChange={handleChange} /><br />

                            <label className='form-label'>Wage</label>
                            <input value={staff.wage} name='wage' type="number" className="form-control" onChange={handleChange} readOnly/><br />

                            <label className='form-label'>Branch ID</label>
                            <input value={staff.branchId} name='branchId' type="number" className="form-control" onChange={handleChange} readOnly/><br />

                            <label className='form-label'>Role</label>
                            <input value={staff.role} name='role' type="text" className="form-control" onChange={handleChange} readOnly/><br />

                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            <button onClick={handleSubmit} className="btn btn-dark btn-lg w-100 mt-2">Submit</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </form>
    )
  }

  function onStaffUpdated(updatedStaff){
    if(updatedStaff === null){
        return;
    }

    setStaff(updatedStaff);
    alert('Staff successfully updated');

    getStaffById(localStorage.getItem('UserID'));
}









}

export default Profile