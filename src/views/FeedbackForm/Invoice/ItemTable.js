import React from "react";
import styles from "./styles.module.css";

const DigitalItemTable = ({ posOder }) => {
  function calculateOriginalPrice(finalPrice, gstRate) {

    const originalPrice = finalPrice / (1 + (gstRate / 100));
    return originalPrice;
  }

  function calculateSgst(price, gstRate) {

    const sgst = (price * gstRate) / 100;
    return sgst;
  }
  
//   const calculateIgst =(gst_slab, price)=>{
// return (gst_slab/2) + calculateIgst(price, gst_slab)
//   }
  return (
    <div>
      <table className={styles.myTable}>
        <thead>
          <tr className={styles.bgColor4Cols}>
            <th>Products</th>
            <th>HSN/SAC</th>
            <th>Qty</th>

            <th>Price/Unit</th>
            <th>GST%</th>
            <th>Total</th>
          </tr>
        </thead>

        <tbody>
          {posOder?.cart?.products?.map((product) => {
            return (
              <tr>
                <td>{product?.product?.name_en}</td>
                <td>{0}</td>
                <td>{product?.weight}</td>
                <td>₹{product?.product?.price}/{product?.weight}</td>
                <td> {product?.product?.gst_slab ? `${product?.product?.gst_slab}%` : "0%"}</td>
                <td>₹{product?.price}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <hr className={styles.hrLine} />
      <div className={styles.totalInvoice}>
        <div className={styles.titleTotal}>Total</div>
        <div className={styles.titleTotal}>₹{posOder?.cart.prices?.total}</div>
      </div>
      <div className={styles.totalInvoice}>
        <div className={styles.titleTotal}>Round Off</div>
        <div className={styles.titleTotal}>₹0.00</div>
      </div>
      <div className={styles.totalInvoice}>
        <div className={styles.titleTotal}>Net Payable</div>
        <div className={styles.titleTotal}>₹{posOder?.cart.prices?.subtotal}</div>
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
        {posOder?.cart?.products?.map((product) => {
            return (
          <tr>
            <td>{product?.product?.gst_slab}%</td>
            <td>₹{calculateOriginalPrice(posOder?.cart.prices?.subtotal, product?.product?.gst_slab ).toFixed(2)}</td>
            <td>₹{product?.product?.gst_slab/2}</td>
            <td>₹{calculateSgst(product?.product?.price, product?.product?.gst_slab).toFixed(2)}</td>
            <td>₹{}</td>
            <td>₹69.00</td>
          </tr>)})}
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
