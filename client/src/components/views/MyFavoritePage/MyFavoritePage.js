import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllFavoriteMovie, removeFavoriteOne } from '../../../_actions/favorite_action';
import {Button, Space, Table, Image, Popover } from 'antd';
import { MOVIE_IMAGE_BASE_API_URL } from '../../../Config/Config';
const loadingImage = `/images/common/loading.gif`;

function MyFavoritePage(props){

    const user = useSelector(state => state.user);
    
    const [ Movies, setMovies ] = useState([]);
    const [ Favorites, setFavorites ] = useState([]);
    const [ MovieImage, setMovieImage ] = useState(loadingImage);

    const dispatch = useDispatch();
    let userId;
    if(Object.keys(user).length === 0){
        userId = localStorage.getItem("userId");
    } else {
        userId = user.auth._id
    }

    useEffect(()=>{
        setting();
    },[]);
    const setting = () => {
        dispatch(getAllFavoriteMovie({userForm : userId})).then(res => {
            setMovies(res.payload.movies);
            setFavorites(res.payload.favorites);
            if(res.payload.movies.length > 1){
                const url = `${MOVIE_IMAGE_BASE_API_URL}/w500${res.payload.movies[0].poster_path}`;
                setMovieImage(url);
            }
        })

    }
    const onClickHanlder = (record) => {
        if(!userId){
            alert('로그인이 필요합니다.')
            setTimeout(()=>{
                props.history.push('/login');
            },3000)
        }
        
        let confirm = window.confirm('정말 삭제하시겠습니까?');
        if(confirm){
            let body = { userForm : userId, movieId : record.id}
            console.log(body);
            dispatch(removeFavoriteOne(body)).then(res => {
                if(res.payload.success){
                    alert('삭제되었습니다.');
                    setting();
                } else {
                    alert('삭제에 실패하였습니다.');
                }
            });
        }
    }
    const mouseEnter = (movie) => {

        setMovieImage(loadingImage);
        const url = `${MOVIE_IMAGE_BASE_API_URL}/w500${movie.poster_path}`;
        setTimeout(()=>{
            setMovieImage(url);
        }, 500);
      
    }
    const onRow = (record, index) => {
        return {
            onMouseEnter : () => mouseEnter(record),
        }
    }
    return (
        <div style={{ width : '85%', margin : '3rem auto'}}>
            <h2> Favorite Movies </h2>
            <hr />
            { Favorites && Movies &&
            <Table dataSource={Movies} rowKey={Movies => Movies.id} onRow={onRow}>
                <Table.Column title="Movie Title" dataIndex="title" 
                render={(text, record)=> (
                    <Popover content={
                        <Image width={300} src={MovieImage} />
                    }>
                        <div>{record.title}</div>
                    </Popover>
                )}
                /> 
                <Table.Column title="Movie Runtime" dataIndex="runtime" /> 
                <Table.Column title="Remove from favorites" 
                    render={(text, record) => (
                        <Space size="middle">
                            <Button onClick={() => onClickHanlder(record)}>Remove</Button>
                        </Space>
                    )}
                /> 
            </Table>
            }
        </div>
    );
}

export default MyFavoritePage;