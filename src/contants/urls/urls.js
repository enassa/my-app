// import logo from "../assets/imgs/logo.jpeg";
import { User } from "../../components/contants/ui-data";

const devMode = false;
export const BASE_URL = devMode
  ? {
      dev: "http://localhost:3030",
    }
  : {
      dev:
        process.env.NODE_ENV === "production"
          ? process.env.REACT_APP_BASE_URL
          : "http://localhost:3030",
      // dev: "https://1586-154-160-1-173.ngrok.io",
      production: "",
      test: "",
    };
export const END_POINTS = {
  // Account management staffend points
  loginToVoteScreen: "/api/election/login/voting-screen",
  loginToResultsScreen: "/api/elections/results-login",
  loginToOrganization: "/api/election/login",
  registerOrganization: "/api/election/register",
  confirmEmail: "/api/election/confirm",

  getElectionList: "/api/elections/list",
  getSingleElection: "/api/elections/single",
  getResults: "/api/election/results",

  deleteElection: "/api/election/delete",

  // forgot password
  forgotPassword: "/api/election/forgot-password",
  verifyLink: "/api/election/link",
  resetPassword: "/api/election/reset-password",

  // CRUD OPERATION
  createElection: "/api/elections/create",

  // -----voting------
  verifyVoterId: "/api/elections/verify-voter",
  castVote: "/api/elections/vote",
  resetElection: "/api/elections/reset",

  // ----results
  verifyElectionPassword: "/api/elections/results-login",
  getLatestResults: "/api/elections/latest",
};

export const ORG_CODE = () => User()?.data?.orgCode;

export const ORG_NAME = () => User()?.data?.orgName;

export const ORG_EMAIL = () => User()?.data?.email;

export const ORG_CONTACT = () => User()?.data?.contact;

export const ORG_LIBRARY_ID = () => User()?.data?.library?.id;

export const TOKEN = () => User()?.token;
