import React from 'react'
import styles from '../Invoice/styles.module.css';
import ic_rupee from "../../../assets/img/feedback/ic_rupee.png";
import ic_quantity from "../../../assets/img/feedback/ic_quantity.png";
import ic_print from "../../../assets/img/feedback/ic_print.png";

const InvoiceDetail = ({posOder}) => {
    {posOder?.cart?.products?.map((product) => {
        return (
          <div>
            <p className={styles.title}>{product?.product?.name_en}</p>
            <div className={styles.sugar}>
              <div className={styles.flexbox}>
                <img src={ic_rupee} height={14} width={14} />
                <p className={styles.subTitle}> {product?.price}/unit</p>
              </div>
              <div className={styles.flexbox}>
                <img src={ic_quantity} height={14} width={14} />
                <p className={styles.subTitle}>{product?.weight} Units</p>
              </div>
              <div className={styles.flexbox}>
                <img src={ic_print} height={14} width={14} />
                <p className={styles.subTitle}>5% GST</p>
              </div>
            </div>
            <hr />
          </div>
        );
      })}

}

export default React.memo(InvoiceDetail)