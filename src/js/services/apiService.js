// класс с набором методов для взаимодействия с сервером

import axios from 'axios';
import config from '../config/apiConfig';

/** эндпоинты
 * /countries - возвращает массив поддерживаемых стран
 * /cities - возврашает массив городов
 * /prices/cheap - возвращает массив доступных рейсов
 */
class Api {
    constructor(config) {
        this.url = config.url;
    }

    async countries() {
        try {
            const response = await axios.get(`${this.url}/countries`);
            return response.data;
        } catch(err) {
            console.log(err);
            console.log('error with countries list');
            return Promise.reject(err);
        }
    }
    async cities() {
        try {
            const response = await axios.get(`${this.url}/cities`);
            return response.data;
        } catch(err) {
            console.log(err);
            console.log('error with cities list');
            return Promise.reject(err);
        }
    }
    async prices(params) {
        try {
            const response = await axios.get(`${this.url}/prices/cheap`, {
                params,
            });
            return response.data;
        } catch(err) {
            console.log(err);
            console.log('error with prices list');
            return Promise.reject(err);
        }
    }
}

const api = new Api(config);

export default api;