import React, { useCallback, useState } from "react";
import styles from "./styles.module.css";



import dummy_qr from "../../../assets/img/feedback/dummy qr.png";

import ic_topnav_logo from "../../../assets/img/feedback/ic_topnav_logo.png";

import ItemTable from "./ItemTable";
const DownloadInvoice = () => {
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
          <br />
          <span className={styles.logoTitle}>Tax Invoice</span>
          <br />
          <span className={styles.logoInvoice}>(Digital Invoice)</span>
        </div>
        <hr className={styles.hrLine} />
        <p className={styles.title}>Ksheer Sagar Sonarpura</p>
        <p className={styles.subTitle}>
          B 15/45, Sonarpura, Varanasi, Uttar Pradesh, 221001
        </p>
        <p className={styles.subTitle}>
          GSTIN:<strong>98881091A35</strong>{" "}
        </p>
        <p className={styles.subTitle}>
          Phone No.<strong>8762209802</strong>{" "}
        </p>
        <p className={styles.subTitle}>
          CIN: <strong>UI567HH78KL009</strong>{" "}
        </p>
        <p className={styles.subTitle}>
          FSSAI No: <strong>209456880011</strong>{" "}
        </p>
        {/* <p className={styles.subTitle}>
          Website. <a href="https://ksheersagar.com/">https://ksheersagar.com/</a>{" "}
        </p> */}
        {/* Detail INvoice */}
        <hr className={styles.hrLine} />
        <div className={styles.gaps} />
        <p className={styles.title}>Invoice Details</p>
        <p className={styles.subTitle}>
          Invoice No.:<strong>INV-BC/2023/08/21</strong>{" "}
        </p>
        <p className={styles.subTitle}>
          Date & Time:<strong>28/06/2024 ǀ 01:44 PM</strong>{" "}
        </p>
        <p className={styles.subTitle}>
          Cashier:<strong>Abhinav Sharma</strong>{" "}
        </p>
        <p className={styles.subTitle}>
          Mode of Payment:<strong>Cash</strong>{" "}
        </p>
        <p className={styles.subTitle}>
          Place of Supply:<strong>Varanasi, Uttar Pradesh</strong>{" "}
        </p>

        {/* End */}
        <div className={styles.gaps} />
        <hr className={styles.hrLine} />
        {/* End DETAILL */}
        {/* customer Detail */}
        <p className={styles.title}>Customer Details</p>
        <p className={styles.subTitle}>
          Name:<strong>Abhinav Sharma</strong>{" "}
        </p>
        <p className={styles.subTitle}>
          Contact No:<strong> 9805798997</strong>{" "}
        </p>
        <p className={styles.subTitle}>
          Company Name:<strong> XYZ Bakery</strong>{" "}
        </p>
        <p className={styles.subTitle}>
          GSTIN:<strong> 23AAECH789D1Z8</strong>{" "}
        </p>

        <div className={styles.gaps} />
        <hr className={styles.hrLine} />
        {/* End Customer Detail */}
        <p className={styles.title}>Summary</p>
        <p className={styles.subTitle}>
          No. of Items: <strong>03</strong>{" "}
        </p>
        <p className={styles.subTitle}>
          No. of Boxes: <strong>04</strong>{" "}
        </p>
        {/* Item List Invoice */}
        <div>
          <ItemTable />
        </div>
        {/* Item List Invoice End*/}

        <p className={styles.thankyounote}>Thank you for Shopping with us!</p>
        <p className={styles.subTitlePara}>
        For any queries please call/email us on customer care
        M: 7311122332, E: customer.care@ksheersagar.com
        Visit us at <a href="www.ksheersagar.com" target="_blank"rel="noopener">www.ksheersagar.com</a>
        </p>
        <hr className={styles.hrLine}/>
        <div className={styles.download}>
          <p className={styles.subTitleQr}>
            Now get a digital copy of your invoice
          </p>
          <div className={styles.footerlinkqr}>
            <img src={dummy_qr} alt="" width={110} height={110} />
            {/* <p className={styles.footertitle}>
              {" "}
              Thank you for visiting Ksheer Sagar, we are delightful to serve
              you !
            </p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadInvoice;
