import Api from '@/service/Api';

export default {
    createAcount() {
        return Api().post('user/login');
    },

    signUp() {
        return Api().post('user/signup');
    },
}