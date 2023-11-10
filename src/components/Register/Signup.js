import React, { useState } from 'react'
import './Signup.css'
import { useRecoilState } from "recoil";
import userData from '../../recoil/atom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const URL = 'https://tourshare.onrender.com'

const Signup = ()=>{

    const navigate = useNavigate();
    const [dataAtom , setDataAtom] = useRecoilState(userData);
    const [username , setUsername] = useState('');
    const [password ,setPassword]  = useState('');
    const [phone , setPhone] = useState('');
    const [email , setEmail] = useState('');
    const [signup_error , setSignup_error] = useState('');

function isValidEmail(email) {
    let i=0;

    while(email.length && email[i]!='_') i++;
    if(i==email.length) return false;

    i++;

    if(email.substr(i+8,13)!='@nitkkr.ac.in') return false;
   
   if(isNaN(parseInt(email.substr(i,8)))) return false;

    return true;
}
  
    const checkdata = ()=>{
        if(username.trim()==='') return 1;
        if(!isValidEmail(email)) return 2;
        if(password.trim()==='') return 3;
        if(phone.length!==10) return 4;
        return 0;
    }
    const submit_form = async ()=>{
        try{
           const result = checkdata();

           if(result===0){
            const body = { username: username, password: password , email:email , phone : phone };
            const res = await axios.post(`${URL}/api/signup`, body);
            const data = res.data;
            if(data.errorCode==1){
                setSignup_error('😤 Already Logged in with this Email Id')
            }
            else{
                setDataAtom({username : username , email : email , time : '' , location : '' , phone : phone ,  date : '', numberOfPerson : ''});
                navigate("/signup/verifyOTP");
            }

           }
           else if(result===1){
                setSignup_error('😏 Please Enter a valid Username')
           }
           else if(result===2){
            setSignup_error('🤨 Please enter valid Domain Id')
           }
           else if(result===3){
            setSignup_error('🙁 Please enter a valid Password')
           }
           else if(result===4){
            setSignup_error('🥱 Please enter a valid Phone Number')
           }

        }
        catch (error){
            console.log(error);
        }
    }

     return (
        <div className='signup'>
            <div class="signup_container">
            <h2 id='signup_header'>Signup</h2>
            <div className='signup_form'>
                <div class="signup_form-group">
                    <label>Name:</label>
                    <input type="text" id="name" value={username} onChange={(e)=>setUsername(e.target.value)} required/>
                </div>
                <div class="signup_form-group">
                    <label for="email">Email:</label>
                    <input type="email" id="email" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
                </div>
                <div class="signup_form-group">
                    <label for="password">Password:</label>
                    <input type="password" id="password" value={password} onChange={(e)=>setPassword(e.target.value)}  required/>
                </div>
                <div class="signup_form-group">
                    <label for="phone">Phone Number:</label>
                    <input type="tel" id="phone" value={phone} onChange={(e)=>setPhone(e.target.value)} required/>
                </div>
                <button id='signup_button' onClick={submit_form}>Sign Up</button>
                <a id="back_to_signin" onClick={()=>{ navigate('/')}} >
                    Back to login
                </a>
                <h3 id='signup_error'>{signup_error}</h3>
            </div>
        </div>
    </div>
     )
}

export default Signup;
