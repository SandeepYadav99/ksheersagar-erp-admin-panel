import {postRequest,formDataRequest} from '../libs/AxiosService.util';

export async function serviceCreateProduct(params) {
    return await formDataRequest('products/create', params);
}

export async function serviceUpdateProduct(params) {
    return await postRequest('products/update', params);
}

// export async function serviceDeleteUnit(params) {
//     return await postRequest('units/delete', params);
// }

export async function serviceGetProduct (params) {
    return await postRequest('products', params);
}

// export async function serviceGetUnitList (params) {
//     return await postRequest('units/list', params);
// }

// export async function serviceUnitCheck (params) {
//     return await postRequest('units/check', params);
// }

export async function serviceGetProductDetails(params) {
    return await postRequest('products/detail', params);
}