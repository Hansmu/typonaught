import axios from 'axios';

import config from '../config/config';

const headers = {
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
    }
};

export function getRequest(uri) {
    return axios.get(`${config.backendUrl}/${uri}`, headers);
}

export function postRequest(uri, payload) {
    return axios.post(`${config.backendUrl}/${uri}`, payload, headers);
}

export function deleteRequest(uri) {
    return axios.delete(`${config.backendUrl}/${uri}`, headers);
}

export function putRequest(uri, payload) {
    return axios.put(`${config.backendUrl}/${uri}`, payload, headers);
}
