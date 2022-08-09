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
export const END_POINTS = {
  // Account management staffend points
  loginToVoteScreen: "/api/election/login/voting-screen",
  loginToResultsScreen: "/api/election/login/resulst-screen",
  loginToOrganization: "/api/election/login",
  registerOrganization: "/api/election/register",
  confirmEmail: "/api/election/confirm",

  getElectionList: "/api/election/list",
  getResults: "/api/election/results",

  deleteElection: "/api/election/delete",
  resetElection: "/api/election/reset",

  // forgot password
  forgotPassword: "/api/election/forgot-password",
  verifyLink: "/api/election/link",
  resetPassword: "/api/election/reset-password",

  // CRUD OPERATION
  createElection: "/api/elections/create",

  // -----voting------
  verifyVoterId: "/api/elections/verify-voter",
  castVote: "/api/elections/vote",

  // ----results
  verifyElectionPassword: "api/elections/results-login",
};

export const ORG_CODE = () => User()?.data?.orgCode;

export const ORG_NAME = () => User()?.data?.orgName;

export const ORG_EMAIL = () => User()?.data?.email;

export const ORG_CONTACT = () => User()?.data?.contact;

export const TOKEN = () => User()?.token;
