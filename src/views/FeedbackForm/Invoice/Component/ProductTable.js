import React from 'react'
import styles from "./Style.module.css"
const ProductTable = ({posOder}) => {
  return (
    <><table className={styles.myTable}>
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
      {posOder?.cart?.products?.map((product, index) => {
        const unitsIn = product?.product?.units?.map((n) => n?.name);

        return (
          <tr>
            <td>{product?.product?.name_en}</td>
            <td>{product?.product?.hsn || "N/A"}</td>
            <td>
              {product?.weight} {unitsIn}
            </td>
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
  </table></>
  )
}

export default React.memo(ProductTable)