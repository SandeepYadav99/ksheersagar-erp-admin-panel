import store from "../store";
import Constants from "../config/constants";


import { serviceCreateStaticQr, serviceGetStaticQr, serviceUpdateStaticQr } from "../services/StaticQr.service";

export const FETCH_INIT = "FETCH_INIT_STATIC_QR";
export const FETCHED = "FETCHED_STATIC_QR";
export const FETCHED_FAIL = "FETCHED_FAIL_STATIC_QR";
export const FETCHED_FILTER = "FETCHED_FILTER_STATIC_QR";
export const FETCH_NEXT = "FETCH_NEXT_STATIC_QR";
export const FILTER = "FILTER_STATIC_QR";
export const RESET_FILTER = "RESET_FILTER_STATIC_QR";
export const SET_SORTING = "SET_SORTING_STATIC_QR";
export const SET_FILTER = "SET_FILTER_STATIC_QR";
export const SET_PAGE = "SET_PAGE_STATIC_QR";
export const CHANGE_PAGE = "CHANGE_PAGE_STATIC_QR";
export const CHANGE_STATUS = "CHANGE_STATE_STATIC_QR";
export const SET_SERVER_PAGE = "SET_SERVER_PAGE_STATIC_QR";
export const CREATE_DATA = "CREATE_STATIC_QR";
export const UPDATE_DATA = "UPDATE_STATIC_QR";
export const DELETE_ITEM = "DELETE_STATIC_QR";

export function actionFetchStaticQr(
  index = 1,
  sorting = {},
  filter = {},
  shouldReset = false
) {
  const request = serviceGetStaticQr({
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

export function actionCreateStaticQr(data) {
  const request = serviceCreateStaticQr(data);
  return (dispatch) => {
    request.then((data) => {
      if (!data.error) {
        dispatch({ type: CREATE_DATA, payload: data.data });
      }
    });
  };
}

export function actionUpdateStaticQr(data) {
  const request = serviceUpdateStaticQr(data);
  return (dispatch) => {
    request.then((data) => {
      if (!data.error) {
        dispatch({ type: UPDATE_DATA, payload: data.data });
      }
    });
  };
}

export function actionDeleteStaticQr(id) {
  // const request = serviceDeleteLocation({ id: id });
  // return (dispatch) => {
  //   dispatch({ type: DELETE_ITEM, payload: id });
  // };
}

export function actionChangePageStaticQr(page) {
  return (dispatch) => {
    dispatch({ type: CHANGE_PAGE, payload: page });
  };
}

export function actionFilterStaticQr(value) {
  const request = null; ////serviceFetchProviderRequests(value);
  return (dispatch) => {
    dispatch({ type: FETCH_INIT, payload: null });
    request.then((data) => {
      dispatch({ type: FILTER, payload: data });
      dispatch({ type: FETCHED, payload: null });
    });
  };
}

export function actionChangeStatusStaticQr(id, status) {
  //const request = serviceUpdateLocation({ id: params.id, status: params.type});
  return (dispatch) => {
    dispatch({ type: CHANGE_STATUS, payload: { id, status } });
  };
}

export function actionResetFilterStaticQr() {
  return {
    type: RESET_FILTER,
    payload: null,
  };
}

export function actionSetPageStaticQr(page) {
  const stateData = store.getState().StaticQr;
  const currentPage = stateData.currentPage;
  const totalLength = stateData.all.length;
  const sortingData = stateData.sorting_data;
  const query = stateData.query;
  const queryData = stateData.query_data;
  const serverPage = stateData.serverPage;

  if (totalLength <= (page + 1) * Constants.DEFAULT_PAGE_VALUE) {
    store.dispatch(
        actionFetchStaticQr(serverPage + 1, sortingData, {
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
