import { useEffect, useState } from "react";
const useOrderInfo = ({ orderDetail }) => {
  const [headers, setHeaders] = useState([]);
    const [rows, setRows] = useState([]);

  useEffect(() => {
    const headersExtracted = Object.keys(orderDetail);
    setHeaders(headersExtracted);
    
  }, [orderDetail]);

  return { headers };
};

export default useOrderInfo;
