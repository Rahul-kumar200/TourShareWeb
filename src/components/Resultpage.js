import React, { useEffect, useState } from "react";
import './Resultpage.css'
import SlotPerson from "./SlotPerson";
import { useRecoilState } from "recoil";
import newDataInfo from "../recoil/setNewInfo";
import userData from "../recoil/atom";
import ResultPageHeader from "./ResultPageHeader";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const URL = 'https://tourshare.onrender.com'

const ResultPage = ()=>{
    const navigate = useNavigate();
    
    const [dataAtom , setDataAtom] = useRecoilState(userData)
    const [newDataAtom , setNewDataAtom] = useRecoilState(newDataInfo)
    let [checkno, setCheckno] = useState(0);
    let [isClicked , setIsClicked]= useState(false);
    const [checkedSlot, setCheckedSlot] = useState(null);
    const [data,setData] = useState([]);
    let timeSlots = [6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12,12.5,13,13.5,14,14.5,15,15.5,16,16.5,17,17.5,18,18.5,19,19.5,20]

   
    useEffect(()=>{
        const body = {location : newDataAtom.location , date : newDataAtom.date};
        async function  f(){
            const res = await  axios.post(`${URL}/api/getdateData`, body);
            setData(res.data);
        } 
        f();
    },[])

    const formatTime = (currentTimeSlot)=>{
        if(currentTimeSlot >= 12)
        {
            if(currentTimeSlot===12) return 12 +": 00 pm"
            else if(currentTimeSlot===12.5) return "12:30 pm"
            else if(currentTimeSlot-parseInt(currentTimeSlot)===0) return parseInt(currentTimeSlot-12)  + ":" + "00" + " pm" 
            else  return parseInt(currentTimeSlot-12)  + ":" + "30" + " pm" 
        }

        else{
            if(currentTimeSlot-parseInt(currentTimeSlot)===0) return parseInt(currentTimeSlot)  + ":" + "00" + " am" 
            else  return parseInt(currentTimeSlot)  + ":" + "30" + " am" 
        }
    }
   
  const handleCheckboxChange = (currentTimeSlot) => {
    if(currentTimeSlot===checkedSlot)  setCheckedSlot(null)

    else setCheckedSlot(currentTimeSlot);
  };
   

    const bookMyTime = async()=>{
        if(checkedSlot!==null){
            const body = { email:dataAtom.email , time : checkedSlot , location : newDataAtom.location , date : newDataAtom.date , numberOfPerson : newDataAtom.numberOfPerson};
            const res = await axios.post(`${URL}/api/bookmyslot`, body);
            const data = res.data;
            navigate("/dashboard/");
        }
    }
 
    return (
       <div className="resultPage_container">
        <ResultPageHeader/>
        {
           timeSlots.map((currentTimeSlot)=>{
                return(
                    <div className = { currentTimeSlot - parseInt(currentTimeSlot)  === 0 ?  ' slotTimeInfo white-bg' : 'slotTimeInfo grey-bg'} >
                        <div className="slotTime">{formatTime(currentTimeSlot)}</div>
                        <input type="checkbox" className="timeForTour" 
                       onChange={() => handleCheckboxChange(currentTimeSlot)}
                       checked={checkedSlot === currentTimeSlot}
                        />
                        <div className="PersonGoing">
                            {
                                data.map((currentPerson)=>{
                                    if(currentPerson.time===currentTimeSlot){
                                        return(
                                        <SlotPerson currentPersonInfo = {currentPerson}/>
                                        )
                                    }
                                })
                            }
                        </div>
                    </div>
                )
           })
        }
        <button className="bookTime" onClick={bookMyTime}>Book my Time</button>
       </div>
    )
}

export default ResultPage;