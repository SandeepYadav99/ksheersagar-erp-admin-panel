import React from "react";
import styles from "./styles.module.css";

const ItemTable = () => {
  return (
    <div>
      <table className={styles.myTable}>
        <thead>
          <tr className={styles.bgColor4Cols}>
            <th>item</th>
            <th>Qty</th>
            <th>Price/Unit</th>
          
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
      <hr/>
    
    </div>
  );
};

export default ItemTable;
