import React from "react";
import styles from "./styles.module.css";
import ProductTable from "./Component/ProductTable";
import ProductFooter from "./Component/ProductFooter";
import GstTable from "./Component/GstTable";
import GstFooter from "./Component/GstFooter";

const DigitalItemTable = ({ posOder }) => {
  return (
    <div className={styles.tableView}>
      <ProductTable posOder={posOder} />
      <div className={styles.gaps} />
      <div className={styles.productFooterView}>
        <ProductFooter posOder={posOder} />
      </div>
      <GstTable posOder={posOder} />
      <div className={styles.productFooterView}>
        <GstFooter posOder={posOder} />
      </div>
      <hr className={styles.hrLine} />
    </div>
  );
};
export default DigitalItemTable;
