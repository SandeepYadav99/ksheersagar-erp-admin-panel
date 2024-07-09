import React from 'react'
import styles from "./Style.module.css"
import GstFooter from './GstFooter';
const GstTable = ({posOder, calculateOriginalPrice}) => {
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
          {posOder?.cart?.products?.map((product) => {
            const originalPriceIs = calculateOriginalPrice(
              posOder?.cart.prices?.subtotal,
              product?.product?.gst_slab
            );
            // CGST , SGST
            const calculateCgst = (originalPriceIs, gstSlab) => {
              return ((originalPriceIs * gstSlab) / 100) / 2;
            };
            // TOTAL 
            const total =
              originalPriceIs +
              product?.product?.gst_slab / 2 +
              calculateCgst(originalPriceIs, product?.product?.gst_slab) +
              calculateCgst(originalPriceIs, product?.product?.gst_slab);
              
            return (
              <>
                <tr>
                  <td>
                    {" "}
                    {product?.product?.gst_slab
                      ? `${product?.product?.gst_slab}%`
                      : "0%"}
                  </td>
                  <td>₹ {originalPriceIs?.toFixed(2)}</td>
                  <td>
                    ₹{" "}
                    {calculateCgst(
                      originalPriceIs,
                      product?.product?.gst_slab
                    ).toFixed(2)}
                  </td>
                  <td>
                  ₹{calculateCgst(
                      originalPriceIs,
                      product?.product?.gst_slab
                    ).toFixed(2)}
                  </td>

                  <td>₹0</td>
                  <td>₹{total ? total.toFixed(2) : "0"}</td>
                </tr>
                <br />
              </>
            );
          })}
      
          <GstFooter/>
        </tbody>
      </table>
    </>
  )
}

export default React.memo(GstTable)