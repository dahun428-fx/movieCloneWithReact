import axios from 'axios';
import {MOVIE_API_URL, MOVIE_IMAGE_BASE_API_URL} from '../Config/Config';
import {MOVIE_API_KEY} from '../Config/Key';
import { GET_MOVIE, GET_MOVIES, GET_MOVIE_CREDITS } from './types';


export function getPopularMovies(pageNum){
    const url = `${MOVIE_API_URL}/movie/popular?api_key=${MOVIE_API_KEY}&language=en-US&page=${pageNum}`;
    const request = axios.get(url).then(res => res.data);
    return { 
        type : GET_MOVIES,
        payload : request,
    }
}
export function getMovie(movieId){
    const url = `${MOVIE_API_URL}/movie/${movieId}?api_key=${MOVIE_API_KEY}`;
    const request = axios.get(url).then(res => res.data);
    return {
        type : GET_MOVIE,
        payload : request,
    }
}
export function getMovieCredits(movieId){
    const url = `${MOVIE_API_URL}/movie/${movieId}/credits?api_key=${MOVIE_API_KEY}`;
    const request = axios.get(url).then(res => res.data);
    return {
        type : GET_MOVIE_CREDITS,
        payload : request,
    }
}
