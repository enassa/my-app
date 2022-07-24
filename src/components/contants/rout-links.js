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
  register: {
    route: "/orders",
    url: "/orders",
  },
  setPassword: {
    route: "/set-new-password",
    url: "/set-new-password",
  },
  login: {
    route: "/login",
    url: "/login",
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

  // other page urls
  kitchenDashboard: {
    route: "dashboard/kitchen",
    url: baseRoute.route + "/dashboard/kitchen",
  },
  companyDashboard: {
    route: "dashboard/company",
    url: baseRoute.route + "/dashboard/company",
  },
  mainDashboard: {
    route: "dashboard/main",
    url: baseRoute.route + "/dashboard/main",
  },
  waiter: {
    route: "waiter",
    url: baseRoute.route + "/waiter",
  },
  chef: {
    route: "chef",
    url: baseRoute.route + "/chef",
  },
  chefHistory: {
    route: "chef-history",
    url: baseRoute.route + "/chef-history",
  },
  orders: {
    route: "orders",
    url: baseRoute.route + "/orders",
  },
  reports: {
    route: "reports",
    url: baseRoute.route + "/reports",
  },
  branchSetup: {
    route: "branch",
    url: baseRoute.route + "/branch",
  },
  settings: {
    route: "settings",
    url: baseRoute.route + "/settings",
  },
  configurations: {
    route: "configurations",
    url: baseRoute.route + "/config",
  },
  setUp: {
    route: "setup",
    url: baseRoute.route + "/setup",
  },
  kitchenSetUp: {
    route: "kitchen",
    url: baseRoute.route + "/kitchen-setup",
  },
  externalTracker: {
    route: "external-tracker",
    url: baseRoute.route + "/external-tracker",
  },
  externalTrackerView: {
    route: "external-tracker/:orderNumber",
    url: baseRoute.route + "/external-tracker/220704133040",
  },
  categories: {
    route: "category",
    url: baseRoute.route + "/categories",
  },
  linkExpired: {
    route: "link-expired",
    url: baseRoute.route + "/link-expired",
  },
  privacyPolicy: {
    route: "privacy-policy",
    url: baseRoute.route + "/privacy-policy",
  },
  menu: {
    route: "config",
    url: baseRoute.route + "/config",
  },
  adminSettings: {
    route: "admin-settings",
    url: baseRoute.route + "/admin-settings",
  },
  anyOther: "*",
};
