import React, { useState } from "react";
import './Dashboard.css'
import {useNavigate} from 'react-router-dom'
import { useRecoilState } from "recoil";
import newDataInfo from "../recoil/setNewInfo";

const Dashboard = ()=>{
    const navigate = useNavigate();

    const [newData , setNewData] = useRecoilState(newDataInfo)
    let [selectedDate , setSelectedDate ] = useState('');
    const [destination , setDestination] = useState('Pipli Bus Stand');
    const [countperson , setCountPerson] = useState(0);
    const [isError , setIsError]  = useState(false);
    const [errormsg , setErrormsg] = useState('');

    const handleChangeDate = (e)=>{
        selectedDate = new Date(e.target.value);
        const currentDate = new Date();
        const nextSixDays = new Date(currentDate);
        const today = new Date(currentDate);
        today.setDate(currentDate.getDate()-1);
        nextSixDays.setDate(currentDate.getDate() + 7);
        
        if (selectedDate >= today && selectedDate <= nextSixDays) {
            setSelectedDate(e.target.value);
            setIsError(false);
        } 
        else {
            setIsError(true);
            setErrormsg('😤 Please select a valid Date. ');
        }
    }

    const checkResult = ()=>{
        if(countperson==0){
            setIsError(true)
            setErrormsg('😒 Number of Person cannot be 0')
        }
        else{
            setNewData({
               location : destination , 
               date : selectedDate , 
               numberOfPerson : countperson
            })
             navigate('/dashboard/resultPage')
        }
    }

    return (
        <div className="dashboard"> 
        <div id="dashboard_heading">Tour-Share</div>
        <div className="info_container">

            <div className="dropdown">
                <label><b>Choose your destination</b></label>
                <select name="destination" id="destination" value={destination} onChange={(e)=>{setDestination(e.target.value)}}  >
                    <option value="Pipli Bus Stand">Pipli Bus Stand</option>
                    <option value="Railway Station">Railway Station</option>
                    <option value="Birla Mandir">Birla Mandir</option>
                    <option value="KU Gate">KU Gate</option>
                </select>
            </div>
            <div className="otherInfo">
                <div className="tripdate">
                    <label><b>Choose today or next 6 days.</b></label>
                    <input type ='date' id="goingDate"  value={selectedDate} onChange={handleChangeDate} />
                </div>
                <div className="countpeople">
                    <label><b>Number of Person</b></label>
                    <input type="number" id="personGoing" placeholder="No. of Person"  value={countperson} onChange={(e)=>{setCountPerson(e.target.value)}} />
                </div>
            </div>
                <button id="showData" onClick={checkResult}>Show</button>
                {isError && <p className="dashboardErrormsg">{errormsg}</p> }
            </div>

        </div>
    )
}

export default Dashboard;