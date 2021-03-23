//const api = 'http://localhost:5500/movie'
const api = 'https://movie-tracker-back.herokuapp.com/movie'
import {handleResponse } from './handle-response'
import { requestOptions } from './request-options';

export const sMovie = {
    movieSeen,
    getMovieByMdbId,
};


function movieSeen(movie){
    console.log(movie)
    return fetch(`${api}/add`, requestOptions.post({movie}))
    .then(handleResponse)
}

function getMovieByMdbId(id){
    return fetch(`${api}/`+id, requestOptions.get({id}))
    .then(handleResponse)
}

