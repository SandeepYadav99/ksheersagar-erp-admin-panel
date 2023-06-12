import store from "../store";
import Constants from "../config/constants";
import {
  serviceCreateLocation,
  serviceDeleteLocation,
  serviceGetLocation,
  serviceUpdateLocation,
} from "../services/Location.service";

export const FETCH_INIT = "FETCH_INIT_LOCATION";
export const FETCHED = "FETCHED_LOCATION";
export const FETCHED_FAIL = "FETCHED_FAIL_LOCATION";
export const FETCHED_FILTER = "FETCHED_FILTER_LOCATION";
export const FETCH_NEXT = "FETCH_NEXT_LOCATION";
export const FILTER = "FILTER_LOCATION";
export const RESET_FILTER = "RESET_FILTER_LOCATION";
export const SET_SORTING = "SET_SORTING_LOCATION";
export const SET_FILTER = "SET_FILTER_LOCATION";
export const SET_PAGE = "SET_PAGE_LOCATION";
export const CHANGE_PAGE = "CHANGE_PAGE_LOCATION";
export const CHANGE_STATUS = "CHANGE_STATE_LOCATION";
export const SET_SERVER_PAGE = "SET_SERVER_PAGE_LOCATION";
export const CREATE_DATA = "CREATE_LOCATION";
export const UPDATE_DATA = "UPDATE_LOCATION";
export const DELETE_ITEM = "DELETE_LOCATION";

export function actionFetchLocation(
  index = 1,
  sorting = {},
  filter = {},
  shouldReset = false
) {
  const request = serviceGetLocation({
    index,
    row: sorting.row,
    order: sorting.order,
    ...filter,
  }); // GetLocation
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

export function actionCreateLocation(data) {
  const request = serviceCreateLocation(data);
  return (dispatch) => {
    request.then((data) => {
      if (!data.error) {
        dispatch({ type: CREATE_DATA, payload: data.data });
      }
    });
  };
}

export function actionUpdateLocation(data) {
  const request = serviceUpdateLocation(data);
  return (dispatch) => {
    request.then((data) => {
      if (!data.error) {
        dispatch({ type: UPDATE_DATA, payload: data.data });
      }
    });
  };
}

export function actionDeleteLocation(id) {
  const request = serviceDeleteLocation({ id: id });
  return (dispatch) => {
    dispatch({ type: DELETE_ITEM, payload: id });
  };
}

export function actionChangePageLocation(page) {
  return (dispatch) => {
    dispatch({ type: CHANGE_PAGE, payload: page });
  };
}

export function actionFilterLocation(value) {
  const request = null; ////serviceFetchProviderRequests(value);
  return (dispatch) => {
    dispatch({ type: FETCH_INIT, payload: null });
    request.then((data) => {
      dispatch({ type: FILTER, payload: data });
      dispatch({ type: FETCHED, payload: null });
    });
  };
}

export function actionChangeStatusLocation(id, status) {
  //const request = serviceUpdateLocation({ id: params.id, status: params.type});
  return (dispatch) => {
    dispatch({ type: CHANGE_STATUS, payload: { id, status } });
  };
}

export function actionResetFilterLocation() {
  return {
    type: RESET_FILTER,
    payload: null,
  };
}

export function actionSetPageLocation(page) {
  const stateData = store.getState().location;
  const currentPage = stateData.currentPage;
  const totalLength = stateData.all.length;
  const sortingData = stateData.sorting_data;
  const query = stateData.query;
  const queryData = stateData.query_data;
  const serverPage = stateData.serverPage;

  if (totalLength <= (page + 1) * Constants.DEFAULT_PAGE_VALUE) {
    store.dispatch(
      actionFetchLocation(serverPage + 1, sortingData, {
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
