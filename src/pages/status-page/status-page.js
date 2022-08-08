import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ALL_URLS } from "../../contants/urls/rout-links";
import { useEffect, useState } from "react";
import { useAuthServices } from "../auth-org/context/auth-context";
import { useBasePath } from "./hook/usebasepath";

export default function StatusPage({ data }) {
  const { loading, verifyLink, confirmEmail } = useAuthServices();

  const [statusData, setStatusData] = useState(
    !!data
      ? data
      : {
          state: undefined,
          title: "Title",
          buttontText: "Go home",
          subtitle: "subtitle",
          buttonTwoText: "",
          buttonOneUrl: "",
          buttonTwoUrl: "",
        }
  );
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
  const params = useParams();
  const location = useLocation();
  const currentPath = useBasePath();
  // console.log(currentPath);
  useEffect(() => {
    if (
      params?.email === undefined ||
      params?.token === undefined ||
      statusData.state !== undefined
    )
      return;
    if (currentPath === "/confirm") {
      confirmEmail({ email: params?.email, token: params?.token })
        .then((res) => {
          console.log(res);
          if (res.success) {
            setStatusData({
              state: true,
              title: "Yaay! your email address has been verified",
              buttontText: "Login now",
              buttonTwoText: "",
              buttonOneUrl: ALL_URLS.loginToOrganization.url,
              subtitle: "Kindly go to the login page and login to your account",
            });
          } else {
            setStatusData({
              state: false,
              title: "Your email could not be verified",
              buttonTwoUrl: ALL_URLS.base.url,
              subtitle: res.message,
              buttontText: "",
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    if (currentPath === "/link") {
      verifyLink({ email: params?.email, token: params?.token }).then((res) => {
        if (res.success) {
          navigate(ALL_URLS.resetPassword.url);
        } else {
          setStatusData({
            state: false,
            title: "Password reset failed",
            buttonTwoUrl: ALL_URLS.base.url,
            subtitle: res.message,
            buttontText: "",
          });
        }
      });
    }
  }, []);

  useEffect(() => {
    switch (currentPath) {
      case ALL_URLS.succesfulRegistration.url:
        setStatusData({
          state: true,
          title: "Confirm your email address",
          buttontText: "Go back home",
          buttonOneUrl: ALL_URLS.base.url,
          buttonTwoText: "",
          subtitle: "A confirmation link has been sent to your email address",
        });
        break;
      case ALL_URLS.succesfullEmailVerification.url:
        setStatusData({
          state: true,
          title: "Password reset has been initiated",
          buttontText: "Go back home",
          buttonTwoText: "",
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
      case "status-page":
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
  }, []);

  // console.log(statusData);
  return (
    <>
      {state === undefined ? (
        <div className="w-full h-full flex-col flex justify-center items-center">
          <div className="border-l-2 mb-2 animate-rotate  border-indigo-500 rounded-full w-14 h-14"></div>
          <span className="text-gray-500">Loading...</span>
        </div>
      ) : (
        <div className="bg-white w-full px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
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
                  <p
                    className={`${
                      state ? "text-gray-500" : "text-red-400"
                    } mt-1 text-base `}
                  >
                    {subtitle}
                  </p>
                </div>
                <div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
                  {buttontText !== "" && (
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
                  )}
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
