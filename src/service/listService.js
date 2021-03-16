const api = 'http://localhost:5500/list'
import {handleResponse } from './handle-response'
import { requestOptions } from './request-options';

export const sList = {
    addList,
    getListById,
};


function addList(list){
    console.log(list)
    return fetch(`${api}/add`, requestOptions.post({list}))
    .then(handleResponse)
}

function getListById(id){
    return fetch(`${api}/`+id, requestOptions.get({id}))
    .then(handleResponse)
}
