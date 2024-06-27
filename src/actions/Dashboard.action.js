/**
 * Created by charnjeetelectrovese@gmail.com on 4/30/2020.
 */
import {
    serviceGetAdminTiles,
    serviceGetDashboard
} from "../services/Dashboard.service";


export const DASHBOARD_INIT = 'DASHBOARD_INIT';
export const DASHBOARD_DONE = 'DASHBOARD_DONE';
export const DASHBOARD_ADMIN_TILES_INIT = 'DASHBOARD_ADMIN_TILES_INIT';
export const DASHBOARD_ADMIN_TILES_DONE = 'DASHBOARD_ADMIN_TILES_DONE';
export const DASHBOARD_KS= "DASHBOARD_KS";
export const DASHBOARD_KS_DONE= "DASHBOARD_KS_DONE";

export function actionGetDashboard(data) {
    return (dispatch) => {
        dispatch({ type: DASHBOARD_INIT, payload: {} });
       dispatch(actionGetAdminTiles());
    };
}

export function actionGetAdminTiles() {
    const req = serviceGetAdminTiles();
    return dispatch => {
        dispatch({ type: DASHBOARD_ADMIN_TILES_INIT, payload: null });
        req.then((res) => {
            if(!res.error) {
                dispatch({ type: DASHBOARD_ADMIN_TILES_DONE, payload: res.data });
            } else {
                dispatch({ type: DASHBOARD_ADMIN_TILES_DONE, payload: {} });
            }
        })
    }
}

export function actionKsDashboard() {
    const req = serviceGetDashboard({});
  
    return (dispatch) => {
      req.then((data) => {
        // console.log(data)
        if (!data.error) {
          dispatch({ type: DASHBOARD_KS, payload: data.data });
        }
      });
    };
}