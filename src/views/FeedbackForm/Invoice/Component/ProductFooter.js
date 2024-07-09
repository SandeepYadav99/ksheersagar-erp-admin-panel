import React from "react";
import styles from "./Style.module.css";
const ProductFooter = ({ posOder }) => {
  return (
    <div>
      <div className={styles.totalInvoice}>
        <div className={styles.titleTotal}>Total</div>
        <div className={styles.titleTotal}>₹{posOder?.prices?.total}</div>
      </div>
      <div className={styles.totalInvoice}>
        <div className={styles.titleTotal}>Discount</div>
        <div className={styles.titleTotal}>₹0.00</div>
      </div>
      <div className={styles.totalInvoice}>
        <div className={styles.titleTotal}>Round Off</div>
        <div className={styles.titleTotal}>₹{posOder?.prices?.round_off}</div>
      </div>
      <div className={styles.totalInvoice}>
        <div className={styles.titleTotal}>Net Payable</div>
        <div className={styles.titleTotal}>
          ₹{posOder?.prices?.subtotal || 0}
        </div>
      </div>
      <div className={styles.totalInvoice}>
        <div className={styles.titleTotalWord}>Amount in words</div>
        <div className={styles.titleTotalWords}>
          {posOder?.prices?.total_in_words || "N/A"}
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProductFooter);
