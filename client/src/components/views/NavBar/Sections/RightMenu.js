import React from 'react';
import { Menu } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../../../_actions/user_action';


function RightMenu(props){

    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    const logoutHandler = (event) => {
        event.preventDefault();
        dispatch(logoutUser()).then(res => {
            if(res.payload.success){
                alert('로그아웃 되었습니다.');
                localStorage.removeItem('userId');
                props.history.push('/login');
            } else {
                alert('로그아웃에 실패하였습니다.');
            }
        })
    }
    const myFavoriteHandler = (event) => {
        event.preventDefault();
        props.history.push('/myFavorite');
    }
    if(user.auth && !user.auth.isAuth){
        return (
            <Menu mode={props.mode}>
                <Menu.Item key="mail">
                    <a href="/login">SignIn</a>
                </Menu.Item>
                <Menu.Item key="app">
                    <a href="/register">SignUp</a>
                </Menu.Item>
            </Menu>
            
        );
    } else {
        return (
            <Menu mode={props.mode}>

                <Menu.Item key="myFavorite">
                    <a href="#javascript" onClick={myFavoriteHandler}>My Favorite List</a>
                </Menu.Item>
                <Menu.Item key="logout">
                    <a href="#javascript" onClick={logoutHandler}>Logout</a>
                </Menu.Item>
            </Menu>
        );
    }
}
export default RightMenu;