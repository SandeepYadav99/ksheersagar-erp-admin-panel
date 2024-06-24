import {formDataRequest, postRequest} from '../libs/AxiosService.util';

export async function serviceGetStaticQr(params) {
    return await postRequest('static/qr/', params);
}
export async function serviceCreateStaticQr(params) {
    return await postRequest('static/qr/create', params);
}

export async function serviceUpdateStaticQr(params) {
    return await postRequest('static/qr/update', params);
}
export async function serviceGetStaticQrDetails(params) {
    return await postRequest('static/qr/detail', params);
}

export async function serviceStaticQrCheck (params) {
    return await postRequest('static/qr/exists', params);
}


