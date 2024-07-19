import React from "react";
import styles from "./Style.module.css";
const GstFooter = ({ posOder }) => {
  
  return (
    <>
      {/* <tr className={styles.hrlinetrTender}> */}
        <div className={styles.totalInvoice1}>
        <div className={styles.titleTotal}>Tender Tax</div>
        {/* <td colSpan={4}></td> */}
        <div className={styles.titleTotal} colSpan={4}>
          ₹{posOder?.prices?.gst}
        </div>

        </div>
      {/* </tr> */}

      <div className={styles.totalInvoice}>
        <div className={styles.titleTotal}>Tender Amount</div>
        {/* <td colSpan={4}></td> */}
        <div className={styles.titleTotal} colSpan={1}>
          ₹{posOder?.prices?.total}
        </div>
      </div>
      <div className={styles.totalInvoice}>
        <div className={styles.titleTotal}>Return Amount</div>
        {/* <td colSpan={4}></td> */}
        <div className={styles.titleTotal} colSpan={4}>
        ₹{posOder?.billing?.return} 
         
        </div>
      </div>
      {posOder?.customer?.type === "PRIVILEGED" && 
      <div className={styles.totalInvoice1}>
        <div className={styles.titleTotal}>Balance Amount</div>
        {/* <td colSpan={4}></td> */}
        <div className={styles.titleTotal} colSpan={4}>
        ₹{posOder?.prices?.total_due} 
         
        </div>
      </div>}
    </>
  );
};

export default React.memo(GstFooter);
