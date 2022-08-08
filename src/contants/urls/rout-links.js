export const baseRoute = {
  route: "/home",
  url: "/home",
};

export const votingScreenHome = {
  route: "/vhome",
  url: "/v/vhome",
};
export const resultScreenHome = {
  route: "/rhome",
  url: "/r/rhome",
};
export const ALL_URLS = {
  base: {
    route: "/",
    actual: "/",
    successful: "/successful",
    failed: "/failed",
    url: "/",
  },
  // ORGANIZATION FIELDS
  home: {
    route: baseRoute.route,
    actual: baseRoute.url,
  },
  // auth urls
  registerOrganization: {
    route: "/register",
    url: "/register",
  },
  statusPage: {
    route: "/status-page",
    url: "/status-page",
  },
  setPassword: {
    route: "/set-new-password",
    url: "/set-new-password",
  },
  loginToOrganization: {
    route: "/login",
    url: "/login",
  },
  succesfulRegistration: {
    route: "/registration-success",
    url: "/registration-success",
  },
  succesfullEmailVerification: {
    route: "/verification-success",
    url: "/verification-success",
  },
  succesfulPasswordReset: {
    route: "/resetpassword-success",
    url: "/resetpassword-success",
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
  confirmEmail: {
    route: "/confirm/:email/:token",
    url: "/confirm/null/null",
  },
  verifyLink: {
    route: "/link/:email/:token",
    url: "/link/null/null",
  },
  voteSuccessful: {
    route: "/vote-successful",
    url: "/vote-successful",
  },
  voteFailed: {
    route: "/vote-failed",
    url: "/voting-failed",
  },

  // protected routes
  orgDashoboard: {
    route: "dashboard/:org_id",
    url: baseRoute.route + "/dashboard/org_id",
  },
  createElection: {
    route: "create-election",
    url: baseRoute.route + "/create-election",
  },
  viewElectionDashboard: {
    route: "view-election/:tab",
    url: baseRoute.route + "/view-election",
  },

  // EXTERNALS
  // external auth routes
  loginToVoteScreen: {
    route: "vote-login/:org_id/:election_id/:token",
    url: "v/vote-login/org_id/election_id/token",
  },
  loginToResultsScreen: {
    route: "results-login/:org_id/:election_id/:token",
    url: "r/results-login/org_id/election_id/token",
  },

  voteScreenUrls: {
    route: "/v",
    url: "/v",
  },
  resultsScreenUrls: {
    route: "/r",
    url: "/r",
  },

  // protected externals routes
  resultScreenHome: {
    route: "rhome",
    url: "r/rhome",
  },
  resultsScreen: {
    route: "results-screen",
    url: resultScreenHome.url + "/results-screen",
  },
  votingScreenHome: {
    route: "vhome",
    url: "v/vhome",
  },
  votingScreen: {
    route: "voting-screen",
    url: votingScreenHome.url + "/voting-screen",
  },

  anyOther: "*",
};
