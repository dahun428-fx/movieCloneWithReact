import React, { useEffect, useState } from 'react';
import { FaCode } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { getPopularMovies } from '../../../_actions/movie_action';

function LandingPage(props){

    const dispatch = useDispatch();
    
    const [ Movies , setMovies ] = useState([]); 

    useEffect(() => {

        // dispatch(getPopularMovies()).then(res => {
        //     // console.log(res.results);
        //     // setMovies([res.results]);
        //     // console.log(Movies)
        // })
    }, []);


    return(
        <>
            <div className="app">
                <FaCode style={{fontSize:'4rem'}} /><br/>
                <span style={{fontSize:'2rem'}}>hello</span>
            </div>
            <div style={{float:'right'}}>hi</div>
        </>
    )
}
export default LandingPage;