import store from '../store';
import Constants from '../config/constants';
import {serviceCreateEmployee, serviceGetEmployee, serviceUpdateEmployee,serviceDeleteEmployee, serviceEmployeeCodeSubmit} from "../services/Employee.service";
import EventEmitter from "../libs/Events.utils";
import SnackbarUtils from "../libs/SnackbarUtils";
import historyUtils from "../libs/history.utils";

export const FETCH_INIT = 'FETCH_INIT_EMPLOYEE';
export const FETCHED = 'FETCHED_EMPLOYEE';
export const FETCHED_FAIL = 'FETCHED_FAIL_EMPLOYEE';
export const FETCHED_FILTER = 'FETCHED_FILTER_EMPLOYEE';
export const FETCH_NEXT = 'FETCH_NEXT_EMPLOYEE';
export const FILTER = 'FILTER_EMPLOYEE';
export const RESET_FILTER = 'RESET_FILTER_EMPLOYEE';
export const SET_SORTING = 'SET_SORTING_EMPLOYEE';
export const SET_FILTER = 'SET_FILTER_EMPLOYEE';
export const SET_PAGE = 'SET_PAGE_EMPLOYEE';
export const CHANGE_PAGE = 'CHANGE_PAGE_EMPLOYEE';
export const CHANGE_STATUS= 'CHANGE_STATE_EMPLOYEE';
export const SET_SERVER_PAGE = 'SET_SERVER_PAGE_EMPLOYEE';
export const CREATE_DATA = 'CREATE_EMPLOYEE';
export const UPDATE_DATA = 'UPDATE_EMPLOYEE';
export const DELETE_ITEM = 'DELETE_EMPLOYEE';
export const GET_EMPLOYEE_DATA = 'GET_EMPLOYEE_DATA';

export function actionFetchEmployee(index = 1, sorting = {}, filter = {}) {
    const request = serviceGetEmployee({ index, row: sorting.row, order: sorting.order, ...filter });
    return (dispatch) => {
        dispatch({type: FETCH_INIT, payload: null});
        request.then((data) => {
            dispatch({type: SET_FILTER, payload: filter});
            dispatch({type: SET_SORTING, payload: sorting});
            if (!data.error) {
                dispatch({type: FETCHED, payload: { data: data.data.data, total: data?.data?.total, page: index }});
                dispatch({ type: SET_SERVER_PAGE, payload: index });
                if (index == 1) {
                    dispatch({type: CHANGE_PAGE, payload: index - 1});
                }
            } else {
                dispatch({type: FETCHED_FAIL, payload: null});
            }
        });
    };
}

export function actionCreateEmployee(data) {
    const request = serviceCreateEmployee(data);
    return (dispatch) => {
        request.then((data) => {
            if (!data.error) {
                EventEmitter.dispatch(EventEmitter.THROW_ERROR, {error: 'Saved', type: 'success'});
                dispatch({type: CREATE_DATA, payload: data.data})
            }
        })
    }
}

export function actionUpdateEmployee(data) {
    const request = serviceUpdateEmployee(data);
    return (dispatch) => {
        request.then((data) => {
            if (!data.error) {
                dispatch({type: UPDATE_DATA, payload: data.data})
            }
        })
    }
}

export function  actionGetEmployeeDetails  (data) {
    const request =  serviceEmployeeCodeSubmit({ code: data });
    return  (dispatch) => {
        request.then((data) => {
            if (!data.error) {
                dispatch({type: GET_EMPLOYEE_DATA, payload: data})
            } else {
                SnackbarUtils.error(data?.message);
                historyUtils.goBack();
            }
        });
    }
}
export function actionDeleteEmployee(id) {
    const request = serviceDeleteEmployee({ id: id});
    return (dispatch) => {
        dispatch({type: DELETE_ITEM, payload: id})
    }
}


export function actionChangePageEmployeeRequests(page) {
    return (dispatch) => {
        dispatch({type: CHANGE_PAGE, payload: page})
    }
}

// export function nextPRequestsClick() {
//     return {
//         type: NEXT_PREQUESTS,
//         payload: null,
//     };
// }
//
// export function prevPRequestsClick() {
//     return {
//         type: PREV_PREQUESTS,
//         payload: null,
//     };
// }

export function actionFilterEmployeeRequests(value) {
    const request = null;////serviceFetchProviderRequests(value);
    return (dispatch) => {
        dispatch({type: FETCH_INIT, payload: null});
        request.then((data) => {
            dispatch({type: FILTER, payload: data});
            dispatch({type: FETCHED, payload: null});//dispatch function
        });
    };
}


export function actionChangeStatusEmployeeRequests(id, status) {
    // const request = serviceFetchProviderRequests(value);
    return (dispatch) => {
        dispatch({type: CHANGE_STATUS, payload: {id, status}});
        // request.then((data) => {
        //     dispatch({type: FILTER_PREQUESTS, payload: data});
        //     dispatch({type: FETCHED_PREQUESTS, payload: null});
        // });
    };
}

export function actionResetFilterEmployeeRequests() {
    return {
        type: RESET_FILTER,
        payload: null,
    };
}

export function actionSetPageEmployeeRequests(page) {
    const stateData = store.getState().employee;
    const currentPage = stateData.currentPage;
    const totalLength = stateData.all.length;
    const sortingData = stateData.sorting_data;
    const query = stateData.query;
    const queryData = stateData.query_data;
    const serverPage = stateData.serverPage;

    if (totalLength <= ((page + 1) * Constants.DEFAULT_PAGE_VALUE)) {
        store.dispatch(actionFetchEmployee(serverPage + 1, sortingData, {query, query_data: queryData}));
        // this.props.fetchNextUsers(this.props.serverPage + 1, this.props.sorting_data.row, this.props.sorting_data.order, { query: this.props.query, query_data: this.props.query_data });
    }

    console.log(currentPage, totalLength);
    return {
        type: CHANGE_PAGE,
        payload: page,
    };
    // if (this.props.totalUsers <= ((this.props.currentPage + 1) * 100)) {
    //         // this.props.fetchNextUsers(this.props.serverPage + 1, this.props.sorting_data.row, this.props.sorting_data.order);
    //         this.props.fetchNextUsers(this.props.serverPage + 1, this.props.sorting_data.row, this.props.sorting_data.order, { query: this.props.query, query_data: this.props.query_data });
    //     }

}
