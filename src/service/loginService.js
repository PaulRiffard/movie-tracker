import { BehaviorSubject } from 'rxjs';
import { requestOptions } from './request-options';
import {handleResponse } from './handle-response'
import VueJwtDecode from 'vue-jwt-decode'


 
//const api = 'http://localhost:5500/user'
let user



const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const authenticationService = {
    login,
    logout,
    getUser,
    editSeen,
  /*   decripteToken, */
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () { return currentUserSubject.value }
};

function login(email, password) {
    return fetch(`${api}/login`, requestOptions.post({ email, password }))
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user.token));
            currentUserSubject.next(user);
            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
}

function getUser(){

    let token = localStorage.getItem("currentUser")
    let id = VueJwtDecode.decode(token.slice(0,-1).substring(1)).user.id
    return fetch(`${api+'/'+id}`, requestOptions.get())
    .then(handleResponse)
    .then(res =>{
         user = res[0]
        return user
    })
}

    function editSeen(id, user ){

        console.log(user, id)

    return fetch(`${api+'/'+id}`, requestOptions.put(user))
        .then(handleResponse)
        .then(res =>{
            console.log(res)
        })
 

    }
