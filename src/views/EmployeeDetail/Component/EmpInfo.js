import React, { useEffect, useState } from "react";
import image from "../../../assets/img/KS_logo.png";
import styles from "./Styles.module.css";
import { serviceGetEmployCardDetails } from "../../../services/Employee.service";
import { useLocation } from "react-router-dom";
const EmpInfo = () => {
  const [data, setData] = useState(null);
  const location = useLocation();
  const { empId } = location.state;
console.log(empId, "Empid")
  useEffect(() => {
    serviceGetEmployCardDetails({ id: empId }).then((res) => {
      if (!res?.error) {
        console.log(res)
        const data = res?.data?.details
        setData(data)
      }
    });
  }, [empId]);

  return (
    <div className={styles.employInfoContainer} style={{}}>
      <div>
        <div>
          <div
          className={styles.subemployInfoContainer}
            style={{
              top: "0px",
              backgroundColor: " #032D55 ",
              opacity: "1",
              width: "100%",
              height: "100.72px",
              textAlign: "center",
            }}
          >
            <img src={image} style={{ width: "150px", margin: "20px auto" }} />
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
              <span style={{ fontSize: "1.1rem" }}>{data?.name_en}</span> <br />
              <span style={{ fontSize: "1.1rem" }}>{data?.name_hi}</span>
              <br />
            </div>
            <span style={{ fontSize: "1.2rem", marginTop: "10px" }}>
              {data?.emp_code}
            </span>
          </div>
          <ul
            style={{ listStyle: "none", fontSize: "1.4rem", color: "#161616" }}
          >
            <li style={{ marginBottom: "8px" }}>
              Phone Number: {data?.contact}
            </li>
            <li style={{ marginBottom: "8px" }}>
              Father's Name: {data?.father_name}
            </li>
            <li style={{ marginBottom: "8px" }}>
              Location: {data?.location}
            </li>
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
