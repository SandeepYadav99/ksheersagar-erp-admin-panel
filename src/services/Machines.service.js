import {formDataRequest, postRequest} from '../libs/AxiosService.util';

export async function serviceGetPaytmMachines(params) {
    return await postRequest('paytm/machines/', params);
}
export async function serviceCreatePaytmMachines(params) {
    return await postRequest('paytm/machines/create', params);
}
export async function serviceUpdatePaytmMachines(params) {
    return await postRequest('paytm/machines/update', params);
}
export async function serviceGetPaytmMachinesDetails(params) {
    return await postRequest('paytm/machines/detail', params);
}

export async function servicePaytmMachinesCheck (params) {
    return await postRequest('paytm/machines/exists', params);
}


