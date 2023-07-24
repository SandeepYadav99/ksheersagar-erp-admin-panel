import store from "../store";
import Constants from "../config/constants";
import {
serviceCreateCategory,
//   serviceDeleteCATEGORY,
  serviceGetCategory,
//   serviceUpdateCATEGORY,
} from "../services/Category.service";

export const FETCH_INIT = "FETCH_INIT_CATEGORY";
export const FETCHED = "FETCHED_CATEGORY";
export const FETCHED_FAIL = "FETCHED_FAIL_CATEGORY";
export const FETCHED_FILTER = "FETCHED_FILTER_CATEGORY";
export const FETCH_NEXT = "FETCH_NEXT_CATEGORY";
export const FILTER = "FILTER_CATEGORY";
export const RESET_FILTER = "RESET_FILTER_CATEGORY";
export const SET_SORTING = "SET_SORTING_CATEGORY";
export const SET_FILTER = "SET_FILTER_CATEGORY";
export const SET_PAGE = "SET_PAGE_CATEGORY";
export const CHANGE_PAGE = "CHANGE_PAGE_CATEGORY";
export const CHANGE_STATUS = "CHANGE_STATE_CATEGORY";
export const SET_SERVER_PAGE = "SET_SERVER_PAGE_CATEGORY";
export const CREATE_DATA = "CREATE_CATEGORY";
export const UPDATE_DATA = "UPDATE_CATEGORY";
export const DELETE_ITEM = "DELETE_CATEGORY";
export const UPDATE_DATA_ID="UPDATE_DATA_ID"

export function actionFetchCategory(
  index = 1,
  sorting = {},
  filter = {},
  shouldReset = false
) {
  const request = serviceGetCategory({
    index,
    row: sorting.row,
    order: sorting.order,
    ...filter,
  }); // GetCATEGORY
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

export function actionCreateCategory(data) {
  const request = serviceCreateCategory(data);
  return (dispatch) => {
    request.then((data) => {
      if (!data.error) {
        dispatch({ type: CREATE_DATA, payload: data.data });
      }
    });
  };
}

// export function actionUpdateCATEGORY(data) {
//   const request = serviceUpdateCATEGORY(data);
//   return (dispatch) => {
//     request.then((data) => {
//       if (!data.error) {
//         dispatch({ type: UPDATE_DATA, payload: data.data });
//       }
//     });
//   };
// }

// export function actionDeleteCATEGORY(id) {
//   const request = serviceDeleteCATEGORY({ id: id });
//   return (dispatch) => {
//     dispatch({ type: DELETE_ITEM, payload: id });
//   };
// }

export function actionChangePageCATEGORY(page) {
  return (dispatch) => {
    dispatch({ type: CHANGE_PAGE, payload: page });
  };
}

export function actionFilterCATEGORY(value) {
  const request = null; ////serviceFetchProviderRequests(value);
  return (dispatch) => {
    dispatch({ type: FETCH_INIT, payload: null });
    request.then((data) => {
      dispatch({ type: FILTER, payload: data });
      dispatch({ type: FETCHED, payload: null });
    });
  };
}

export function actionChangeStatusCATEGORY(id, status) {
  //const request = serviceUpdateCATEGORY({ id: params.id, status: params.type});
  return (dispatch) => {
    dispatch({ type: CHANGE_STATUS, payload: { id, status } });
  };
}

export function actionResetFilterCATEGORY() {
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

export function actionSetPageCategory(page) {
  const stateData = store.getState().category;
  const currentPage = stateData.currentPage;
  const totalLength = stateData.all.length;
  const sortingData = stateData.sorting_data;
  const query = stateData.query;
  const queryData = stateData.query_data;
  const serverPage = stateData.serverPage;

  if (totalLength <= (page + 1) * Constants.DEFAULT_PAGE_VALUE) {
    store.dispatch(
        actionFetchCategory(serverPage + 1, sortingData, {
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
