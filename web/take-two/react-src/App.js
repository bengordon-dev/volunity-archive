import './App.css';
import React, { } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from "./pages/Main"
import OrgView from "./pages/OrgView"
import VolView from "./pages/VolView"
import FindOp from './pages/FindOp';
import PostOp from './pages/PostOp'
import OrgSignedOut from './pages/OrgSignedOut';
import OrgSignUp from './pages/OrgSignUp';
import OrgLogIn from './pages/OrgLogIn';


export default function App() {
  return (
    <div className="App">
      <p className="title">Volunity</p>
      <h2 className="subtext">Uniting Durham One Volunteer at a Time</h2>
      <BrowserRouter>
        <Routes> 
          <Route exact path="/" element={<Main/>}/>
          <Route exact path="/volview" element={<VolView/>}/>
          <Route exact path="/volview/findop" element={<FindOp/>}/>
          <Route exact path="/orgview" element={<OrgView/>}/>
          <Route exact path="/orgview/signedout" element={<OrgSignedOut/>}/>
          <Route exact path="/orgview/signup" element={<OrgSignUp/>}/>
          <Route exact path="/orgview/login" element={<OrgLogIn/>}/>
          <Route exact path="/orgview/postop" element={<PostOp/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}