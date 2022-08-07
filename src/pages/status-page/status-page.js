import { useLocation, useNavigate } from "react-router-dom";
import { ALL_URLS } from "../../contants/urls/rout-links";
import { useState } from "react";

export default function StatusPage() {
  const [statusData, setStatusData] = useState({
    state: undefined,
    title: "Title",
    buttontText: "Go home",
    subtitle: "subtitle",
    buttonTwoText: "",
    buttonOneUrl: "",
    buttonTwoUrl: "",
  });
  const {
    state,
    title,
    buttontText,
    buttonTwoText,
    subtitle,
    buttonOneUrl,
    buttonTwoUrl,
  } = statusData;
  const navigate = useNavigate();

  const location = useLocation();
  const currentPath = location.pathname;

  switch (currentPath) {
    case ALL_URLS.succesfulRegistration.url:
      setStatusData({
        state: true,
        title: "Confirm your email address",
        buttontText: "Go back home",
        buttonOneUrl: ALL_URLS.base.url,
        subtitle: "A confirmation link has been sent to your email address",
      });
      break;
    case ALL_URLS.succesfullEmailVerification.url:
      setStatusData({
        state: true,
        title: "Password reset has been initiated",
        buttontText: "Go back home",
        buttonOneUrl: ALL_URLS.base.url,
        subtitle:
          "A link has been sent to your email address for resetting your password",
      });
      break;
    case ALL_URLS.succesfulPasswordReset.url:
      setStatusData({
        state: true,
        title: "Password reset was succesfully",
        buttontText: "Go to login page",
        buttonOneUrl: ALL_URLS.loginToOrganization.url,
        subtitle: "Go to the login screen to login with your new passwor",
      });
      break;

    default:
      break;
  }
  return (
    <>
      {state === undefined ? (
        <div className="w-full h-full flex-col flex justify-center items-center">
          <div className="border-l-2 mb-2 animate-rotate  border-indigo-500 rounded-full w-14 h-14"></div>
          <span className="text-gray-500">Loading...</span>
        </div>
      ) : (
        <div className="bg-white min-h-full px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
          <div className="max-w-max mx-auto">
            <main className="sm:flex">
              <p
                className={`${
                  state ? "text-green-600 " : "text-red-400"
                } text-4xl font-extrabold sm:text-5xl`}
              >
                {state ? "Success" : "Error"}
              </p>
              <div className="sm:ml-6">
                <div className="sm:border-l sm:border-gray-200 sm:pl-6">
                  <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
                    {title}
                  </h1>
                  <p className="mt-1 text-base text-gray-500">{subtitle}</p>
                </div>
                <div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(buttonOneUrl || "#");
                    }}
                    href="/"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    {buttontText}
                  </a>
                  {buttonTwoText !== "" && (
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(buttonTwoUrl || "#");
                      }}
                      href="/"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Go home
                    </a>
                  )}
                </div>
              </div>
            </main>
          </div>
        </div>
      )}
    </>
  );
}
