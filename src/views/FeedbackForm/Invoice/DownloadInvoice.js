import React, { useCallback, useState } from "react";
import styles from "./styles.module.css";
import ic_topnav_logo from "../../../assets/img/feedback/ic_topnav_logo.png";

import InvoiceHook from "./InvoiceHook";
import DigitalItemTable from "./ItemTable";
const DownloadInvoice = () => {
  const { invoiceDetails, myParam } = InvoiceHook();
  const { posOder, employeeDetail, customerDetail , fssai_no} = invoiceDetails || {};
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
        <p className={styles.titleLocation}>{employeeDetail?.location?.name}</p>
        <p className={styles.subTitleAddres}>{employeeDetail?.location?.address}</p>
        <p className={styles.subTitle}>
          Phone No.: <strong>{employeeDetail?.location?.contact || "N/A"}</strong>{" "}
        </p>
        <p className={styles.subTitle}>
          GSTIN: <strong>{employeeDetail?.location?.gstin}</strong>{" "}
          <span className={styles.stateCode}>
            {" "}
            State Code: <strong>{employeeDetail?.location?.state_code}</strong>
          </span>
        </p>
        <p className={styles.subTitle}>
          FSSAI No.: <strong>{employeeDetail?.location?.fssai_number || "N/A"}</strong>{" "}
        </p>
        <p className={styles.subTitle}>
          CIN No.: <strong>{employeeDetail?.location?.cin}</strong>{" "}
        </p>
        <div className={styles.gaps} />
        <hr className={styles.hrLine} />
        <p className={styles.title}>Invoice Details</p>
        <p className={styles.subTitle}>
          Invoice No.: <strong>{invoiceDetails?.invoice_no}</strong>{" "}
        </p>
        <p className={styles.subTitle}>
          Date & Time: <strong>{posOder?.orderData}</strong>{" "}
        </p>
        <p className={styles.subTitle}>
          Cashier:<strong>{posOder?.employee?.name_en}</strong>
          <span className={styles.stateCode}>
            Cashier Code: <strong>{posOder?.employee?.emp_code}</strong>
          </span>
        </p>
        <p className={styles.subTitle}>
          Mode of Payment: <strong>{posOder?.transection?.type}</strong>{" "}
        </p>
        <p className={styles.subTitle}>
          Place of Supply: <strong>{employeeDetail?.location?.city}</strong>{" "}
        </p>
        <div className={styles.gaps} />
        <hr className={styles.hrLine} />
        {/* End DETAILL */}
        {/* customer Detail */}
        <p className={styles.title}>Customer Details</p>
        <p className={styles.subTitle}>
          Name: <strong>{posOder?.customer?.name}</strong>{" "}
        </p>
        <p className={styles.subTitle}>
          Contact No: <strong> {posOder?.customer?.contact}</strong>{" "}
        </p>
        {customerDetail?.business_name &&
        <p className={styles.subTitle}>
          Company Name: <strong>{customerDetail?.business_name}</strong>{" "}
        </p> }
        {customerDetail?.gst_no && 
        <p className={styles.subTitle}>
          GSTIN: <strong> {employeeDetail?.location?.gstin}</strong>{" "}
        </p>}

        <div className={styles.gaps} />
        <hr className={styles.hrLine} />
        {/* End Customer Detail */}
        <p className={styles.title}>Summary</p>
        <p className={styles.subTitle}>
          No. of Items: <strong>{posOder?.qty}</strong>{" "}
        </p>
        <p className={styles.subTitle}>
          No. of Boxes: <strong>{posOder?.total_boxes}</strong>{" "}
        </p>
        {/* Item List Invoice */}
        <DigitalItemTable posOder={posOder} customerDetail={customerDetail} />

        <div className={styles.gaps} />
        {/* Item List Invoice End*/}

        <p className={styles.thankyounote}>Thank you for Shopping with us!</p>
        <p className={styles.subTitlePara}>
          For any queries please call/email us on customer care M: 7311122332,
          E: customer.care@ksheersagar.com Visit us at{" "}
          <a
            href="https://www.ksheersagar.com"
            target="_blank"
            rel="no-referrer"
          >
            www.ksheersagar.com"
          </a>
        </p>
        <hr className={styles.hrLine} />
        <div className={styles.download}>
          <p className={styles.subTitleQr}>
            Now get a digital copy of your invoice
          </p>
          <div className={styles.footerlinkqr}>
            <img src={posOder?.qr_code} alt="" width={110} height={110} />
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
