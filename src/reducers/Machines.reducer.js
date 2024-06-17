import {
    FETCH_NEXT,
    FETCH_INIT,
    FETCHED,
    FILTER,
    RESET_FILTER,
    SET_SORTING,
    SET_FILTER,
    SET_PAGE,
    CHANGE_PAGE,
    CHANGE_STATUS,
    SET_SERVER_PAGE,
    CREATE_DATA,
    UPDATE_DATA,
    DELETE_ITEM
} from '../actions/Machines.action';
import Constants from '../config/constants';

function mapPresetPRequest(all, pageId) {
    return all.filter((val, index) => {
        if (index >= (((pageId+1) * Constants.DEFAULT_PAGE_VALUE) - Constants.DEFAULT_PAGE_VALUE) && index < (((pageId+1) * Constants.DEFAULT_PAGE_VALUE))) {
            return val;
        }
    });
}

const initialState = {
    all: [],
    data: [],
    currentPage: 0,
    serverPage: 0,
    query: null, // search text data
    query_data: null, // popover filter data change
    sorting_data: { row: null, order: null },
    is_fetching: false
};

export default function (state = JSON.parse(JSON.stringify(initialState)), action) {
    switch (action.type) {
        case FETCH_INIT: {
            return { ...state, is_fetching: true };
        }
        case FETCHED: {
            const newData = (action.payload).data;
            const page = action.payload.page;
            let newAll = [];
            if (page == 1) {
                newAll = [...newData];
            } else {
                newAll = [...state.all, ...newData];
            }
            const tableData = mapPresetPRequest(newAll, state.currentPage);
            return { ...state, all: newAll, data: tableData, is_fetching: false }; // { ...state , all: newAll, data: tableData, serverPage: 1, currentPage: 1 };
        }
        case SET_SORTING: {
            return { ...state, sorting_data: action.payload };
        }
        case CHANGE_STATUS: {
            if (action.payload) {
                let tempIndex = null;
                const prevState = state.all;
                prevState.some((val, index)=> {
                    if (val.id == action.payload) {
                        tempIndex = index;
                        return true;
                    }
                });
                if (tempIndex != null) {
                    prevState.splice(tempIndex, 1);
                }
                const tableData = mapPresetPRequest(prevState, state.currentPage);
                return { ...state, all: prevState, data: tableData };
            }
            return state;
        }
        case CREATE_DATA: {
            if (action.payload) {
                const prevState = state.all;
                prevState.unshift(action.payload);
                const tableData = mapPresetPRequest(prevState, state.currentPage);
                return {...state, all: prevState, data: tableData};
            }
            return state;
        }
        case UPDATE_DATA: {
            if (action.payload) {
                const prevState = state.all;
                let tIndex = null;
                prevState.some((val, index) => {
                    if (val.id == action.payload.id) {
                        tIndex = index;
                        return true;
                    }
                });
                if (tIndex != null) {
                    prevState[tIndex] = {...prevState[tIndex], ...action.payload};
                    // prevState[tIndex] = action.payload;
                }
                const tableData = mapPresetPRequest(prevState, state.currentPage);
                return {...state, all: prevState, data: tableData};
            }
            return state;
        }
        case DELETE_ITEM: {
            if (action.payload) {
                let tempIndex = null;
                const prevState = state.all;
                const id = action.payload;

                prevState.some((val, index) => {
                    if (val.id == id) {
                        tempIndex = (index);
                        return true;
                    }
                });

                if (tempIndex != null) {
                    prevState.splice(tempIndex, 1);
                }
                const tableData = mapPresetPRequest(prevState, state.currentPage);
                return {...state, all: prevState, data: tableData};
            }
            return state;
        }
        case CHANGE_PAGE: {
            const tempPage = action.payload;
            const tableData = mapPresetPRequest(state.all, tempPage);
            return { ...state, data: tableData, currentPage: tempPage };
        }
        case FETCH_NEXT: {
            const newAll = state.all.concat(action.payload);
            return { ...state, all: newAll, serverPage: (state.serverPage + 1) };
        }
        case FILTER: {
            return { ...state, data: action.payload };
        }
        case SET_FILTER: {
            return { ...state, query: action.payload.query, query_data: action.payload.query_data };
        }
        case RESET_FILTER: {
            const tableData = mapPresetPRequest(state.all, state.currentPage);
            return { ...state, data: tableData };
        }
        case SET_PAGE: {
            return { ...state,  currentPage: action.payload };
        }
        case SET_SERVER_PAGE: {
            return { ...state, serverPage: action.payload };
        }
        default: {
            return state;
        }
    }
}
