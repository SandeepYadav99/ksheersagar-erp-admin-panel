import React from "react";
import image from "../../../../../assets/img/KS_logo.png";

const EmpInfo_Qr = ({ data }) => {
  return (
    <div
      style={{
        backgroundColor: "#00000000",
        border: "2px solid #00000011",
        color: "#161616",
        fontWeight: "normal",
        fontSize: "1.2rem",
        boxShadow: "2rem",
        width: "23%",
        margin: "5rem auto",
      }}
    >
      <div>
        <div>
          <div
            style={{
              opacity: "1",
              width: "100%",
              height: "100.72px",
              textAlign: "center",
            }}
          >
            <img src={image} style={{ width: "200px", margin: "20px auto" }} />
          </div>
          <div style={{display:"flex", flexDirection:"column"}}>
            <span style={{ textAlign: "center" , fontWeight:"bold", fontSize:"1.3rem"}}>
              {data?.name_en || data?.name}
            </span>
            <span style={{  textAlign: "center" , fontWeight:"bold", fontSize:"1rem"}}>
              {data?.name_hi}
            </span>
          </div>
          <div style={{ textAlign: "center" }}>
            <img src={data?.qr_code} />
          </div>
          <h3 style={{ textAlign: "center" }}>{data?.type}</h3>
        </div>
      </div>
    </div>
  );
};

export default EmpInfo_Qr;
