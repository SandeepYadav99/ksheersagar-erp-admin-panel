import {postRequest} from '../libs/AxiosService.util';

export async function serviceCreateSubcategory(params) {
    return await postRequest('subcategories/create', params);
}

// export async function serviceUpdateUnit(params) {
//     return await postRequest('units/update', params);
// }

// export async function serviceDeleteUnit(params) {
//     return await postRequest('units/delete', params);
// }

export async function serviceGetSubcategory (params) {
    return await postRequest('subcategories', params);
}

// export async function serviceGetUnitList (params) {
//     return await postRequest('units/list', params);
// }

// export async function serviceUnitCheck (params) {
//     return await postRequest('units/check', params);
// }

// export async function serviceGetUnitDetails(params) {
//     return await postRequest('units/detail', params);
// }