import {postRequest} from '../libs/AxiosService.util';

export async function serviceCreateUnit(params) {
    return await postRequest('unit/create', params);
}

export async function serviceUpdateUnit(params) {
    return await postRequest('unit/update', params);
}

export async function serviceDeleteUnit(params) {
    return await postRequest('unit/delete', params);
}

export async function serviceGetUnit (params) {
    return await postRequest('unit', params);
}

export async function serviceGetUnitList (params) {
    return await postRequest('unit/list', params);
}

export async function serviceUnitCheck (params) {
    return await postRequest('unit/check', params);
}

