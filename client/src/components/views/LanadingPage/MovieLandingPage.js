import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useInView } from "react-intersection-observer"
import {MOVIE_API_URL, MOVIE_IMAGE_BASE_API_URL} from '../../../Config/Config';
import {MOVIE_API_KEY} from '../../../Config/Key'
import { getPopularMovies } from '../../../_actions/movie_action';
import GridCards from '../../commons/GridCards';
import MainImage from './Sections/MainImageHoc';
import { Row, Spin } from 'antd';

function MovieLandingPage(props){

    const [ Movies, setMovies ] = useState([]);
    const [ MainMovie, setMainMovie ] = useState(null);
    const [ CurrentPage, setCurrentPage ] = useState(1);
    const [ IsLoading, setIsLoading ] = useState(false);
    const [ref, inView] = useInView(); //무한스크롤


    const dispatch = useDispatch();
    useEffect(()=>{
        // const endPoint = `${MOVIE_API_URL}/movie/popular?api_key=${MOVIE_API_KEY}&language=en-US&page=1`
        dispatch(getPopularMovies(1)).then(res => {
            setMainMovie(res.payload.results[0]);
            fetchMovie(1);
        })
    },[]);
    useEffect(()=>{
        if(inView && !IsLoading){
            fetchMovie(CurrentPage);
        }
    },[inView, IsLoading]);
    const fetchMovie = (pageNum) => {
        setIsLoading(true);
        dispatch(getPopularMovies(pageNum)).then(res => {
            if(res.payload.results){
                setMovies([...Movies, ...res.payload.results]);
                setCurrentPage(CurrentPage+1);
            }
            setIsLoading(false);
        })
    }
   
    return (
        <div style={{width:'100%', margin:0}}>
            {/* main image */}
            {MainMovie &&
                <MainImage image={`${MOVIE_IMAGE_BASE_API_URL}/w1280${MainMovie.backdrop_path}`} title={MainMovie.title} desc={MainMovie.overview}/>
            }
            <div style={{width:'85%', margin:'1rem auto'}}>
                <h2>Movies by latest</h2>
                <hr />
                {/* movie grid cards */}
                <Row gutter={[16,16]}>
                {
                    Movies && Movies.map((movie, index) => {
                        return (
                            <GridCards 
                                key={index}
                                image={movie.poster_path ? `${MOVIE_IMAGE_BASE_API_URL}/w500${movie.poster_path}` : null}
                                title={`${movie.title}`}
                                href={`/movie/${movie.id}`}
                            />
                        )
                    })
                }
                </Row>
            </div>
        
        <div style={{display : 'flex', justifyContent:'center'}} ref={ref}>
            {IsLoading && 
                <Spin /> 
            }
            {/* <button onClick={loadMoreItems}>Load More</button> */}
        </div>



        </div>
    )
}
export default MovieLandingPage;