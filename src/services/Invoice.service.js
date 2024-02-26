import {postRequest} from '../libs/AxiosService.util';

export async function serviceDownloadInvoice(params) {
    return await postRequest('pos/pdf/download', params);
}
