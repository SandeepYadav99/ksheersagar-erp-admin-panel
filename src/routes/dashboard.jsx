import { lazy } from "react";
import {
  DashboardOutlined,
  EventNote,
  PeopleOutlined,
} from "@material-ui/icons";
import Constants from "../config/constants";
import RouteName from "./Route.name";
import DepartmentList from "../views/Department/Department/DepartmentList.container";
import EmployeeList from "../views/EmployeeList/EmployeeList.container";
import EmployeeListCreate from "../views/EmployeeList/EmployeeListCreate";
import UnitList from "../views/Inventory/Unit/UnitList.container";

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
    path: RouteName.EMPLOYEES,
    sidebarName: "Employee Master",
    navbarName: "Employee Master",
    icon: DashboardOutlined,
    component: EmployeeList,
    is_sidebar: true,
    // roles: [Roles.ADMIN, Roles.RECRUITER, Roles.CORPORATE_HR],
  },
  {
    path: RouteName.EMPLOYEE_CREATE,
    sidebarName: "Employee Create",
    navbarName: "Employee Create",
    icon: DashboardOutlined,
    component: EmployeeListCreate,
    is_sidebar: false,
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
  {
    path: RouteName.DEPARTMENT,
    sidebarName: "Departments",
    navbarName: "Departments",
    icon: PeopleOutlined,
    component: DepartmentList,
    is_sidebar: true,
    is_protect: true,
    should_regex: true,
    parent: "masters",
    // roles: [Roles.ADMIN, Roles.CORPORATE_HR],
  },
  {
    path: "null",
    sidebarName: "Inventory Master",
    navbarName: "Inventory Master",
    icon: EventNote,
    is_sidebar: true,
    slug: "inventory",
    is_parent: true,
    // roles: [Roles.ADMIN, Roles.CORPORATE_HR],
  },
  {
    path: RouteName.UNIT,
    sidebarName: "Unit",
    navbarName: "Unit",
    icon: PeopleOutlined,
    component: UnitList,
    is_sidebar: true,
    is_protect: true,
    should_regex: true,
    parent: "inventory",
    // roles: [Roles.ADMIN, Roles.CORPORATE_HR],
  },
];

export default dashboardRoutes;
