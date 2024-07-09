import React, { useEffect, useState } from "react";
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
  const { invoiceDetails, myParam } = InvoiceHook();
  const { posOder, employeeDetail, customerDetail } = invoiceDetails || {};
  
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
        <p className={styles.subTitleAddres}>
          {employeeDetail?.location?.address}
        </p>
        <p className={styles.subTitle}>
          Phone No.:
          <strong>{employeeDetail?.location?.contact || "N/A"}</strong>{" "}
        </p>
        <p className={styles.subTitle}>
          GSTIN:<strong>{employeeDetail?.location?.gstin}</strong>{" "}
          <span className={styles.stateCode}>
            {" "}
            State Code: <strong>{employeeDetail?.location?.state_code}</strong>
          </span>
        </p>
        <p className={styles.subTitle}>
          FSSAI No.:<strong>{employeeDetail?.location?.fssai_number}</strong>{" "}
        </p>
        <p className={styles.subTitle}>
          CIN No.:<strong>{employeeDetail?.location?.cin}</strong>{" "}
        </p>
        <div className={styles.gaps} />
        <hr className={styles.hrLine} />
        {/* Invoice Detail */}
        <p className={styles.title}>Invoice Details</p>
        <p className={styles.subTitle}>
          Invoice No.:<strong>{invoiceDetails?.invoice_no}</strong>{" "}
        </p>
        <p className={styles.subTitle}>
          Date & Time:<strong>{posOder?.orderData}</strong>{" "}
        </p>
        <p className={styles.subTitle}>
          Cashier:<strong>{posOder?.employee?.name_en}</strong>
          <span className={styles.stateCode}>
            Cashier Code: <strong>{posOder?.employee?.emp_code}</strong>
          </span>
        </p>
        <p className={styles.subTitle}>
          Mode of Payment:<strong>{posOder?.transection?.type}</strong>{" "}
        </p>
        <p className={styles.subTitle}>
          Place of Supply:<strong>{employeeDetail?.location?.city}</strong>{" "}
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
        {customerDetail?.business_name && (
          <p className={styles.subTitle}>
            Company Name:<strong>{customerDetail?.business_name}</strong>{" "}
          </p>
        )}
        {customerDetail?.gst_no && (
          <p className={styles.subTitle}>
            GSTIN:<strong> {employeeDetail?.location?.gstin}</strong>{" "}
          </p>
        )}

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
        <DigitalItemTable posOder={posOder} customerDetail={customerDetail} />

        <div className={styles.gaps} />

        <div className={styles.gaps} />
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

          <div className={styles.gaps1} />

          <ButtonBase
            className={styles.createBtn}
            onClick={() =>
              historyUtils.push(
                `/feedback?invoice_id=${myParam}&customer_id=${invoiceDetails?.posOder?.customer_id}&location_id=${invoiceDetails?.employeeDetail?.location?.id}`
              )
            }
          >
            SUBMIT FEEDBACK
          </ButtonBase>
        </div>
        {/* ///////////// */}
        <br />
        <hr className={styles.hrLine} />
        <ul className={styles.ulList}>
          <div className={styles.titleAply}>** T&C Apply</div>
          <li className={styles.listStyle}>
            {" "}
            All disputes are subject to Varanasi, Uttar Pradesh, jurisdicition.
          </li>
          <li className={styles.listStyle}>
            Goods once sold will not be taken back or exchanged.
          </li>
          <li className={styles.listStyle}>
            All Bengali Sweets must be kept in a refrigerator and consumed
            within same day.
          </li>
          <li className={styles.listStyle}>
            Desi Ghee & Dry Fruit sweets must be consumed within 4 days from
            date of purchase.
          </li>
          <li className={styles.listStyle}>
            Khoya sweets must be consumed within 2 days from date of purchase.
          </li>
          <li className={styles.listStyle}>
            Dhokla, Rabri, Rasmalai, Cheena Payas, Chhena Roll, Doodh Chamcham
            must be consumed within 6 hours of purchase.
          </li>
          <li className={styles.listStyle}>
            Rasgulla must be consumed within the same day of purchase.
          </li>
          <li className={styles.listStyle}>All prices are inclusive of GST.</li>
          <li className={styles.listStyle}>
            Guest are requested to provide digital / physical invoice to collect
            food item (s) From the counter.
          </li>
          <li className={styles.listStyle}>
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
            <a
              href={`${"/download/invoice"}?invoice_no=${
                invoiceDetails?.invoice_no
              }`}
            >
              Download Now
            </a>
            <img src={ic_download} alt="" width={26} height={26} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
