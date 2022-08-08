// import logo from "../assets/imgs/logo.jpeg";
import { User } from "../../components/contants/ui-data";

export const BASE_URL = {
  dev:
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_BASE_URL
      : "http://localhost:3030",
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

export const END_POINTS = {
  // Account management staffend points
  loginToVoteScreen: "/api/election/login/voting-screen",
  loginToResultsScreen: "/api/election/login/resulst-screen",
  loginToOrganization: "/api/election/login",
  registerOrganization: "/api/election/register",
  confirmEmail: "/api/election/confirm",
  castVote: "/api/election/vote/cast",

  getElectionList: "/api/election/list",
  getResults: "/api/election/results",

  deleteElection: "/api/election/delete",
  resetElection: "/api/election/reset",
  createElection: "/api/election/create",

  // forgot password
  forgotPassword: "/api/election/forgot-password",
  verifyLink: "/api/election/link",
  resetPassword: "/api/election/reset-password",

  // CRUD OPERATION
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
