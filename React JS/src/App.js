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
          </Routes>
        </div>


      </div>
    </Router>
  );
}

export default App;
