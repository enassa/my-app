import React from "react";

const PaymentFailed = () => {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <div className="bg-white p-6  md:mx-auto">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-20 h-20 mx-auto my-6  animate-bounce text-red-600"
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
        {/* <svg
          viewBox="0 0 24 24"
          className="text-green-600 w-16 h-16 mx-auto my-6  animate-bounce"
        >
          <path
            fill="currentColor"
            d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
          ></path>
        </svg> */}
        <div className="text-center">
          <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
            Payment Failed
          </h3>
          <p className="text-gray-600 my-2">
            You were unable to complete the payment.
          </p>
          <p> Try Again! </p>
          {/* <div className="py-10 text-center">
            <a
              href="#"
              className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3"
            >
              GO BACK
            </a>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default PaymentFailed;
