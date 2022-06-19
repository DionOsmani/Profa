import './App.css';
import React from 'react'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';


import Header from './components/Header';
import Sidebar from './components/Sidebar';

import Home from './pages/Home';
import Staff from './pages/Staff';
import Departments from './pages/Departments';
import Branches from './pages/Branches';
import Products from './pages/Products';
import Login from './pages/Login';
import Bills from './pages/Bills';
import Customers from './pages/Customers';
import ExtraHour from './pages/ExtraHours';
import Issues from './pages/Issues';
import Machinery from './pages/Machinery';
import Materials from './pages/Materials';
import Reports from './pages/Reports';
import StaffPayments from './pages/StaffPayments';
import Tools from './pages/Tools';
import Woods from './pages/Woods';
import Complaints from './pages/Complaints';




function App() {




  return (
    <Router>
      <div className="App">
        
      <Header /> 
        <div className="row-container">
          <Sidebar /> 
        
          <Routes>
            <Route exact path='/' element={<Home />}></Route>
            <Route exact path='/staff' element={<Staff />}></Route>
            <Route exact path='/branches' element={<Branches />}></Route>
            <Route exact path='/departments' element={<Departments />}></Route>
            <Route exact path='/products' element={<Products />}></Route>
            <Route exact path='/login' element={<Login />}></Route>
            <Route exact path='/bills' element={<Bills />}></Route>
            <Route exact path='/customers' element={<Customers />}></Route>
            <Route exact path='/extraHour' element={<ExtraHour />}></Route>
            <Route exact path='/issue' element={<Issues />}></Route>
            <Route exact path='/machinery' element={<Machinery />}></Route>
            <Route exact path='/materials' element={<Materials />}></Route>
            <Route exact path='/reports' element={<Reports />}></Route>
            <Route exact path='/staffPayments' element={<StaffPayments />}></Route>
            <Route exact path='/tools' element={<Tools />}></Route>
            <Route exact path='/woods' element={<Woods />}></Route>
            <Route exact path='/complaints' element={<Complaints />}></Route>
          </Routes>
        </div>


      </div>
    </Router>
  );
}

export default App;
