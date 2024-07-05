import React from 'react'
import styles from './styles.module.css'
const GstTableFooter = ({total, calculateOriginalPrice}) => {
  return (
    <tr> <hr className={styles.hrLine} />
    {/* <td className={styles.totalInvoice}> */}
      <td className={styles.titleTotal}>Tender Tax</td>
     <td></td>
     <td></td>
     <td></td>
      <td className={styles.titleTotal}>₹{total}</td>
    {/* </td> */}
    <hr className={styles.hrLine} />
    <td className={styles.totalInvoice}>
      <div className={styles.titleTotal}>Tender Amount</div>
      <div className={styles.titleTotal}>₹0.00</div>
    </td>
    <div className={styles.totalInvoice}>
      <div className={styles.titleTotal}>Return Amount</div>
      <div className={styles.titleTotal}>₹2230.00</div>
    </div>
    <hr className={styles.hrLine} /></tr>
  )
}

export default GstTableFooter