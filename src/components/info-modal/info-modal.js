import React, { useState } from "react";
import { usePaymentServices } from "../../context/payment-context";
import Countdown from "./countdown";

const InfoModal = ({ modalHandler }) => {
  const [countdown, setCountdown] = useState(180);
  const { paymentStatus, setIsModalOn, perStatusOutput, setPaymentStatus } =
    usePaymentServices();

  return (
    <div
      className="min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover"
      id="modal-id"
    >
      <div className="absolute bg-black opacity-80 inset-0 z-0"></div>
      <div className="w-full animate-rise  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white ">
        <div className=" relative">
          {/* {paymentStatus !== "initiate" && (
            <div className="">
              <CloseSvg closeModal={() => setIsModalOn(false)} />
            </div>
          )} */}

          <div className="text-center p-5 flex-auto justify-center ">
            {perStatusOutput(<SuccessSvg />, <FailSvg />, <InitiateSvg />)}
            <h2 className="text-xl font-bold py-4 ">
              <Countdown countdown={countdown} setCountdown={setCountdown} />
              {perStatusOutput(
                "Payment made successfully",
                "Payment Failed",
                "Payment Initiated"
              )}
            </h2>
            <p className="text-sm text-gray-500 px-8">
              {paymentStatus === "initiate" &&
                "Payment request sent to customer..."}
            </p>
          </div>
          <div className="p-3  mt-2 text-center space-x-4 md:block">
            {paymentStatus === "success" && (
              <button
                onClick={() => {
                  setIsModalOn(false);
                  setPaymentStatus("initiate");
                }}
                className="transition-all duration-300 ease-in-out bg-bodyBrown hover:bg-gray-800 mb-2 md:mb-0  px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-md hover:shadow-lg "
              >
                Close
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const InitiateSvg = () => {
  return (
    <>
      {/* INITIALIZING */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-14 h-14 flex items-center  text-bodyBrown mx-auto animate-bounce "
        fill="none"
        viewBox="0 0 28 28"
        stroke="currentColor"
        strokeWidth={1}
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
        />
      </svg>
    </>
  );
};
const SuccessSvg = () => {
  return (
    <>
      {/* SUCCESSFUL */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-16 h-16 flex items-center  text-green-600 mx-auto animate-pulse motion-safe:animate-bounce "
        fill="currentColor"
        viewBox="0 0 20 20"
        stroke="currentColor"
        strokeWidth={1}
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clipRule="evenodd"
        />
      </svg>
    </>
  );
};
const FailSvg = () => {
  return (
    <>
      {/* FAILED */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-16 h-16 flex items-center  text-red-600 mx-auto animate-pulse  "
        fill="currentColor"
        viewBox="0 0 20 20"
        stroke="currentColor"
        strokeWidth={1}
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
          clipRule="evenodd"
        />
      </svg>
    </>
  );
};

export const CloseSvg = ({ closeModal, className = "" }) => {
  return (
    <>
      <button
        type="button"
        className={` ${className} absolute right-0 transition-all duration-300 ease-in-out text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white`}
        data-modal-toggle="defaultModal"
        onClick={() => {
          closeModal();
        }}
      >
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
    </>
  );
};

export const InitiateSvg2 = () => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-white md:mx-2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
        />
      </svg>
    </>
  );
};
export const SuccessSvg2 = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6  md:mx-2 text-green-600"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
};
export const FailSvg2 = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 text-red-500 md:mx-2"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
};

export default InfoModal;
