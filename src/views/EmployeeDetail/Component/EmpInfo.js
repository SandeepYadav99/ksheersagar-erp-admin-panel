import React from "react";
import styles from "./Style.module.css";
const EmpInfo = ({ data }) => {
  console.log(data);
  return (
    <div style={{display:"flex", flexDirection:"column", justifyContent:"center"}}>
      <div>
        <img src=""/>
      </div>
      <img
        style={{width:"200px"}}
        src={data?.image}
        alt="Profile Image"
      />
      <div>
        <h2>{data?.name_en}</h2>
        <h4>{data?.name_hi}</h4>
        <h3>{data?.emp_code}</h3>
      </div>
      <ul>
        <li>Phone Number - {data?.contact}</li>
        <li>Father's Name : {data?.father_name}</li>
        <li>Location : {data?.current_address}</li>
      </ul>
      <div>
      <img src={data?.qr_code} />
      </div>
    </div>
  );
};

export default EmpInfo;
