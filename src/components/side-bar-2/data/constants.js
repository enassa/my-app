import {
  CakeIcon,
  CollectionIcon,
  CogIcon,
  TruckIcon,
  UserIcon,
  ViewGridIcon,
  ClockIcon,
  UserGroupIcon,
  MapIcon,
  PhoneIcon,
  HomeIcon,
  DocumentReportIcon,
} from "@heroicons/react/solid";
import { ALL_URLS } from "../../contants/rout-links";
import { ChartSquareBarIcon } from "@heroicons/react/outline";
import { IS_SUPER_ACCOUNT } from "../../../contants/urls/urls";
console.log(IS_SUPER_ACCOUNT());
export const navigation = [
  {
    name: IS_SUPER_ACCOUNT() ? "Manager Dashboard" : "Dashboard",
    href: ALL_URLS.mainDashboard.route,
    icon: ViewGridIcon,
    current: false,
    roles: ["Manager", "Super"],
  },
  {
    name: "Call center",
    href: ALL_URLS.waiter.route,
    icon: PhoneIcon,
    current: false,
    roles: ["Manager", "Waiter", "Frontdesk", "Super"],
  },
  {
    name: IS_SUPER_ACCOUNT() ? "Kitchen Dashboard" : "Dashboard",
    href: ALL_URLS.kitchenDashboard.route,
    icon: CakeIcon,
    current: true,
    roles: ["Kitchen", "Super"],
  },
  {
    name: IS_SUPER_ACCOUNT() ? "Organization Dashboard" : "Dashboard",
    href: ALL_URLS.companyDashboard.route,
    icon: CakeIcon,
    current: false,
    roles: ["system", "Super"],
  },
  {
    name: "Orders History",
    href: ALL_URLS.waiter.route + "/saved-orders",
    icon: CollectionIcon,
    current: false,
    roles: ["Manager", "Frontdesk", "Super"],
  },
  {
    name: "Order Tracker",
    href: ALL_URLS.kitchenDashboard.route + "/order-tracker",
    icon: TruckIcon,
    current: false,
    roles: ["Manager", "Frontdesk", "Super"],
  },
  {
    name: IS_SUPER_ACCOUNT() ? "Kitchen Board" : "Dashboard",
    href: ALL_URLS.chef.route,
    icon: UserIcon,
    current: false,
    roles: ["Chef", "Super"],
  },
  {
    name: IS_SUPER_ACCOUNT() ? "Kitchen History" : "Kitchen History",
    href: ALL_URLS.chefHistory.route,
    icon: ClockIcon,
    current: false,
    roles: ["Chef", "Super"],
  },
  {
    name: IS_SUPER_ACCOUNT() ? "Org Report History" : "Dashboard",
    href: ALL_URLS.reports.route,
    icon: DocumentReportIcon,
    current: false,
    roles: ["Manager", "Super", "Owner"],
  },

  {
    name: IS_SUPER_ACCOUNT() ? "Branch setup" : "Branch setup",
    href: ALL_URLS.branchSetup.route,
    icon: ChartSquareBarIcon,
    current: false,
    roles: ["Manager", "Super", "Owner"],
  },

  // {
  //   name: "Orders",
  //   href: ALL_URLS.orders.route,
  //   icon: ClockIcon,
  //   current: false,
  // },

  // {
  //   name: "Reports",
  //   href: ALL_URLS.reports.route,
  //   icon: ScaleIcon,
  //   current: false,
  // },
  // {
  //   name: "Manage Survey",
  //   href: ALL_URLS.manageSurveys.route,
  //   icon: ScaleIcon,
  //   current: false,
  // },
  // {
  //   name: "Service feeback",
  //   href: ALL_URLS.feedback.route,
  //   icon: CreditCardIcon,
  //   current: false,
  // },
  // {
  //   name: "Appointments",
  //   href: ALL_URLS.appointments.route,
  //   icon: UserGroupIcon,
  //   current: false,
  // },
];
export const secondaryNavigation = [
  {
    name: "Accounts",
    href: ALL_URLS.settings.route,
    icon: UserGroupIcon,
    current: false,
    roles: ["Manager", "Super"],
  },
  {
    name: "Kitchen Setup",
    href: ALL_URLS.kitchenSetUp.route,
    icon: CogIcon,
    current: false,
    roles: ["Manager", "Super", "Kitchen Manager"],
  },
  {
    name: "Category Setup",
    href: ALL_URLS.categories.route,
    icon: CogIcon,
    current: false,
    roles: ["Manager", "Super"],
  },
  {
    name: "Menu Setup",
    href: ALL_URLS.setUp.route,
    icon: CogIcon,
    current: false,
    roles: ["Manager", "Super"],
  },
  {
    name: "Settings",
    href: ALL_URLS.adminSettings.route,
    icon: CogIcon,
    current: false,
    roles: ["Manager", "Super"],
  },
];
