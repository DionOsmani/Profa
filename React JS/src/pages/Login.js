import React, {useState} from 'react'
import Constants from '../utilities/Constants'
import { Navigate } from "react-router-dom";
import jwt from 'jwt-decode'

function Login(props)  {

    const [formData, setFormData] = useState(null);


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };





    const handleSubmit = (e) => {
        e.preventDefault();
    
        const loginStaff = {
            email: formData.email,
            pass: formData.pass
        };
    
        const url = Constants.API_URL_LOGIN;
    
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
               
            },
            body: JSON.stringify(loginStaff)
          })
          .then(response => response.text())
          .then(responseTokenFromServer =>{
            console.log(jwt(responseTokenFromServer));
            if(responseTokenFromServer!=""){
                localStorage.setItem('token', responseTokenFromServer);
                localStorage.setItem('UserID', jwt(responseTokenFromServer).UserID);
                localStorage.setItem('Name', jwt(responseTokenFromServer).Firstname);
                localStorage.setItem('Surname', jwt(responseTokenFromServer).Surname);
                localStorage.setItem('Role', jwt(responseTokenFromServer).Role);
                localStorage.setItem('Email', jwt(responseTokenFromServer).Email);
                console.log(responseTokenFromServer);
                
                // onStaffLogin();
                
            }
            else{
                alert("Email or Password is incorrect");
            }
          })
          .catch((error) => {
              
              console.log(error);
            alert(error);
          });
          
    };




  return (
    <div  className='loginContainer px-auto py-auto'>
        <form className='loginBox'>
            <h2>Please Log In</h2><br/><br/>


            <label className='h5 form-label'>Email:</label><br/>
            <input name='email' className='loginInput mt-2' type="text" placeholder='Email...' onChange={handleChange}/><br/><br/><br/>

            <label className='h5 form-label'>Password:</label><br/>
            <input name='pass' className='loginInput mt-2' type="password" placeholder='Password...' onChange={handleChange}/><br/>


            <button onClick={handleSubmit} className='mt-5 loginSubmitBtn btn-primary'>Log In</button><br/>
            <button onClick={() => props.onStaffLogin(null)} className=" btn-secondary loginSubmitBtn mt-2">Cancel</button>
        </form>
       
    </div>
  )

  function onStaffLogin(){
    alert('Staff successfully logged in');
    window.location.href="/";
}
  
}



export default Login