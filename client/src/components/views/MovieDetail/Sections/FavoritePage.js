import React, { useEffect, useState } from 'react';
import {Button} from 'antd';
import { countFavorite, getFavoriteMovieByUserId, registerFavoriteMovie, removeFavoriteOne } from '../../../../_actions/favorite_action';
import { useDispatch } from 'react-redux';

function FavoritePage(props){

    const { movie, user} = props;
    const dispatch = useDispatch();
    const [ IsFavorite, setIsFavorite ] = useState(false);
    const [ Count, setCount ] = useState(0);
    const favorite = {
        movieId : movie.id,
        userForm : user._id,
        movieTitle : movie.title,
        moviePost : movie.image,
        movieRuntime : movie.runtime,
    }

    useEffect(()=>{
        FavoriteSetting();
    },[]);
   
    const FavoriteSetting = () => {
        getFavoriteCount();
        isFavoriteDisp();
    }

    const getFavoriteCount = () => {
        dispatch(countFavorite(favorite)).then(res => {
            if(res.payload.success) {
                setCount(res.payload.count);
            }
        });
    }
    const isFavoriteDisp = () => {
        dispatch(getFavoriteMovieByUserId(favorite)).then(res => {
            if(res.payload.success) {
                setIsFavorite(true);
            } else {
                setIsFavorite(false);
            }
        });
    }
    const addFavorite = () => {
        dispatch(registerFavoriteMovie(favorite)).then(res=> {
            if(res.payload.success){
                alert('추가되었습니다.');
            } else {
                alert('이미 존재합니다.');
            }
            FavoriteSetting();
        });
    }
    const removeFavorite = () => {
        dispatch(removeFavoriteOne(favorite)).then(res => {
            if(res.payload.success){
                alert('삭제되었습니다.');
            } else {
                alert('실패 하였습니다.');
            }
            FavoriteSetting();
        });
    }
    const onClickHanlder = () => {
        if(user._id){
            if(!IsFavorite){
                addFavorite();
            } else {
                removeFavorite();
            }
        } else {
            alert('로그인이 필요합니다.');
            return;
        }
    }

    return(
        <Button onClick={onClickHanlder}>{IsFavorite ? 'Not Favorite' : 'Favorite'} {Count}</Button>
    );
}
export default FavoritePage;