import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import AuthReducer from "./Auth.reducer";
import User from "./User.reducer";
import DashboardReducer from "./Dashboard.reducer";
import AppSettingReducer from "./AppSettings.reducer";
import ProviderUser from "./ProviderUser.reducer";
import Services from "./Service.reducer";
import LocationReducer from "./Location.reducer";
import DepartmentReducer from "./Department.reducer";
import EmployeeReducer from "./Employee.reducer";
import UnitReducer from "./Unit.reducer";
import CategoryReducer from "./Category.reducer";
import SubcategoryReducer from "./Subcategory.reducer";
import ProductReducer from "./Product.reducer";
import UserRolesReducer from "./UserRoles.reducer";
import MachinesReducer from "./Machines.reducer";
import StaticQrReducer from "./StaticQr.reducer";
import ShiftsReducer from "./Shifts.reducer";

const rootReducer = combineReducers({
  state: (state = {}) => state,
  form: formReducer,
  app_setting: AppSettingReducer,
  dashboard: DashboardReducer,
  user: User,
  location: LocationReducer,
  department:DepartmentReducer,
  auth: AuthReducer,
  provider_user: ProviderUser,
  services: Services,
  employee:EmployeeReducer,
  unit:UnitReducer,
  category:CategoryReducer,
  subcategory:SubcategoryReducer,
  product:ProductReducer,
  userRoles:UserRolesReducer,
  PaytmMachines:MachinesReducer,
  StaticQr:StaticQrReducer,
  Shifts:ShiftsReducer
});

export default rootReducer;
