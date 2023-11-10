import React, { useState } from 'react'
import './Signin.css'
import axios from 'axios';
import { useRecoilState } from "recoil";
import userData from "../../recoil/atom";
import { useNavigate } from "react-router-dom";

const URL = 'https://tourshare.onrender.com'

const Signin = ()=>{
    const navigate = useNavigate();
    const [dataAtom , setDataAtom] = useRecoilState(userData);
    const [email, setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [errormsg , setErrormsg] = useState('');

    const Signin = async()=>{
        const body = { email:email  ,  password : password };
        const res = await axios.post(`${URL}/api/signin`, body);
        const data = res.data;
        if(data.errorCode===0){
            setDataAtom({
                username : data.info.username ,
                email : data.info.email,
                time : data.info.time, 
                location : data.info.location,
                phone : data.info.phone,
                date : data.info.date,
                numberOfPerson : data.info.numberOfPerson
            })
            navigate('/dashboard');
        }
        else {
            setErrormsg('🧐 Email id or password not matched');
        }
    }

     return (
        <div className='signin'>
        <div class="signin_container">
        <h2 id='signin_header'>Login</h2>
        <div className='signin_form'>
            <div class="signin_form-group">
                <label for="email">Email:</label>
                <input type="email" id="email" value ={email} onChange={(e)=>{setEmail(e.target.value)}} required/>
            </div>
            <div class="signin_form-group">
                <label for="password" >Password:</label>
                <input type="password" value ={password} onChange={(e)=>{setPassword(e.target.value)}} required/>
            </div>
            <button id='signin_button' onClick={Signin}>Sign In</button>
            <a id="back_to_signup" onClick={()=>{ navigate('/signup')}} >
                    Create Account
            </a>
            <h3 id='signin_error'>{errormsg}</h3>
        </div>
    </div>
</div>

     )
}


export default Signin;