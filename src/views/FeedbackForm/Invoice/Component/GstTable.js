import React from "react";
import styles from "./Style.module.css";

const GstTable = ({ posOder }) => {

  const groupedProducts = {};
  posOder?.products?.forEach((product) => {
    if (product?.gst_slab) {
      const slab = product?.gst_slab;
      if (!groupedProducts[slab]) {
        groupedProducts[slab] = {
          taxable_price: 0,
          gst: 0,
        };
      }
      groupedProducts[slab].taxable_price += product.taxable_price || 0;
      groupedProducts[slab].gst += product.gst || 0;
      
    }
  });

  return (
    <div style={{overflowX:"auto"}}>
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
          {Object.keys(groupedProducts).map((slab) => {
            const product = groupedProducts[slab];
            return (
              <>
                <tr className={styles.hrlinetr}>
                  <td>{slab ? `${slab}%` : "0%"}</td>
                  <td>₹{product.taxable_price.toFixed(2)}</td>
                  <td>₹{(product.gst / 2).toFixed(2)}</td>
                  <td>₹{(product.gst / 2).toFixed(2)}</td>
                  <td>₹0</td>
                  <td>₹{product.gst.toFixed(2)}</td>
                </tr>
                <br />
              </>
            );
          })}
         

        
        </tbody>
      </table>
    </div>
  );
};

export default React.memo(GstTable);
