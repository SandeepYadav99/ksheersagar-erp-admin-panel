import store from "../store";
import Constants from "../config/constants";
import {
serviceCreateProduct,
  serviceDeleteProduct,
  // serviceDeleteProduct,
  serviceGetProduct,
//   serviceUpdateUnit,
} from "../services/Product.service";

export const FETCH_INIT = "FETCH_INIT_PRODUCT";
export const FETCHED = "FETCHED_PRODUCT";
export const FETCHED_FAIL = "FETCHED_FAIL_PRODUCT";
export const FETCHED_FILTER = "FETCHED_FILTER_PRODUCT";
export const FETCH_NEXT = "FETCH_NEXT_PRODUCT";
export const FILTER = "FILTER_PRODUCT";
export const RESET_FILTER = "RESET_FILTER_PRODUCT";
export const SET_SORTING = "SET_SORTING_PRODUCT";
export const SET_FILTER = "SET_FILTER_PRODUCT";
export const SET_PAGE = "SET_PAGE_PRODUCT";
export const CHANGE_PAGE = "CHANGE_PAGE_PRODUCT";
export const CHANGE_STATUS = "CHANGE_STATE_PRODUCT";
export const SET_SERVER_PAGE = "SET_SERVER_PAGE_PRODUCT";
export const CREATE_DATA = "CREATE_PRODUCT";
export const UPDATE_DATA = "UPDATE_PRODUCT";
export const DELETE_ITEM = "DELETE_PRODUCT";
export const UPDATE_DATA_ID="UPDATE_DATA_ID"

export function actionFetchProduct(
  index = 1,
  sorting = {},
  filter = {},
  shouldReset = false
) {
  const request = serviceGetProduct({
    index,
    row: sorting.row,
    order: sorting.order,
    ...filter,
  }); // GetUnit
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

export function actionCreateProduct(data) {
  const request = serviceCreateProduct(data);
  return (dispatch) => {
    request.then((data) => {
      if (!data.error) {
        dispatch({ type: CREATE_DATA, payload: data.data });
      }
    });
  };
}

// export function actionUpdateUnit(data) {
//   const request = serviceUpdateUnit(data);
//   return (dispatch) => {
//     request.then((data) => {
//       if (!data.error) {
//         dispatch({ type: UPDATE_DATA, payload: data.data });
//       }
//     });
//   };
// }

export function actionDeleteProduct(id) {
  const request = serviceDeleteProduct({ id: id });
  return (dispatch) => {
    dispatch({ type: DELETE_ITEM, payload: id });
  };
}

export function actionChangePageUnit(page) {
  return (dispatch) => {
    dispatch({ type: CHANGE_PAGE, payload: page });
  };
}

export function actionFilterUnit(value) {
  const request = null; ////serviceFetchProviderRequests(value);
  return (dispatch) => {
    dispatch({ type: FETCH_INIT, payload: null });
    request.then((data) => {
      dispatch({ type: FILTER, payload: data });
      dispatch({ type: FETCHED, payload: null });
    });
  };
}

export function actionChangeStatusUnit(id, status) {
  //const request = serviceUpdateUnit({ id: params.id, status: params.type});
  return (dispatch) => {
    dispatch({ type: CHANGE_STATUS, payload: { id, status } });
  };
}

export function actionResetFilterUnit() {
  return {
    type: RESET_FILTER,
    payload: null,
  };
}
export function actionUpdateId(id){
    return{
        type:UPDATE_DATA_ID,
        payload:id
    }
}

export function actionSetPageProduct(page) {
  const stateData = store.getState().product;
  const currentPage = stateData.currentPage;
  const totalLength = stateData.all.length;
  const sortingData = stateData.sorting_data;
  const query = stateData.query;
  const queryData = stateData.query_data;
  const serverPage = stateData.serverPage;

  if (totalLength <= (page + 1) * Constants.DEFAULT_PAGE_VALUE) {
    store.dispatch(
        actionFetchProduct(serverPage + 1, sortingData, {
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
