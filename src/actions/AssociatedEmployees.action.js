


import { serviceShiftEmpRemove, serviceShiftList } from "../services/AssociatedEmplyees.service";

export const INIT_JOB_CANDIDATES = 'INIT_SHIFT_EMPLOYE';
export const DONE_JOB_CANDIDATES = 'DONE_SHIFT_EMPLOYE';
export const DELETE_ITEM ='DELETE_ITEM';

export function actionGetJobOpeningShiftEmp(index = 1, sorting = {}, filter = {},openingId) {
    const request = serviceShiftList({index,sorting, filter ,shift_id: openingId });
    return (dispatch) => {
        dispatch({ type: INIT_JOB_CANDIDATES, payload: null });
        request.then((data) => {
         
            if (!data.error) {
                dispatch({type: DONE_JOB_CANDIDATES, payload: data.data})
            }
        })
    }
}

export function actionDeleteShiftEmpDeleted(shift_id, id) {
    const request = serviceShiftEmpRemove({ shift_id: shift_id, employee_id:id})
    return (dispatch) => {
        dispatch({type: DELETE_ITEM, payload: id})
       
    }
  }
