import axios from "axios";
import {MOVIE_API_URL, MOVIE_IMAGE_BASE_API_URL} from '../Config/Config';
import {MOVIE_API_KEY} from '../Config/Key';
import { ADD_FAVORITE, COUNT_FAVORITE, GET_ALL_FAVORITE, GET_FAVORITE, REMOVE_FAVORITE } from './types';

export function registerFavoriteMovie(body){
    const request = axios.post('/api/favorite/registerOne', body).then(res => res.data);
    return {
        type : ADD_FAVORITE,
        payload : request,
    }
}
export function getFavoriteMovieByUserId(body){
    const request = axios.post('/api/favorite/getFavoriteByMovieId', body).then(res => res.data);
    return {
        type: GET_FAVORITE,
        payload : request,
    }
}
export function getAllFavoriteMovie(body){

    //동기 선언 --> async
    const getFavorites = async(body) => {
        //awit --> favorites 를 먼저 구한다.
        const favorites = await axios.post('/api/favorite/getFavoriteMovieByUserId', body).then(res => res.data.favorite);
        // 이후 movies 를 구한다.
        let movies = await getMovieData(favorites);
        return {
            favorites, movies
        };
    }
    //동기 선언 --> async
    const getMovieData = async(favorites) => {
        //map 으로 처리한 데이터를 배열로 변경
        //변경된 데이터는 [Promise, Promise, Promise] 형태로 담겨있음.
        const promise = await favorites.map(async (favorite, index)=>{
            const url = `${MOVIE_API_URL}/movie/${favorite.movieId}?api_key=${MOVIE_API_KEY}`;
            const res = await axios.get(url);
            return res.data;
        })    
        //[Promise, Promise, Promise] 형태로 담겨 있는 데이터들을 병렬처리하여 데이터를 풀어낸다.
        const movies = await Promise.all(promise);
        //풀어낸 데이터 리턴.
        return movies;
    }
    const request = getFavorites(body);
    return {
        type: GET_ALL_FAVORITE,
        payload: request,
    }
}
export function removeFavoriteOne(body){
    const request = axios.post('/api/favorite/removeOne', body).then(res => res.data);
    return { 
        type : REMOVE_FAVORITE,
        payload: request,
    }
}
export function countFavorite(body){
    const request = axios.post('/api/favorite/count', body).then(res => res.data);
    return {
        type : COUNT_FAVORITE,
        payload : request,
    }
}