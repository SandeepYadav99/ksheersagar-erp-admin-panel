import React from "react";
import styles from "./Style.module.css";
const GstFooter = ({ posOder }) => {
  
  return (
    <>
      <tr className={styles.hrlinetrTender}>
        <td className={styles.titleTotal}>Tender Tax</td>
        <td colSpan={4}></td>
        <td className={styles.titleTotal} colSpan={4}>
          ₹{posOder?.prices?.gst}
        </td>
      </tr>

      <tr>
        <td className={styles.titleTotal}>Tender Amount</td>
        <td colSpan={4}></td>
        <td className={styles.titleTotal} colSpan={1}>
          ₹{posOder?.prices?.total}
        </td>
      </tr>
      <tr>
        <td className={styles.titleTotal}>Return Amount</td>
        <td colSpan={4}></td>
        <td className={styles.titleTotal} colSpan={4}>
        ₹{posOder?.billing?.return} 
         
        </td>
      </tr>
    </>
  );
};

export default React.memo(GstFooter);
