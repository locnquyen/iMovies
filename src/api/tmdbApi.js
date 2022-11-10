import axiosClient from "./axiosClient";
import axios from 'axios';
import apiConfig from './apiConfig';

export const category = {
    movie: 'movie',
    tv: 'tv'
}

export const movieType = {
    upcoming: 'upcoming',
    popular: 'popular',
    top_rated: 'top_rated'
}

export const tvType = {
    popular: 'popular',
    top_rated: 'top_rated',
    on_the_air: 'on_the_air'
}

const tmdbApi = {
    getMoviesList: (type, params) => {
        const url = 'movie/' + movieType[type];
        return axiosClient.get(url, {
            params: {
                ...params,
                api_key: apiConfig.apiKey
            }
        });
    },
    getTvList: (type, params) => {
        const url = 'tv/' + tvType[type];
        return axiosClient.get(url, {
            params: {
                api_key: apiConfig.apiKey,
                ...params,
                
            }
        });
    },
    getVideos: (cate, id) => {
        const url = category[cate] + '/' + id + '/videos';
        return axiosClient.get(url, { params: {
            api_key: apiConfig.apiKey
        } });
    },
    search: (cate, params) => {
        //https://api.themoviedb.org/3/search/movie?api_key=1de04659ff9ee932df08fda644e1012b&query=one&page=1
        const url = 'search/' + category[cate];
        return axiosClient.get(url, {
            params: {
                api_key: apiConfig.apiKey,
                ...params,
            }
        });
    },
    detail: (cate, id, params) => {
        const url = category[cate] + '/' + id;
        return axiosClient.get(url, {
            params: {
                api_key: apiConfig.apiKey,
                ...params,
            }
        });
    },
    credits: (cate, id) => {
        const url = category[cate] + '/' + id + '/credits';
        return axiosClient.get(url, {
            params: {
                api_key: apiConfig.apiKey,
            }
        });
    },
    similar: (cate, id) => {
        const url = category[cate] + '/' + id + '/similar';
        return axiosClient.get(url, {
            params: {
                api_key: apiConfig.apiKey,
            }
        });
    },
}

export default tmdbApi;