import { postRequest} from '../libs/AxiosService.util';

export async function serviceShiftList(params) {
    return await postRequest('shifts/employees', params);
}

export async function serviceShiftEmpRemove(params){
    return await postRequest("shifts/employees/remove", params)
}