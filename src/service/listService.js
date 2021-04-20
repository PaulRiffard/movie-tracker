const api = 'http://localhost:5500/list'
//const api = 'https://movie-tracker-back.herokuapp.com/list'
import {handleResponse } from './handle-response'
import { requestOptions } from './request-options';

export const sList = {
    addList,
    getListById,
    supprListById,
};


function addList(list){
    return fetch(`${api}/add`, requestOptions.post({list}))
    .then(handleResponse)
}

function getListById(id){
    return fetch(`${api}/`+id, requestOptions.get({id}))
    .then(handleResponse)
}

function supprListById(id){
    return fetch(`${api}/`+id, requestOptions.delete({id}))
    .then(handleResponse)
}
