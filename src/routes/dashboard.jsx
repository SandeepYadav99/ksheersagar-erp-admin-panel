import { lazy } from "react";
import {
  DashboardOutlined,
  EventNote,
  PeopleOutlined,
} from "@material-ui/icons";
import Constants from "../config/constants";
import RouteName from "./Route.name";

const NewDashboard = lazy(() => import("../views/dashboard/NewDashboard.view"));
const LocationList = lazy(() =>
  import("../views/Locations/Location/LocationList.container")
);

const Roles = Constants.ROLES;

const dashboardRoutes = [
  {
    path: "/",
    sidebarName: "Dashboard",
    navbarName: "Admin Dashboard",
    icon: DashboardOutlined,
    component: NewDashboard,
    is_sidebar: true,
    // roles: [Roles.ADMIN, Roles.RECRUITER, Roles.CORPORATE_HR],
  },
  {
    path: "null",
    sidebarName: "Masters",
    navbarName: "Masters",
    icon: EventNote,
    is_sidebar: true,
    slug: "masters",
    is_parent: true,
    // roles: [Roles.ADMIN, Roles.CORPORATE_HR],
  },
  {
    path: RouteName.LOCATIONS,
    sidebarName: "Locations",
    navbarName: "Locations",
    icon: PeopleOutlined,
    component: LocationList,
    is_sidebar: true,
    is_protect: true,
    should_regex: true,
    parent: "masters",
    // roles: [Roles.ADMIN, Roles.CORPORATE_HR],
  },
];

export default dashboardRoutes;
