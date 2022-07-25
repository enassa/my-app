// import logo from "../assets/imgs/logo.jpeg";
import { User } from "../../components/contants/ui-data";

export const BASE_URL = {
  dev:
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_BASE_URL
      : "https://staging-api.potbelly.casantey.com",
  // dev: "https://1586-154-160-1-173.ngrok.io",
  production: "",
  test: "",
};
export const TOKEN = {
  // dev: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJQT1RCRUxMWSIsImlzcyI6IlN5c19BZG1pbiIsImV4cCI6MTY2NDM2ODE0NX0.IwaAZPtmov7X1fvJAYzdFL0o2Xrg02gDXNZpMkWzHHY",
  dev:
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_TOKEN
      : "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJQT1RCRUxMWSIsImlzcyI6IlN5c19BZG1pbiIsImV4cCI6MTY2NDkwNDYxNn0.zNOAmUOxb956hGilcBwYFbcw4tCbBV_FnMLB4A75gcE",
};
export const MAP_API_KEY = {
  dev:
    process.env.NODE_ENV === "production"
      ? "AIzaSyA7sWsutmfPAZN8O67oMyhep71hQkENqDo"
      : // : "AIzaSyCNkHiAo8PPxV0NHTtW0u0mNYhLW8QUEB8",
        "AIzaSyA7sWsutmfPAZN8O67oMyhep71hQkENqDo",
  // dev:
  //   process.env.NODE_ENV === "production"
  //     ? process.env.REACT_MAP_API_KEY
  //     : // : "AIzaSyCNkHiAo8PPxV0NHTtW0u0mNYhLW8QUEB8",
  //       "AIzaSyAMGYi9QygVX0B4Jwer_VaNP8Q9XMh_sWo",
};
export const END_POINTS = {
  // Account management staffend points
  loginToVoteScreen: "/staff/create-staff",
  loginToVoteResults: "/staff/update-staff",
  loginToOrganization: "/staff/list",
  registerOrganization: "/staff/delete-staff",
  votingScreen: "/staff/reset-password",
  votingSuccess: "/staff/reset-password",
  resultScreen: "/staff/initiate-password-reset",
  viewElection: "/staff/email",
  vote: "/otp/verifyByEmail",

  getElectionList: "/elections/list",
  updateElection: "elections/update",
  deleteElection: "/elections/delete",
  resetElection: "/elections/reset",
  createElection: "/elections/create",
};

export const HOME_URL = () => {
  console.log("++++++++++++++", User().role);
  switch (User().role) {
    case "Manager":
      return "ALL_URLS.mainDashboard.url";
    default:
      return "/";
  }
};

export const ORG_CODE = () => User()?.organizationCode;

export const BRANCH = () => User()?.branch;

export const ORG_NAME = () => User()?.organizationName;

export const IS_SUPER_ACCOUNT = () => User()?.role === "Super";

export const EMAIL = () => User()?.email;

export const USERNAME = () => User()?.name;

export const ORG_LOGO = () => User()?.organizationLogoUrl;

// export const MAIN_LOGO = () => logo;

export const secondsPerFetch = 999999999;
