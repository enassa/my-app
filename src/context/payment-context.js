import React, { createContext, useContext, useState } from "react";
import toast from "../components/toast/toast";
import { BASE_URL, END_POINTS, TOKEN } from "../constants/urls";

const PaymentContext = createContext(null);

const PaymentProvider = ({ children }) => {
  const [paymentStatus, setPaymentStatus] = useState("initiate");
  const [isModalOn, setIsModalOn] = useState(false);
  const [fetching, setFetching] = useState(false);

  const controller = new AbortController();
  const signal = controller.signal;

  const request = async (path, method = "GET", data, action) => {
    let url = `${BASE_URL.dev}${path}`;
    if (method === "GET" && !!data) {
      const params = new URLSearchParams(data);
      url += `?${params.toString()}`;
    }
    setFetching(true);

    return fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${TOKEN.dev}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: method !== "GET" && !!data ? JSON.stringify(data) : undefined,
      signal: signal,
    })
      .then(async (response) => {
        if (response.ok) {
          const responseData = await response.json();
          if (!!responseData.data) {
            return responseData.data;
          }
        }
      })
      .catch((error) => {
        toast({
          type: "error",
          title: "Failed to Process Request",
          description: error?.message,
        });
      })
      .finally(() => {
        setFetching(false);
      });
  };

  const perStatusOutput = (success = null, fail = null, initiate = null) => {
    if (paymentStatus === "success") {
      return success;
    } else if (paymentStatus === "fail") {
      return fail;
    } else return initiate;
  };
  const paymentRequest = async (data) => {
    return request(
      END_POINTS.paymentRequest,
      "POST",
      data
    );
  };
  const checkPaymentStatus = async (clientRef) => {
    return request(
      `${END_POINTS.checkPaymentStatus}/${clientRef}`,
      "GET"
    );
  };

  return (
    <PaymentContext.Provider
      value={{
        fetching,
        paymentStatus,
        isModalOn,
        controller,
        setPaymentStatus,
        setIsModalOn,
        perStatusOutput,
        paymentRequest,
        checkPaymentStatus,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
};

export const usePaymentServices = () => useContext(PaymentContext);

export default PaymentProvider;
