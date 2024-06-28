import {formDataRequest, postRequest} from '../libs/AxiosService.util';

export async function serviceGetShifts(params) {
    return await postRequest('shifts', params);
}

export async function serviceCreateShifts(params) {
    return await postRequest('shifts/create', params);
}

export async function serviceUpdateShifts(params) {
    return await postRequest('shifts/update', params);
}

export async function serviceGetShiftsDetail(params) { // app/settings/update/keys
    return await postRequest('shifts/detail', params);
}

export async function serviceGetShiftsWorkingHours(params) { // app/settings/update/keys
    return await postRequest('app/settings/update/keys', params);
}
export async function serviceAddEmployeeShift(params) { // app/settings/update/keys
    return await postRequest('shifts/employees/add', params);
}
