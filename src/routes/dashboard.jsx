import { lazy } from "react";
import {
  DashboardOutlined,
  EventNote,
  LocalOffer,
  PeopleOutlined,
} from "@material-ui/icons";
import Constants from "../config/constants";
import RouteName from "./Route.name";
import DepartmentList from "../views/Department/Department/DepartmentList.container";
import EmployeeList from "../views/EmployeeList/EmployeeList.container";
import EmployeeListCreate from "../views/EmployeeList/EmployeeListCreate";
import UnitList from "../views/Inventory/Unit/UnitList.container";

import SubCategoryList from "../views/Inventory/SubCategory/SubCategoryList.container";
import ProductList from "../views/Inventory/Product/ProductList.container";
import ProductCreate from "../views/Inventory/ProductCreate/ProductCreate.view";
import LocationDetail from "../views/Locations/LocationDetail/LocationDetail.view";
import EmployeeDetail from "../views/EmployeeDetail/EmployeeDetail.view";
import EmployeeEdit from "../views/EmployeeEdit/EmployeeEdit.view";

import UserRoleList from "../views/UserRoles/List/UserRoleList";
import UserRolesCreate from "../views/UserRoles/Create/UserRolesCreate";
import Machines from "../views/Machines/Lists/Machines";
import ShiftDetail from "../views/Shifts/ShiftDetail/ShiftDetail";
import CalendarList from "../views/Calendar/CalendarList.view";
import Dashboard from "../views/dashboard/Dashboard";
import AttendanceReport from "../views/Reports/AttendanceReport/AttendanceReport";
import ShiftWiseReport from "../views/Reports/ShiftWiseReport/ShiftWiseReport";
import MusterReport from "../views/Reports/MusterReport/MusterReport";

