import React from "react";
import styles from "./Style.module.css";
const ProductTable = ({ posOder }) => {
  return (
    <div style={{overflowX:"auto"}}>
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
          {posOder?.products?.map((product, index) => {
            return (
              <tr className={styles.hrlinetr}>
                <td>{product?.name_en}</td>
                <td>{product?.hsn || "N/A"}</td>
                <td>
                  {product?.qty} {product?.unit}
                </td>
                <td>₹{product?.list_price}</td>
                <td> {product?.gst_slab? `${product?.gst_slab}%` : "0%"}</td>
                <td>₹{product?.price}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default React.memo(ProductTable);
