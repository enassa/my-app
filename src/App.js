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
import ElectionView from "./pages/view-election/election-view";
import VoteScreenLogin from "./pages/voting-screen/vote-screen-login";
import ResultScreen from "./pages/results-screen/results-screen";
import VotingScreen from "./pages/voting-screen/voting-screen";
import ResultsScreenHome from "./pages/results-screen/results-screen-home";
import VotingScreenHome from "./pages/voting-screen/voting-screen-home";
import ResultScreenLogin from "./pages/results-screen/results-screen-login";
import VoteScreenHelper from "./pages/voting-screen/vote-screen-helper";
import ResultScreenHelper from "./pages/results-screen/results-screen-helper";
import CreateElectionWrapper from "./pages/create-election/create-election-wrapper";
import StatusPage from "./pages/status-page/status-page";

function App() {
  return (
    <Router>
      {/* <ToastContainer /> */}
      <Routes>
        <Route path={ALL_URLS.base.route} element={<LandingPage />} />

        <Route path={ALL_URLS.statusPage.route} element={<StatusPage />} />

        {/* ORG ROUTES */}
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

        {/* protected org routes */}
        <Route path={ALL_URLS.home.route} element={<Home />}>
          <Route
            path={ALL_URLS.orgDashoboard.route}
            element={<OrgDashboard />}
          />
          <Route
            path={ALL_URLS.viewElectionDashboard.route}
            element={<ElectionView />}
          />
          <Route
            path={ALL_URLS.createElection.route}
            element={<CreateElectionWrapper />}
          />
        </Route>

        {/* EXTERNAL ROUTES */}
        {/*######## Vote screen */}
        <Route
          path={ALL_URLS.voteScreenUrls.route}
          element={<VoteScreenHelper />}
        >
          {/* The helper just provides all the voting screen with the voting screen context */}

          {/* Unprotectrotected voting screeen routes */}
          <Route
            path={ALL_URLS.loginToVoteScreen.route}
            element={<VoteScreenLogin />}
          />
          {/* Protected routes voting screen routes */}
          <Route
            path={ALL_URLS.votingScreenHome.route}
            element={<VotingScreenHome />}
          >
            <Route
              path={ALL_URLS.votingScreen.route}
              element={<VotingScreen />}
            />
          </Route>
        </Route>

        {/* ######## Results screen */}
        <Route
          path={ALL_URLS.resultsScreenUrls.route}
          element={<ResultScreenHelper />}
        >
          {/* The helper just provides all the voting screen with the voting screen context */}

          {/*====== unprotectrotected voting screeen routes */}
          <Route
            path={ALL_URLS.loginToResultsScreen.route}
            element={<ResultScreenLogin />}
          />
          {/*====== Protected routes voting screen routes */}
          <Route
            path={ALL_URLS.resultScreenHome.route}
            element={<ResultsScreenHome />}
          >
            <Route
              path={ALL_URLS.resultsScreen.route}
              element={<ResultScreen />}
            />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
