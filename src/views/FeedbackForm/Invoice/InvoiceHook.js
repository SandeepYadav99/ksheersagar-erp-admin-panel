import React, { useEffect, useState } from 'react'
import { serviceDownloadInvoice } from '../../../services/Invoice.service';
import SnackbarUtils from '../../../libs/SnackbarUtils';

const InvoiceHook = () => {
    const [invoiceDetails, setInvoiceDetails] = useState();

 

  const urlParams = new URLSearchParams(window.location.search);
  const myParam = urlParams.get("invoice_no");

  useEffect(() => {
    serviceDownloadInvoice({ invoice_no: myParam }).then((res) => {
      if (!res?.error) {
        const data = res?.data;

        setInvoiceDetails(data);
      } else {
        SnackbarUtils.error(res.message);
      }
    });
    return () => {};
  }, [myParam]);

  return {
    invoiceDetails, 
    myParam
  }
}

export default InvoiceHook