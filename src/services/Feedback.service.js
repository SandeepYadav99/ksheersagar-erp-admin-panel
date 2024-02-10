import {postRequest, formDataRequest} from '../libs/AxiosService.util';

export async function serviceCreateFeedback(params) {
    return await postRequest('customer/feedbacks/create', params);
}