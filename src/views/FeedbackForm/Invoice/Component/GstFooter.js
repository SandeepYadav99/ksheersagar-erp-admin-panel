import React from "react";
import styles from "./Style.module.css";
const GstFooter = ({ posOder }) => {
  return (
    <>
      {/* <tr className={styles.hrlinetrTender}> */}
      <div className={styles.totalInvoice1}>
        <div className={styles.titleTotal}>Tender Tax</div>
        {/* <td ></td> */}
        <div className={styles.titleTotal1}>₹{posOder?.prices?.gst}</div>
      </div>
      {/* </tr> */}

      <div className={styles.totalInvoice}>
        <div className={styles.titleTotal}>Tender Amount</div>
        {/* <td ></td> */}
        <div className={styles.titleTotal1}>₹{posOder?.prices?.total}</div>
      </div>
      <div className={styles.totalInvoice}>
        <div className={styles.titleTotal}>Return Amount</div>
        {/* <td ></td> */}
        <div className={styles.titleTotal1} >
          ₹{posOder?.billing?.return}
        </div>
      </div>
      {(posOder?.customer?.type === "PRIVILEGED" && posOder?.prices?.total_due) ? (
        <div className={styles.totalInvoice}>
          <div className={styles.titleTotal}>Balance Amount</div>
       
          <div className={styles.titleTotal1} >
            ₹{posOder?.prices?.total_due}
          </div>
        </div>
      ): <></>}
    </>
  );
};

export default React.memo(GstFooter);
