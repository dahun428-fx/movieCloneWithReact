import React, { useEffect, useState } from 'react';
import LoginForm from '../../Form/LoginForm';
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action';

function LoginPage(props){

    const dispatch = useDispatch();

    const rememberMeChecked = localStorage.getItem("remeberMe") ? true : false;
    const [ formErrorMessage, setFormErrorMessage ] = useState('');

    const [ RememberMe, setRememberMe ] = useState(rememberMeChecked);

    const handleRememberMe = () => {
        setRememberMe(!RememberMe)
    };

    const initialEmail = localStorage.getItem('rememberMe') ? localStorage.getItem('rememberMe') : '';
   
    return (
        <Formik
            initialValues={{
                email : initialEmail,
                password : ''
            }}
            validationSchema={
                Yup.object().shape({
                    email : Yup.string().email('사용 할 수 없는 이메일입니다.').required('이메일을 입력하세요.'),
                    password : Yup.string().min(6, '비밀번호는 6자리 이상 입력하셔야합니다.').required('비밀번호를 입력하세요.')
                })
            }
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(()=>{
                    let body = {
                        email : values.email,
                        password : values.password,
                    }
                    dispatch(loginUser(body)).then(res=>{
                        if(res.payload.success){
                            window.localStorage.setItem('userId', res.payload.userId);
                            if(RememberMe === true){
                                window.localStorage.setItem('rememberMe', values.id);
                            } else {
                                localStorage.removeItem('rememberMe');
                            }
                            props.history.push('/');
                        } else {
                            localStorage.removeItem('rememberMe');
                            setFormErrorMessage('아이디, 비밀번호를 다시 확인해주세요.');
                            setTimeout(()=>{
                                setFormErrorMessage("");
                            }, 3000)
                        }
                    }).catch(err => {
                        setFormErrorMessage('아이디, 비밀번호를 다시 확인해주세요.');
                        setTimeout(()=>{
                            setFormErrorMessage("");
                        }, 3000)
                    })
                    setSubmitting(false);
                }, 500);
            }}
        >
            {props => {
                return (
                    <LoginForm 
                        {...props} 
                        RememberMe={RememberMe} 
                        handleRememberMe={handleRememberMe}
                        formErrorMessage={formErrorMessage}
                     />                
                );
            }}
        </Formik>    
    );
}
export default LoginPage;