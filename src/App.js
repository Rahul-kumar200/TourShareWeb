import logo from './logo.svg';
import './App.css';
import {Routes,Route} from 'react-router-dom'
import Signin from './components/Register/Signin';
import Signup from './components/Register/Signup';
import OTPverification from './components/Register/OTPverification';
import Dashboard from './components/Dashboard';
import Resultpage from './components/Resultpage';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route exact path='/' element={<Signin/>}/>
        <Route exact path='/signup' element={<Signup/>}/>
        <Route exact path='/signup/verifyOTP' element={<OTPverification/>}/>
        <Route exact path='/dashboard' element={<Dashboard/>}/>
        <Route exact path='/dashboard/resultPage' element={<Resultpage/>}/>
        <Route  path='*' element={<Signin/>}/>
      </Routes>
    </div>
  );
}

export default App;
