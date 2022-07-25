export const baseRoute = {
  route: "/home",
  url: "/home",
};
export const ALL_URLS = {
  base: {
    route: "/",
    actual: "/",
    successful: "/successful",
    failed: "/failed",
  },
  home: {
    route: baseRoute.route,
    actual: baseRoute.url,
  },

  // auth urls
  registerOrganization: {
    route: "/register",
    url: "/register",
  },
  setPassword: {
    route: "/set-new-password",
    url: "/set-new-password",
  },
  loginToVoteScreen: {
    route: "/vote-login/:org_id/:election_id",
    url: "/vote-login/null/null",
  },
  loginToVoteResults: {
    route: "/results-login/:org_id/:election_id",
    url: "/results/null/null",
  },
  loginToOrganization: {
    route: "/login",
    url: "/login",
  },
  orgDashoboard: {
    route: "dashboard/:org_id",
    url: baseRoute.route + "/dashboard/org_id",
  },
  verifyEmail: {
    route: "/verify-email",
    url: "/verify-email",
  },
  resetPassword: {
    route: "/reset-password",
    url: "/reset-password",
  },
  verifyOTP: {
    route: "/verify-otp",
    url: "/verify-otp",
  },
  votingScreen: {
    route: "voting/:org_id/:election_id",
    url: "/verify-otp",
  },
  voteSuccessful: {
    route: "/vote-successful",
    url: "/vote-successful",
  },
  voteFailed: {
    route: "/vote-failed",
    url: "/voting-failed",
  },
  resultsScreen: {
    route: "/results-view/:org_id/:election_id",
    url: "/results-view/null/null",
  },
  createElection: {
    route: "/create-election/:org_id",
    url: "/create-election/null",
  },
  viewElectionDashboard: {
    route: "/view-election/:org_id/:tab",
    url: "/view-election/null/null",
  },
  anyOther: "*",
};
