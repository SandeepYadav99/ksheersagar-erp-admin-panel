import React, {  useEffect, useState } from "react";
import styles from "./styles.module.css";

import { ButtonBase } from "@material-ui/core";
import ic_star from "../../../assets/img/feedback/ic_star.png";

import ic_topnav_logo from "../../../assets/img/feedback/ic_topnav_logo.png";
import ic_download from "../../../assets/img/feedback/ic_download.png";
import historyUtils from "../../../libs/history.utils";


import DigitalItemTable from "./ItemTable";
import InvoiceHook from "./InvoiceHook";


const Invoice = () => {
  // const [invoiceDetails, setInvoiceDetails] = useState();
  const {invoiceDetails, myParam}=InvoiceHook()
  const { posOder, employeeDetail, customerDetail } = invoiceDetails || {};

  // const urlParams = new URLSearchParams(window.location.search);
  // const myParam = urlParams.get("invoice_no");

  // useEffect(() => {
  //   serviceDownloadInvoice({ invoice_no: myParam }).then((res) => {
  //     if (!res?.error) {
  //       const data = res?.data;

  //       setInvoiceDetails(data);
  //     } else {
  //       SnackbarUtils.error(res.message);
  //     }
  //   });
  //   return () => {};
  // }, [myParam]);

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
        <p className={styles.title}>{employeeDetail?.location?.name}</p>
        <p className={styles.subTitle}>
          {employeeDetail?.permanent_address}
        </p>
        <p className={styles.subTitle}>
          Phone No.:<strong>{employeeDetail?.contact || "N/A"}</strong>{" "}
        </p>
        <p className={styles.subTitle}>
          GSTIN:<strong>{employeeDetail?.location?.gstin }</strong>{" "}
          <span className={styles.stateCode}>
            {" "}
            State Code: <strong>{employeeDetail?.location?.state_code }</strong>
          </span>
        </p>
        <p className={styles.subTitle}>
          FSSAI No.:<strong>{employeeDetail?.location?.fssai_number }</strong>{" "}
        </p>
        <p className={styles.subTitle}>
          CIN No.:<strong>{employeeDetail?.location?.cin }</strong>{" "}
        </p>
        <div className={styles.gaps} />
        <hr className={styles.hrLine} />
        {/* Invoice Detail */}
        <p className={styles.title}>Invoice Details</p>
        <p className={styles.subTitle}>
          Invoice No.:<strong>{invoiceDetails?.invoice_no}</strong>{" "}
        </p>
        <p className={styles.subTitle}>
          Date & Time:<strong>{employeeDetail?.updatedAtText}</strong>{" "}
        </p>
        <p className={styles.subTitle}>
          Cashier:<strong>{customerDetail?.name}</strong><span className={styles.stateCode}>Cashier Code: <strong>{}</strong></span>
        </p>
        <p className={styles.subTitle}>
          Mode of Payment:<strong>{posOder?.transection?.type}</strong>{" "} 
        </p>
        <p className={styles.subTitle}>
          Place of Supply:<strong>{employeeDetail?.permanent_address}</strong>{" "}
        </p>
        <div className={styles.gaps} />
        <hr className={styles.hrLine} />
        {/* End DETAILL */}
        {/* customer Detail */}
        <p className={styles.title}>Customer Details</p>
        <p className={styles.subTitle}>
          Name:<strong>{posOder?.customer?.name}</strong>{" "}
        </p>
        <p className={styles.subTitle}>
          Contact No:<strong> {posOder?.customer?.contact}</strong>{" "}
        </p>
        {/* <p className={styles.subTitle}>
          Company Name:<strong>{customerDetail?.business_name}</strong>{" "}
        </p>
        <p className={styles.subTitle}>
          GSTIN:<strong> {customerDetail?.gst_no}</strong>{" "}
        </p> */}

        <div className={styles.gaps} />
        <hr className={styles.hrLine} />
        {/* End Customer Detail */}
        <p className={styles.title}>Summary</p>
        <p className={styles.subTitle}>
          No. of Items: <strong>{posOder?.cart?.items}</strong>{" "}
        </p>
        <p className={styles.subTitle}>
          No. of Boxes: <strong>{posOder?.cart?.boxes}</strong>{" "}
        </p>
        <DigitalItemTable posOder={posOder} customerDetail={customerDetail}/>

        <div className={styles.gaps} />
       
        <div className={styles.gaps} />
        <p className={styles.thankyounote}>Thank you for Shopping with us!</p>
        <p className={styles.subTitlePara}>
          For any queries please call/email us on customer care For any queries
          please call/email us on customer care Visit us at www.ksheersagar.com
        </p>
        <hr className={styles.hrLine} />
        <p className={styles.subTitlePara}>
          Please take a moment to share your feedback with us. It will help us
          to improve so we can serve you better!
        </p>

        <div>
          <img src="" alt="" />
        </div>

        <div className={styles.actions}>
          <div className={styles.star}>
            {[...Array(5)].map((_, index) => (
              <img key={index} src={ic_star} alt="" hight={15} width={15} />
            ))}
          </div>
          <div className={styles.gaps} />
          <div className={styles.gaps} />
          <ButtonBase
            className={styles.createBtn}
            onClick={() =>
              historyUtils.push(
                `/feedback?invoice_id=${myParam}&customer_id=${invoiceDetails?.posOder?.customer_id}`
              )
            }
          >
            SUBMIT FEEDBACK
          </ButtonBase>
        </div>
        {/* ///////////// */}
        <br/>
        <hr className={styles.hrLine} />
        <ul className={styles.ulList}>
          <div className={styles.titleAply}>** T&C Apply</div>
          <li>
            {" "}
            All disputes are subject to Varanasi, Uttar Pradesh, jurisdicition.
          </li>
          <li>Goods once sold will not be taken back or exchanged.</li>
          <li>
            All Bengali Sweets must be kept in a refrigerator and consumed
            within same day.
          </li>
          <li>
            Desi Ghee & Dry Fruit sweets must be consumed within 4 days from
            date of purchase.
          </li>
          <li>
            Khoya sweets must be consumed within 2 days from date of purchase.
          </li>
          <li>
            Dhokla, Rabri, Rasmalai, Cheena Payas, Chhena Roll, Doodh Chamcham
            must be consumed within 6 hours of purchase.
          </li>
          <li>Rasgulla must be consumed within the same day of purchase.</li>
          <li>All prices are inclusive of GST.</li>
          <li>
            Guest are requested to provide digital / physical invoice to collect
            food item (s) From the counter.
          </li>
          <li>
            Total invoice amount is rounded off to next nearest rupees for cash.
          </li>
        </ul>

        <div className={styles.gaps} />
        <hr className={styles.hrLine} />
        <div className={styles.download}>
          <p className={styles.subTitle}>
            Now get a digital copy of your invoice
          </p>
          <div className={styles.footerlink}>
            <a href={`${"/download/invoice"}?invoice_no=${invoiceDetails?.invoice_no}`}>Download Now</a>
            <img src={ic_download} alt="" width={26} height={26} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
