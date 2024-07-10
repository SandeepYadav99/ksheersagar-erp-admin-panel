import React from "react";
import styles from "./Style.module.css";
import GstFooter from "./GstFooter";
const GstTable = ({ posOder }) => {
  return (
    <>
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
          {posOder?.products?.map((product) => {
            if (product?.gst_slab) {
              return (
                <>
                  <tr className={styles.hrlinetr}>
                    <td>
                      {" "}
                      {product?.gst_slab ? `${product?.gst_slab}%` : "0%"}
                    </td>

                    <td>₹{product?.taxable_price || "N/A"}</td>
                    <td>₹{(product?.gst / 2)?.toFixed(2)}</td>
                    <td>₹{(product?.gst / 2)?.toFixed(2)}</td>

                    <td>₹0</td>
                    <td>₹{product?.gst ? product?.gst?.toFixed(2) : "0"}</td>
                  </tr>
                  <br />
                </>
              );
            } else {
              return <></>;
            }
          })}

          <GstFooter posOder={posOder} />
        </tbody>
      </table>
    </>
  );
};

export default React.memo(GstTable);
