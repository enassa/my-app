import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/home";
import LandingPage from "./pages/landing-page/landing-page";
import { ALL_URLS } from "./contants/urls/rout-links";
import OrgRegisteration from "./pages/auth-org/org-registeration";
import OrgLogin from "./pages/auth-org/org-login";
import PasswordReset from "./pages/auth-org/password-reset";
import EmailVerification from "./pages/auth-org/verify-email";
import OrgDashboard from "./pages/dashboard-org/dashboard-org";

function App() {
  return (
    <Router>
      {/* <ToastContainer /> */}
      <Routes>
        <Route path={ALL_URLS.base.route} element={<LandingPage />} />
        <Route
          path={ALL_URLS.registerOrganization.route}
          element={<OrgRegisteration />}
        />
        <Route
          path={ALL_URLS.verifyEmail.route}
          element={<EmailVerification />}
        />
        <Route
          path={ALL_URLS.resetPassword.route}
          element={<PasswordReset />}
        />
        <Route
          path={ALL_URLS.loginToOrganization.route}
          element={<OrgLogin />}
        />
        <Route
          path={ALL_URLS.loginToOrganization.route}
          element={<OrgLogin />}
        />
        <Route path={ALL_URLS.loginToVoteScreen.route} element={<OrgLogin />} />
        <Route
          path={ALL_URLS.loginToVoteResults.route}
          element={<OrgLogin />}
        />

        <Route path={ALL_URLS.home.route} element={<Home />}>
          <Route
            path={ALL_URLS.orgDashoboard.route}
            element={<OrgDashboard />}
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
