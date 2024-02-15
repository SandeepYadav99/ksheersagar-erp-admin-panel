import React, { useCallback, useState } from "react";
import styles from "./styles.module.css";

import { ButtonBase } from "@material-ui/core";
import ic_star from "../../../assets/img/feedback/ic_star.png";
import ic_rupee from "../../../assets/img/feedback/ic_rupee.png";
import ic_print from "../../../assets/img/feedback/ic_print.png";
import ic_quantity from "../../../assets/img/feedback/ic_quantity.png";
import ic_topnav_logo from "../../../assets/img/feedback/ic_topnav_logo.png";
import ic_download from "../../../assets/img/feedback/ic_download.png";
import historyUtils from "../../../libs/history.utils";
const Invoice = () => {
  const [selectedRating, setSelectedRating] = useState(null);
  const [overAll, setOverAll] = useState("");
  const overAllExperience = useCallback(
    (rating, feedback) => {
      setSelectedRating(rating);
      // overAllExperience(rating);
      setOverAll(feedback);
    },
    [overAll, selectedRating]
  );

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <div className={styles.logo}>
          <img src={ic_topnav_logo} alt="" width={166} height={34} />
        </div>
        <p className={styles.title}>Ksheer Sagar Sonarpura</p>
        <p className={styles.subTitle}>
          B 15/45, Sonarpura, Varanasi, Uttar Pradesh, 221001
        </p>
        <p className={styles.subTitle}>
          GSTIN:<strong>98881091A35</strong>{" "}
        </p>
        <div className={styles.gaps} />
        <p className={styles.title}>Summary</p>
        <p className={styles.subTitle}>
          Invoice Number: <strong>INV - BC/2023/08/21</strong>{" "}
        </p>
        <p className={styles.subTitle}>
          Date: <strong>12/08/2023 | 11:00 AM</strong>{" "}
        </p>
        <p className={styles.subTitle}>
          Temp Sales Order: <strong>KS/BC/2023/08/200</strong>{" "}
        </p>
        <p className={styles.subTitle}>
          Cashier: <strong>Abhinav Sharma</strong>{" "}
        </p>
        <div className={styles.gaps} />
        <p className={styles.title}>Customer Details</p>
        <p className={styles.subTitle}>
          <strong>Aakash Singh</strong>
        </p>
        <p className={styles.subTitle}>
          <strong>9887698342</strong>
        </p>
        <p className={styles.subTitle}>
          GSTIN:<strong> 33881091A35</strong>
        </p>
        <div className={styles.gaps} />
        <hr />
        <div className={styles.gaps} />
        <p className={styles.subTitle}>
          Please take a moment to share your feedback with us. It will help us
          to improve so we can serve you better!
        </p>
        <div>
          <img src="" alt="" />
        </div>

        <div className={styles.actions}>
          <div className={styles.star}>
            {[...Array(5)].map((_, index) => (
              <img key={index} src={ic_star} alt="" hight={11} width={11} />
            ))}
          </div>
          <div className={styles.gaps} />
          <ButtonBase className={styles.createBtn} onClick={()=>historyUtils.push("/over/all/feedback")}>SUBMIT FEEDBACK</ButtonBase>
        </div>
        <hr />
        <div className={styles.gaps} />
        <p className={styles.title}>Invoice Details</p>
        <div className={styles.gaps} />
        <div className={styles.footer}>
          <p className={styles.subTitle}>
            Total Amount:
            <br /> <strong> ₹1000</strong>
          </p>
          <p>
            <span className={styles.subTitle}>No. of Items: 02</span> <br />
            <span className={styles.subTitle}>No. of Boxes: 20</span>
          </p>
        </div>
        <div className={styles.gaps} />
        <p className={styles.title}>Sugar</p>
        <div className={styles.sugar}>
          <div className={styles.flexbox}>
            <img src={ic_rupee} height={14} width={14} />
            <p className={styles.subTitle}> ₹50/unit</p>
          </div>
          <div className={styles.flexbox}>
            <img src={ic_quantity} height={14} width={14} />
            <p className={styles.subTitle}>10 Units</p>
          </div>
          <div className={styles.flexbox}>
            <img src={ic_print} height={14} width={14} />
            <p className={styles.subTitle}>5% GST</p>
          </div>
        </div>
        <hr />
        <div className={styles.gaps} />
        <p className={styles.title}>Cardamom</p>
        <div className={styles.sugar}>
          <div className={styles.flexbox}>
            <img src={ic_rupee} height={14} width={14} />
            <p className={styles.subTitle}> ₹50/unit</p>
          </div>
          <div className={styles.flexbox}>
            <img src={ic_quantity} height={14} width={14} />
            <p className={styles.subTitle}>10 Units</p>
          </div>
          <div className={styles.flexbox}>
            <img src={ic_print} height={14} width={14} />
            <p className={styles.subTitle}>5% GST</p>
          </div>
        </div>
        <div className={styles.footer}>
          <p className={styles.subTitle}>Total</p>
          <p className={styles.subTitle}>
            <strong>₹500</strong>{" "}
          </p>
        </div>
        <hr />
        <div className={styles.download}>
          <p className={styles.subTitle}>
            Now get a digital copy of your invoice
          </p>
          <div className={styles.footerlink}>

          <a href="/download/invoice">Download Now</a>
          <img src={ic_download} alt="" width={26} height={26}/>
          </div>
        </div>
      
      </div>
    </div>
  );
};

export default Invoice;
