import './App.css'
import { BrowserRouter, Routes, Route } from "react-router";
import { Toaster } from 'react-hot-toast';

import Signin from './pages/LoginPages/Signin';
import Signup from './pages/LoginPages/Signup';
import Verify from './pages/LoginPages/Verify';
import EmailVerification from './pages/LoginPages/EmailVerification';
import ResetOTP from './pages/LoginPages/ResetOTP';
import ResetPassword from './pages/LoginPages/ResetPassword';
import Welcome from './pages/Welcome';
import Editor from './pages/Editor';



function App() {
  

  return(

    
  <div className="App">

    <Toaster
    position="top-right"
    reverseOrder={false}
    />

    <BrowserRouter>
      <Routes>
          
          <Route path='/' element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify/:id" element={<Verify />} />
          <Route path="/email-verify" element={<EmailVerification />} />
          <Route path="/reset-verify" element={<ResetOTP />} />
          <Route path="/reset-password" element={<ResetPassword />} />


          <Route path="/welcome" element={<Welcome />} />
          <Route path="/code-editor" element={<Editor />} />


      </Routes>
    </BrowserRouter>
  </div>
  );
}

export default App
