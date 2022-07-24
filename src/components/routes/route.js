import React from "react";
import ManageOffice from "pages/manage_office/manage-office";
import ManageGroups from "pages/manage_groups/manage-groups";
import ManageDepartment from "pages/manage_departments/manage-departments";
import ManageServices from "pages/manage_services/manage-services";
import ManageSurveys from "pages/manage_surveys/manage-surveys";
import Appointments from "pages/appointments/appointments";
import Feedback from "pages/feeback/feedback";
import ManageStaff from "pages/manage_staff/manage-staff";
import { Settings } from "@mui/icons-material";
import ComponentsDocumentation from "../documentation/components-documentation";
import SurveyResults from "pages/manage_surveys/survey_results/survey-results";
import ChatPage from "pages/chat_page/chat-Page";
import Dashboard from "pages/dashboard/dashboard";
import Home from "pages/home/home";
import ProtectedRoutes from "./protected-routes";
import Login from "../pages/auth/login";

export const protectedBaseRoute = {
  route: "/home",
  url: "/home",
  component: <Home />,
};

const url = (path) => {
  return `${protectedBaseRoute.route} / ${path}`;
};

export const protectedRoutes = [
  {
    route: "dashboard",
    url: url("dashborad"),
    component: <Dashboard />,
  },

  {
    route: "offices",
    url: url("offices"),
    component: <ManageOffice />,
  },
  {
    route: "groups",
    url: url("groups"),
    component: <ManageGroups />,
  },
  {
    route: "departments",
    url: url("departments"),
    component: <ManageDepartment />,
  },
  {
    route: "manage_services",
    url: url("manage_services"),
    component: <ManageServices />,
  },
  {
    route: "manage_surveys",
    url: url("manage_surveys"),
    component: <ManageSurveys />,
  },
  {
    route: "manage_surveys/view_results",
    url: url("manage_surveys/view_results"),
    component: <SurveyResults />,
  },
  {
    route: "appointments",
    url: url("appointments"),
    component: <Appointments />,
  },
  {
    route: "feedback",
    url: url("feedback"),
    component: <Feedback />,
  },
  {
    route: "settings",
    url: url("settings"),
    component: <Settings />,
  },
  {
    route: "manage_staff",
    url: url("manage_staff"),
    component: <ManageStaff />,
  },
  {
    route: "communication",
    url: url("communication"),
    component: <ChatPage />,
  },
  {
    route: "components",
    url: url("components"),
    component: <ComponentsDocumentation />,
  },
  {
    route: "*",
    url: "*",
    component: <ComponentsDocumentation />,
  },
];
export const unprotectedRoutes = [
  {
    route: "/",
    actual: "/",
    component: <Home />,
  },
  {
    route: "/register",
    url: url("register"),
    component: <Login />,
  },
  {
    route: "/login",
    url: url("login"),
    component: <Login />,
  },
  {
    route: protectedBaseRoute.route,
    actual: protectedBaseRoute.url,
    component: <Home />,
    subRoutes: protectedRoutes,
  },
];

export const unprotectRoutes = [];
