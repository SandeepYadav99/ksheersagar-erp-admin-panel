import store from "../store";
import Constants from "../config/constants";
import {
  serviceCreateDepartment,
  serviceDeleteDepartment,
  serviceGetDepartment,
  serviceUpdateDepartment,
} from "../services/Department.service";

export const FETCH_INIT = "FETCH_INIT_DEPARTMENT";
export const FETCHED = "FETCHED_DEPARTMENT";
export const FETCHED_FAIL = "FETCHED_FAIL_DEPARTMENT";
export const FETCHED_FILTER = "FETCHED_FILTER_DEPARTMENT";
export const FETCH_NEXT = "FETCH_NEXT_DEPARTMENT";
export const FILTER = "FILTER_DEPARTMENT";
export const RESET_FILTER = "RESET_FILTER_DEPARTMENT";
export const SET_SORTING = "SET_SORTING_DEPARTMENT";
export const SET_FILTER = "SET_FILTER_DEPARTMENT";
export const SET_PAGE = "SET_PAGE_DEPARTMENT";
export const CHANGE_PAGE = "CHANGE_PAGE_DEPARTMENT";
export const CHANGE_STATUS = "CHANGE_STATE_DEPARTMENT";
export const SET_SERVER_PAGE = "SET_SERVER_PAGE_DEPARTMENT";
export const CREATE_DATA = "CREATE_DEPARTMENT";
export const UPDATE_DATA = "UPDATE_DEPARTMENT";
export const DELETE_ITEM = "DELETE_DEPARTMENT";

export function actionFetchDepartment(
  index = 1,
  sorting = {},
  filter = {},
  shouldReset = false
) {
  const request = serviceGetDepartment({
    index,
    row: sorting.row,
    order: sorting.order,
    ...filter,
  }); // GetDepartment
  return (dispatch) => {
    if (shouldReset) {
      dispatch({
        type: CHANGE_PAGE,
        payload: 1,
      });
    }
    dispatch({ type: FETCH_INIT, payload: null });
    request.then((data) => {
      dispatch({ type: SET_FILTER, payload: filter });
      dispatch({ type: SET_SORTING, payload: sorting });
      if (!data.error) {
        dispatch({ type: FETCHED, payload: { data: data.data, page: index } });
        dispatch({ type: SET_SERVER_PAGE, payload: index });
        if (index == 1) {
          dispatch({ type: CHANGE_PAGE, payload: index - 1 });
        }
      } else {
        dispatch({ type: FETCHED_FAIL, payload: null });
      }
    });
  };
}

export function actionCreateDepartment(data) {
  const request = serviceCreateDepartment(data);
  return (dispatch) => {
    request.then((data) => {
      if (!data.error) {
        dispatch({ type: CREATE_DATA, payload: data.data });
      }
    });
  };
}

export function actionUpdateDepartment(data) {
  const request = serviceUpdateDepartment(data);
  return (dispatch) => {
    request.then((data) => {
      if (!data.error) {
        dispatch({ type: UPDATE_DATA, payload: data.data });
      }
    });
  };
}

export function actionDeleteDepartment(id) {
  const request = serviceDeleteDepartment({ id: id });
  return (dispatch) => {
    dispatch({ type: DELETE_ITEM, payload: id });
  };
}

export function actionChangePageDepartment(page) {
  return (dispatch) => {
    dispatch({ type: CHANGE_PAGE, payload: page });
  };
}

export function actionFilterDepartment(value) {
  const request = null; ////serviceFetchProviderRequests(value);
  return (dispatch) => {
    dispatch({ type: FETCH_INIT, payload: null });
    request.then((data) => {
      dispatch({ type: FILTER, payload: data });
      dispatch({ type: FETCHED, payload: null });
    });
  };
}

export function actionChangeStatusDepartment(id, status) {
  //const request = serviceUpdateDepartment({ id: params.id, status: params.type});
  return (dispatch) => {
    dispatch({ type: CHANGE_STATUS, payload: { id, status } });
  };
}

export function actionResetFilterDepartment() {
  return {
    type: RESET_FILTER,
    payload: null,
  };
}

export function actionSetPageDepartment(page) {
  const stateData = store.getState().department;
  const currentPage = stateData.currentPage;
  const totalLength = stateData.all.length;
  const sortingData = stateData.sorting_data;
  const query = stateData.query;
  const queryData = stateData.query_data;
  const serverPage = stateData.serverPage;

  if (totalLength <= (page + 1) * Constants.DEFAULT_PAGE_VALUE) {
    store.dispatch(
      actionFetchDepartment(serverPage + 1, sortingData, {
        query,
        query_data: queryData,
      })
    );
  }

  console.log(currentPage, totalLength);
  return {
    type: CHANGE_PAGE,
    payload: page,
  };
}
