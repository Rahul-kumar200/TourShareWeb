import React,{useState} from "react";
import './ResultPageHeader.css'
import newDataInfo from "../recoil/setNewInfo";
import { useRecoilState } from "recoil";

const ResultPageHeader = ()=>{

    const [newDataAtom , setNewDataAtom] = useRecoilState(newDataInfo);

    return(
       <div className="resultPage_header">
        <div> <b> Location : </b>{newDataAtom.location}</div>
        <div> <b>Date : </b>  {newDataAtom.date}</div>
        <div> <b> Number of Person :</b> {newDataAtom.numberOfPerson}</div>

       </div>
    )
}

export default ResultPageHeader;