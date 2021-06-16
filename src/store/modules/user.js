import api from '../../service/api'
import VueJwtDecode from 'vue-jwt-decode'

const state = {
    user: null
}

const getters= {
    isAuthenticated(state){
        return state.user !== null 

    }
} 

const mutations= {
    SET_USER(state, user ){
        state.user = user
    }
} 

const actions= {
    authenticate(context){
        const token = localStorage.getItem("currentUser")

        if (token) {
            const id = VueJwtDecode.decode(token.slice(0,-1).substring(1)).user.id
            return api.get(`user/${id}`).then(({ data }) => {
                context.commit('SET_USER', data[0])
            })
        }

        return Promise.reject()
    }
    
}

export default {state, getters, mutations, actions, namespaced: true}