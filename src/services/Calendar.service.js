import {postRequest,formDataRequest} from '../libs/AxiosService.util';

export async function serviceCreateCalendar(params) {
    return await postRequest('holidays/create', params);
}

export async function serviceUpdateCalendar(params) {
    return await postRequest('holidays/update', params);
}

export async function serviceDeleteCalendar(params) {
    return await postRequest('holidays/delete', params);
}

export async function serviceGetCalendar (params) {
    return await postRequest('holidays', params);
}
export async function serviceDeleteCalendarImage (params) {
    return await postRequest('holidays/remove/image', params);
}

export async function serviceGetCalendarDetails(params) {
    return await postRequest('holidays/detail', params);
}