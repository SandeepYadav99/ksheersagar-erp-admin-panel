import React, { useState } from "react";
import styles from "./styles.module.css";

const DigitalItemTable = ({ posOder }) => {
  function calculateOriginalPrice(finalPrice, gstRate) {
    const originalPrice = finalPrice / (1 + gstRate / 100);
    return originalPrice || 0;
  }

  function calculateSgst(price, gstRate) {
    const sgst = (price * gstRate) / 100;
    return sgst || 0;
  }

  const calculateIgst = (gst_slab, price) => {
    const igst = gst_slab + price;
    return igst || 0;
  };

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
                <td>{product?.product?.hsn}</td>
                <td>{product?.weight}</td>
                <td>₹{product?.product?.price}</td>
                <td>
                  {" "}
                  {product?.product?.gst_slab
                    ? `${product?.product?.gst_slab}%`
                    : "0%"}
                </td>
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
        <div className={styles.titleTotal}>
          ₹{posOder?.cart.prices?.subtotal}
        </div>
      </div>
      <div className={styles.totalInvoice}>
        <div className={styles.titleTotalWord}>Amount in words</div>
        <div className={styles.titleTotal}>
          Two Thousand Two Hundred Thirty Rupees Only
        </div>
      </div>

      {/* ////////// GST TABLE */}
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
            const total =
              calculateOriginalPrice(
                posOder?.cart.prices?.subtotal,
                product?.product?.gst_slab
              ) +
              product?.product?.gst_slab / 2 +
              calculateIgst(
                product?.product?.gst_slab / 2,
                calculateSgst(
                  product?.product?.price,
                  product?.product?.gst_slab
                )
              );
            return (
              <>
                <tr>
                  <td>
                    {" "}
                    {product?.product?.gst_slab
                      ? `${product?.product?.gst_slab}%`
                      : "0%"}
                  </td>
                  <td>
                    ₹
                    {calculateOriginalPrice(
                      posOder?.cart.prices?.subtotal,
                      product?.product?.gst_slab
                    ).toFixed(2) || "0"}
                  </td>
                  <td>
                    ₹{" "}
                    {product?.product?.gst_slab
                      ? `${product?.product?.gst_slab / 2}`
                      : "0"}
                  </td>
                  <td>
                    ₹
                    {calculateSgst(
                      product?.product?.price,
                      product?.product?.gst_slab
                    ).toFixed(2) || "0"}
                  </td>
                  <td>
                    ₹
                    {calculateIgst(
                      product?.product?.gst_slab / 2,
                      calculateSgst(
                        product?.product?.price,
                        product?.product?.gst_slab
                      )
                    ).toFixed(2) || "0"}
                  </td>
                  <td>₹{total ? total.toFixed(2) : "0"}</td>
                </tr>
                <br />
              </>
            );
          })}
          <tr className={styles.hrlinetr}>
            <td className={styles.titleTotal}>Tender Tax</td>
            <td colSpan={4}></td>
            <td className={styles.titleTotal} colSpan={4}>
              ₹{"00"}
            </td>
          </tr>

          <tr className={styles.hrlinetr}>
            <td className={styles.titleTotal}>Tender Amount</td>
            <td colSpan={4}></td>
            <td className={styles.titleTotal} colSpan={1}>
              ₹{"000"}
            </td>
          </tr>
          <tr>
            <td className={styles.titleTotal}>Return Amount</td>
            <td colSpan={4}></td>
            <td className={styles.titleTotal} colSpan={4}>
              ₹{"000"}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default DigitalItemTable;
