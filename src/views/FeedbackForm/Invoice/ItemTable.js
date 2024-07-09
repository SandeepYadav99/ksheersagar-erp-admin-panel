import React from "react";
import styles from "./styles.module.css";
import ProductTable from "./Component/ProductTable";
import ProductFooter from "./Component/ProductFooter";
import GstTable from "./Component/GstTable";

const DigitalItemTable = ({ posOder }) => {
  function calculateOriginalPrice(finalPrice, gstRate) {
    const originalPrice = finalPrice / (1 + gstRate / 100);
    return originalPrice || 0;
  }


  return (
    <div>
      <ProductTable posOder={posOder} />
      <hr className={styles.hrLine} />
      <ProductFooter posOder={posOder}/>
      <GstTable
        posOder={posOder}
        calculateOriginalPrice={calculateOriginalPrice}
      />
    </div>
  );
};
export default DigitalItemTable;
