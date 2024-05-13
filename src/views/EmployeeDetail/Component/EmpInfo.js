import React, { useEffect, useState } from "react";
import image from "../../../assets/img/KS_logo.png";
import styles from "./Styles.module.css";
import { serviceGetEmployCardDetails } from "../../../services/Employee.service";

import { useParams } from "react-router-dom";
const EmpInfo = () => {
  const [data, setData] = useState(null);
  const {empId}=useParams()
  // const location = useLocation();
  // const { empId } = location.state;

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
           
          >
            <img src={image} style={{ }} />
          </div>
          <div className={styles.imageContainer} >
            <img
            className={styles.imageProfile}
           
              src={data?.image}
              alt="Profile Image"
            />
          </div>
          <div  className={styles.title}>
            <div>
              <span >{data?.name_en}</span> <br />
              <span >{data?.name_hi}</span>
              <br />
            </div>
            <span className={styles.title}>
              {data?.emp_code}
            </span>
          </div>
          <ul
          className={styles.listStyle}
          
          >
            <li style={{ marginBottom: "8px" }}>
              <strong> Phone Number:</strong> {data?.contact}
            </li>
            <li style={{ marginBottom: "8px" }}>
            <strong>  Father's Name:</strong> {data?.father_name}
            </li>
            <li style={{ marginBottom: "8px" }}>
            <strong>  Location:</strong> {data?.location}
            </li>
          </ul>
          <div className={styles.qr} >
            <img src={data?.qr_code} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmpInfo;
