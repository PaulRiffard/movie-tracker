import axios from 'axios';

export default () => axios.create({
    baseURL: 'https://movie-tracker-back.herokuapp.com/',
});
