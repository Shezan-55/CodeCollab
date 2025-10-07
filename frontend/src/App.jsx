import './App.css'
import { BrowserRouter, Routes, Route } from "react-router";
import { Toaster } from 'react-hot-toast';

import Signin from './pages/LoginPages/Signin';
import Signup from './pages/LoginPages/Signup';
import EmailVerification from './pages/LoginPages/EmailVerification';

import Welcome from './pages/Welcome';
import Editor from './pages/Editor';
import FrontPage from './pages/FrontPage';
import ActualVerify from './pages/LoginPages/ActualVerify';



function App() {
  

  return(

    
  <div className="App">

    <Toaster
    position="top-right"
    reverseOrder={false}
    />

    <BrowserRouter>
      <Routes>

          <Route path='/' element={<FrontPage />} />
          <Route path='/signin' element={<Signin />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/verify/:token" element={<ActualVerify />} />


          
          <Route path="/email-verify" element={<EmailVerification />} />



          <Route path="/welcome" element={<Welcome />} />
          <Route path="/code-editor" element={<Editor />} />


      </Routes>
    </BrowserRouter>
  </div>
  );
}

export default App
