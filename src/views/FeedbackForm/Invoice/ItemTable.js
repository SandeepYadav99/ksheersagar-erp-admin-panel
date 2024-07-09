import React from "react";
import styles from "./styles.module.css";
import ProductTable from "./Component/ProductTable";
import ProductFooter from "./Component/ProductFooter";
import GstTable from "./Component/GstTable";

const DigitalItemTable = ({ posOder }) => {
  return (
    <div>
      <ProductTable posOder={posOder} />
      <div className={styles.gaps} />
      <ProductFooter posOder={posOder} />
      <GstTable posOder={posOder} />
      <hr className={styles.hrLine} />
    </div>
  );
};
export default DigitalItemTable;
