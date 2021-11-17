import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMovie, getMovieCredits } from '../../../_actions/movie_action';
import { Button, Row } from 'antd';
import MainImageHoc from '../LanadingPage/Sections/MainImageHoc';
import { MOVIE_IMAGE_BASE_API_URL } from '../../../Config/Config';
import MovieInfoPage from './Sections/MovieInfoPage';
import GridCards from '../../commons/GridCards';
import FavoritePage from './Sections/FavoritePage';

function MovieDetailPage(props){

    const user = useSelector(state => state.user);
    
    const dispatch = useDispatch();
    const [ Movie, setMovie ] = useState(null);
    const [ MovieCasts, setMovieCasts ] = useState([]);
    const [ ActorToggle, setActorToggle ] = useState(false);

    const movieId = props.match.params.movieId;
  
    useEffect(()=>{
        dispatch(getMovie(movieId)).then(res => setMovie(res.payload));
        dispatch(getMovieCredits(movieId)).then(res=> setMovieCasts(res.payload.cast));
    },[]);
    const onGridCardOnclickEvent = (e) => {
        e.preventDefault();
    }
    const ActorToggleOnClickEvent = () => {
        setActorToggle(!ActorToggle);
    }
    

    return (
        <div>
            {/* Header */}
            { Movie && 
                <MainImageHoc image={`${MOVIE_IMAGE_BASE_API_URL}/w1280${Movie.backdrop_path}`} title={Movie.title} desc={Movie.overview}/>
            }
            {/* Body */}

            <div style={{width:'85%', margin:'1rem auto'}}>
                <div style={{display:'flex', justifyContent:'flex-end'}}>
                    {
                        Movie &&  Object.keys(user).length !== 0 &&
                        <FavoritePage movie={Movie} user={user.auth}/>
                    }
                </div>
                
                {/* Movie Info */}
                { Movie && 
                    <MovieInfoPage movie={Movie} user={user.auth}/>
                }
                <br />
                {/* Action Grid */}
                { ActorToggle &&
                    <Row gutter={[16,16]}>
                        {
                            MovieCasts && MovieCasts.map((cast, index)=>{
                                return(
                                    <GridCards 
                                    key={index}
                                    image={cast.profile_path ? `${MOVIE_IMAGE_BASE_API_URL}/w500${cast.profile_path}` : `/images/common/No-Image.png`} 
                                    title={cast.original_name}
                                    href={`#`}
                                    onClick={onGridCardOnclickEvent}
                                    />
                                    )
                                })
                        }

                    </Row>
                }

                <div style={{ display : 'flex', justifyContent:'center', margin:'2rem'}}>
                    <Button onClick={ActorToggleOnClickEvent}> Toggle Actor View </Button>
                </div>
            </div>

        </div>

    );


}
export default MovieDetailPage;