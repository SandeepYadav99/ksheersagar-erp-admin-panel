import React from "react";
import image from "../../../assets/img/KS_logo.png";
const EmpInfo = ({ data }) => {
  console.log(data);
  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        border: "2px solid #00000011",
        color: "#161616",
        fontWeight: "normal",
        fontSize: "1.2rem",
        boxShadow: "2rem",
        width: "25%",
        margin: "5rem auto",
      }}
    >
      <div
       
      >
        <div >
          <div
            style={{
              top: "0px",
              backgroundColor: " #032D55 ",
              opacity: "1",
              width: "100%",
              height: "100.72px",
              textAlign:"center"
             
            }}
          >
            <img src={image} style={{ width: "150px", margin:"20px auto" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img
              style={{
                width: "100px",
                borderRadius: "100px",
                position: "absolute",
                marginTop: "-50px",
              }}
              src={data?.image}
              alt="Profile Image"
            />
          </div>
          <div style={{ textAlign: "center", marginTop: "15%" }}>
            <div>
              <span style={{ fontSize: "1.3rem" }}>{data?.name_en}</span> <br />
              <span style={{ fontSize: "1.3rem" }}>{data?.name_hi}</span>
              <br />
            </div>
            <span style={{ fontSize: "1.5rem", marginTop: "10px" }}>
              {data?.emp_code}
            </span>
          </div>
          <ul
            style={{ listStyle: "none", fontSize: "1.4rem", color: "#161616" }}
          >
            <li>Phone Number:  {data?.contact}</li>
            <li>Father's Name:  {data?.father_name}</li>
            <li>Location:  {data?.current_address}</li>
          </ul>
          <div style={{ textAlign: "right" }}>
            <img src={data?.qr_code} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmpInfo;
