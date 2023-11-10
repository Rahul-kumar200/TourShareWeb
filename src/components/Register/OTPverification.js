import React, { useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './OTPverification.css'
import { useRecoilState } from "recoil";
import userData from "../../recoil/atom";

const URL = 'https://tourshare.onrender.com'

const OTPverification = ()=>{
    const navigate = useNavigate();
    const [dataAtom , setDataAtom] = useRecoilState(userData);
    const [OTP , setOTP]  = useState('');
    const checkOTP = async ()=>{
        const res = await axios.post(`${URL}/api/verifyotp`,{otp : OTP});
        const data = res.data;

        if(data.errorCode==0){
            navigate('/dashboard/')
        }
        else {
            navigate('/signup')
        }
    }
    
    return(
        <div id="otp">
        <div className="otp_container">
            <h2 className="otp_header1">Enter OTP</h2>
            <h3 className="otp_header2">Check your email for OTP</h3>
            <input className="inputOTP" value={OTP} placeholder="One Time Password" onChange={(e)=>{setOTP(e.target.value)}} />
            <button className="submitOTP" onClick={checkOTP}>Submit</button>
        </div>
        </div>
    )
}

export default OTPverification;