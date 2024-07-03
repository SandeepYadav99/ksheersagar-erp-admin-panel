import React from "react";
import styles from "./styles.module.css";

const DigitalItemTable = () => {
  return (
    <div>
      <table className={styles.myTable}>
        <thead>
          <tr className={styles.bgColor4Cols}>
            <th>Products</th>
            <th>HSN/SAC</th>
            <th>Qty</th>

            <th>Price/Unit</th>
            <th>Total</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Sugar</td>
            <td>10</td>
            <td>₹50/KG</td>
            <td>5% GST</td>
            <td>₹500</td>
          </tr>
        </tbody>
      </table>
      <hr className={styles.hrLine} />
      <div className={styles.totalInvoice}>
        <div className={styles.titleTotal}>Total</div>
        <div className={styles.titleTotal}>₹2230.00</div>
      </div>
      <div className={styles.totalInvoice}>
        <div className={styles.titleTotal}>Round Off</div>
        <div className={styles.titleTotal}>₹0.00</div>
      </div>
      <div className={styles.totalInvoice}>
        <div className={styles.titleTotal}>Net Payable</div>
        <div className={styles.titleTotal}>₹2230.00</div>
      </div>
      <div className={styles.totalInvoice}>
        <div className={styles.titleTotalWord}>Amount in words</div>
        <div className={styles.titleTotal}>
          Two Thousand Two Hundred Thirty Rupees Only
        </div>
      </div>

      {/* ////////// */}
      <table className={styles.myTable}>
        <thead>
          <tr className={styles.bgColor4Cols}>
            <th>GST%</th>
            <th>Taxable</th>
            <th>CGST</th>

            <th>SGST</th>
            <th>IGST</th>
            <th>Total</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>5%</td>
            <td>₹1380.00</td>
            <td>₹34.50</td>
            <td>₹34.50</td>
            <td>₹0.00</td>
            <td>₹69.00</td>
          </tr>
        </tbody>
      </table>
      <hr className={styles.hrLine} />
      <div className={styles.totalInvoice}>
        <div className={styles.titleTotal}>Tender Tax</div>
        <div className={styles.titleTotal}>₹2230.00</div>
      </div>
      <hr className={styles.hrLine} />
      <div className={styles.totalInvoice}>
        <div className={styles.titleTotal}>Tender Amount</div>
        <div className={styles.titleTotal}>₹0.00</div>
      </div>
      <div className={styles.totalInvoice}>
        <div className={styles.titleTotal}>Return Amount</div>
        <div className={styles.titleTotal}>₹2230.00</div>
      </div>
      <hr className={styles.hrLine} />
    </div>
  );
};
export default DigitalItemTable;
