import { ADD_FAVORITE, COUNT_FAVORITE, GET_ALL_FAVORITE, GET_FAVORITE, REMOVE_FAVORITE } from '../_actions/types';

export default function reducer(state={}, action){
    switch(action.type){
        case ADD_FAVORITE :
            return {...state, register : action.payload }
        case GET_FAVORITE :
            return {...state, getFavorite : action.payload }
        case GET_ALL_FAVORITE :
            return {...state, getAllFavorite : action.payload }
        case REMOVE_FAVORITE :
            return {...state, removeFavorite : action.payload }
        case COUNT_FAVORITE :
            return {...state, countFavorite : action.payload }
        default :
            return state;
    }
}