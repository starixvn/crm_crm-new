import axios from 'axios';
import Site from './site';

export default class DataService {
    static async getDataAsync(url, params) {
        return await axios.get(url, { params: params })
            .then(response => response).catch(Site.handleAxiosError);
    }


    static async postDataAsync(url, params) {
        const customAxios = axios.create({
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'RequestVerificationToken': Site.getXsrfToken()
            }
        });

        customAxios.interceptors.response.use(response =>{
            return response;
        }, error => {
            Promise.reject(error);
            return Site.handleAxiosError(error);
        });

        return await customAxios.post(url, params).then(response => response);
    }

    static async getFileAsync(url, params) {
        return await axios.post(
            url,
            params,
            {
                responseType: 'blob',
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'RequestVerificationToken': Site.getXsrfToken()
                }
            }).then(response => response).catch(Site.handleAxiosError);
    }
}