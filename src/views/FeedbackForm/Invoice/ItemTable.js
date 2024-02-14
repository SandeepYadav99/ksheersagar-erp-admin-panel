import React from 'react'
import styles from "./styles.module.css";

const ItemTable = ({groupedData, tableDatas}) => {
  return (
    <div>
      <table className={styles.myTable}>
        <thead>
          <tr>
          
            <th colSpan="4" className={styles.bgColor4Cols}>
              item
            </th>
            <th colSpan="5" className={styles.bgColor4Cols}>
              Qty
            </th>
            <th colSpan="6" className={styles.bgColor4Cols}>
            Price/Unit
            </th>
            <th colSpan="7" className={styles.bgColor4Cols}>
            <th colSpan="9" className={styles.bgColor4Cols}>
            Price/Unit
            </th>
            <th colSpan="10" className={styles.bgColor4Cols}>
            Total
            </th>
            </th>
          </tr>
        </thead>

        <tbody>
       
<tr>
    <td></td>
</tr>
        
              
      
        </tbody>
      </table>
    </div>
  )
}

export default ItemTable