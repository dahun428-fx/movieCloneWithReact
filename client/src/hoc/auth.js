import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../_actions/user_action';

export default function authHoc(SpecificComponent, option, adminRoute = null){
    function AuthenticationCheck(props){

        let user = useSelector(state => state.user);
        const dispatch = useDispatch();

        useEffect(()=>{
            dispatch(auth()).then(res=>{
                if(!res.payload.isAuth){
                    if(option){
                        props.history.push('/');
                    }
                } else {
                    if(adminRoute && !res.payload.isAdmin){
                        props.history.push('/');
                    } else {
                        if(option === false){
                            props.history.push('/');
                        }
                    }
                }
            })
        },[dispatch, props.history])

        return (
            <SpecificComponent {...props} user={user} />
        )
    }
    return AuthenticationCheck;
}