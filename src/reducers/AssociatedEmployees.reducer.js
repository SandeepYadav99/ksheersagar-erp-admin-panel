import {
    DONE_JOB_CANDIDATES,
   
    INIT_JOB_CANDIDATES,
  DELETE_ITEM
} from "../actions/AssociatedEmployees.action";
import constants from "../config/constants";


const initialState = {
    associatedUser: [],
    isCandidatesFetching: false,
  
};

function mapPresetPRequest(all, pageId) {
    return all.filter((val, index) => {
        if (index >= (((pageId+1) * constants.DEFAULT_PAGE_VALUE) - constants.DEFAULT_PAGE_VALUE) && index < (((pageId+1) * constants.DEFAULT_PAGE_VALUE))) {
            return val;
        }
    });
}
export default function (state = JSON.parse(JSON.stringify(initialState)), action) {
    switch (action.type) {
        
        case INIT_JOB_CANDIDATES: {
            return {...state, isCandidatesFetching: true};
        }
      
        case DONE_JOB_CANDIDATES: {
           
            return {
                ...state,
                associatedUser: action.payload,
                isCandidatesFetching: false,
            };
        }
        case DELETE_ITEM: {
            if (action.payload) {
                let tempIndex = null;
                const prevState = state.associatedUser;
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
                // const tableData = mapPresetPRequest(prevState, state.currentPage);
                return {...state, associatedUser: prevState};
            }
            return state;
        }
        default: {
            return state;
        }
    }
}
