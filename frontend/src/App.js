import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';

//import logo from './logo.svg';
import './App.css';
import LandingPage from './components/LandingPage';
import Register from './components/Register';
import Login from './components/Login';
import Protected from './components/Protected';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="*" element={ <h1> Not Found :/ </h1> } />
          <Route path="/" element={ <LandingPage /> } />
          <Route path="/register" element={ <Register />} />
          <Route path="/login" element={ <Login /> } />
          <Route path="/profile" element={ <Protected /> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
