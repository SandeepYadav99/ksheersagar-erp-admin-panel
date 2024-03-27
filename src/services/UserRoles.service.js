import {getRequest, postRequest} from '../libs/AxiosService.util';

export async function serviceCreateRoles(params) {
    return await postRequest('roles/createE', params);
}

export async function serviceUpdateRoles(params) {
    return await postRequest('roles/update', params);
}

export async function serviceDeleteRoles(params) {
    return await postRequest('roles/delete', params);
}

export async function serviceGetRoles(params) {
    return await postRequest('roles', params);
}


export async function serviceRolesPermissions(params) {
    return await postRequest('roles/permissions', params); //roles/detail
}

export async function serviceRolesDetails(params) {
    return await postRequest('roles/detail', params); //roles/detail
}