const NewDashboard = lazy(() => import("../views/dashboard/NewDashboard.view"));
const LocationList = lazy(() =>
  import("../views/Locations/Location/LocationList.container")
);
const StaticQr = lazy(() => import("../views/StaticQR/Lists/StaticQr"));
const ShiftsLists = lazy(() => import("../views/Shifts/Lists/ShiftsLists"));

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
    is_protect: true,
    should_regex: true,

    // roles: [Roles.ADMIN, Roles.RECRUITER, Roles.CORPORATE_HR],
  },
  {
    path: `${RouteName.EMPLOYEE_DETAILS}:id`,
    sidebarName: "Employee Master",
    navbarName: "Employee Master",
    icon: DashboardOutlined,
    component: EmployeeDetail,
    is_sidebar: false,
    is_protect: false,

    // roles: [Roles.ADMIN, Roles.RECRUITER, Roles.CORPORATE_HR],
  },
  {
    path: `${RouteName.USER_ROLES}`,
    sidebarName: "User Roles",
    navbarName: "User Roles",
    icon: PeopleOutlined,
    component: UserRoleList,
    is_sidebar: true,
    is_protect: true,
    should_regex: true,
    // roles: [Roles.ADMIN, Roles.RECRUITER, Roles.CORPORATE_HR],
  },
  {
    path: `${RouteName.USER_ROLES_CREATE}`,
    sidebarName: "User Roles",
    navbarName: "User Roles",
    icon: PeopleOutlined,
    component: UserRolesCreate,
    is_sidebar: false,
    is_protect: true,
    should_regex: false,
    // roles: [Roles.ADMIN, Roles.RECRUITER, Roles.CORPORATE_HR],
  },
  {
    path: `${RouteName.USER_ROLES_UPDATE}:id`,
    sidebarName: "User Roles",
    navbarName: "User Roles",
    icon: PeopleOutlined,
    component: UserRolesCreate,
    is_sidebar: false,
    is_protect: true,
    should_regex: false,
    // roles: [Roles.ADMIN, Roles.RECRUITER, Roles.CORPORATE_HR],
  },
  {
    path: RouteName.EMPLOYEE_CREATE,
    sidebarName: "Employee Create",
    navbarName: "Employee Create",
    icon: DashboardOutlined,
    component: EmployeeListCreate,
    is_sidebar: false,
    is_protect: true,
    should_regex: false,
    // roles: [Roles.ADMIN, Roles.RECRUITER, Roles.CORPORATE_HR],
  },
  {
    path: `${RouteName.EMPLOYEE_UPDATE}:id`,
    sidebarName: "Employee Update",
    navbarName: "Employee Update",
    icon: DashboardOutlined,
    component: EmployeeEdit,
    is_sidebar: false,
    is_protect: true,
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
    path: `${RouteName.LOCATIONS_DETAILS}:id`,
    sidebarName: "Location Detail",
    navbarName: "Location Detail",
    icon: LocalOffer,
    component: LocationDetail,
    is_sidebar: false,
    is_protect: true,
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
    path: RouteName.MACHINES,
    sidebarName: "Machines",
    navbarName: "Machines",
    icon: PeopleOutlined,
    component: Machines,
    is_sidebar: true,
    is_protect: true,
    should_regex: true,
    parent: "masters",
    // roles: [Roles.ADMIN, Roles.CORPORATE_HR],
  },
  {
    path: RouteName.SHIFTS,
    sidebarName: "Shifts",
    navbarName: "Shifts",
    icon: PeopleOutlined,
    component: ShiftsLists,
    is_sidebar: true,
    is_protect: true,
    should_regex: true,
    parent: "masters",
    // roles: [Roles.ADMIN, Roles.CORPORATE_HR],
  },
  {
    path: `${RouteName.SHIFTS_DETAILS}:id`,
   
    navbarName: "Shifts",
    
    component: ShiftDetail,
   
    is_protect: true,
    should_regex: true,
    parent: "masters",
    // roles: [Roles.ADMIN, Roles.CORPORATE_HR],
  },
  {
    path: RouteName.STATIC_QR,
    sidebarName: "PayTM QR Codes",
    navbarName: "PayTM QR Codes",
    icon: PeopleOutlined,
    component: StaticQr,
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
  // {
  //   path: RouteName.CATEGORY,
  //   sidebarName: "Category",
  //   navbarName: "Category",
  //   icon: PeopleOutlined,
  //   component: CategoryList,
  //   is_sidebar: true,
  //   is_protect: true,
  //   should_regex: true,
  //   parent: "inventory",
  //   // roles: [Roles.ADMIN, Roles.CORPORATE_HR],
  // },
  {
    path: `${RouteName.SUBCATEGORY}:id`,
    // sidebarName: "Category",
    // navbarName: "Category",
    icon: PeopleOutlined,
    component: SubCategoryList,
    is_sidebar: false,
    is_protect: true,
    should_regex: true,
    // parent: "inventory",
    // roles: [Roles.ADMIN, Roles.CORPORATE_HR],
  },
  {
    path: `${RouteName.PRODUCT}`,
    sidebarName: "Products",
    navbarName: "Products",
    icon: PeopleOutlined,
    component: ProductList,
    is_sidebar: true,
    is_protect: true,
    should_regex: true,
    parent: "inventory",
    // roles: [Roles.ADMIN, Roles.CORPORATE_HR],
  },
  {
    path: RouteName.PRODUCT_CREATE,
    sidebarName: "Product Create",
    navbarName: "Product Create",
    icon: DashboardOutlined,
    component: ProductCreate,
    is_sidebar: false,
    // roles: [Roles.ADMIN, Roles.RECRUITER, Roles.CORPORATE_HR],
  },
  {
    path: `${RouteName.CALENDAR}`,
    sidebarName: "Calendar",
    // navbarName: "Calendar",
    icon: EventNote,
    component: CalendarList,
    is_sidebar: true,
    is_protect: true,
    should_regex: true,
  },
  {
    path: `${RouteName.PRODUCT_UPDATE}:id`,
    sidebarName: "Product Update",
    navbarName: "Product Update",
    icon: DashboardOutlined,
    component: ProductCreate,
    is_sidebar: false,
  },

  // {
  //   path: `${RouteName.PRODUCT_LIST}:id`,
  //   sidebarName: "Products",
  //   navbarName: "Products",
  //   icon: PeopleOutlined,
  //   component: ProductList,
  //   is_sidebar: false,
  //   is_protect: true,
  //   should_regex: true,
  //   parent: "inventory",
  //   // roles: [Roles.ADMIN, Roles.CORPORATE_HR],
  // },
  {
    path: "null",
    sidebarName: "Reports",
    navbarName: "Reports",
    icon: EventNote,
    is_sidebar: true,
    slug: "reports",
    is_parent: true,
    // roles: [Roles.ADMIN, Roles.CORPORATE_HR],
  },
  {
    path: RouteName.ATTENDACE_REPORT,
    sidebarName: "Attendance Report",
    navbarName: "Attendance Report",
    icon: PeopleOutlined,
    is_sidebar: true,
    parent: "reports",
  component:AttendanceReport
    // roles: [Roles.ADMIN, Roles.CORPORATE_HR],
  },
  {
    path: RouteName.SHIFTS_WISE_REPORT,
    sidebarName: "Shift Wise Report",
    navbarName: "Shift Wise Report",
    icon: PeopleOutlined,
    is_sidebar: true,
    parent: "reports",
    component:ShiftWiseReport
    // roles: [Roles.ADMIN, Roles.CORPORATE_HR],
  },
  {
    path: RouteName.MUSTER_REPORT,
    sidebarName: "Muster Report",
    navbarName: "Muster Report",
    icon: PeopleOutlined,
    is_sidebar: true,
    parent: "reports",
    component:MusterReport
    // roles: [Roles.ADMIN, Roles.CORPORATE_HR],
  },
];

export default dashboardRoutes;
