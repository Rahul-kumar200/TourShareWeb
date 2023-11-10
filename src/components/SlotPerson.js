import React from "react";
import './SlotPerson.css';

const SlotPerson = (props)=>{
    return (
       <div className="aPerson">
        <div className="personName">
           Name : { props.currentPersonInfo.username} ({props.currentPersonInfo.numberOfPerson})
        </div>
        <div className="personPhone">
            Phone no. : {props.currentPersonInfo.phone}
        </div>
         </div>
    )
}

export default SlotPerson;