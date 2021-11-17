import React from 'react';
import moment from "moment";
import { Formik } from 'formik';
import * as Yup from 'yup';
import RegisterForm from '../../Form/RegisterForm';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_action';

function RegisterPage(props){

    const dispatch = useDispatch();

    const formItemLayout = {
        labelCol : {
            xs : { span : 24 },
            sm : { span : 8 },
        },
        wrapperCol : {
            xs : { span : 24 },
            sm : { span : 16},
        }
    };
    const tailItemLayout = {
        wrapperCol : {
            xs : {
                span : 24,
                offset : 0,
            },
            sm : {
                span : 16,
                offset : 8,
            }
        }
    }
    const imageAvatar = `http://gravatar.com/avatar/${moment().unix()}?d=identicon`;


    return(

        <Formik
            initialValues={{
                email : '',
                lastName : '',
                name : '',
                password : '',
                confirmPassword : ''
            }}
            validationSchema={
                Yup.object().shape({
                    name : Yup.string().required('이름을 입력해주세요.'),
                    lastName : Yup.string().required('성을 입력해주세요.'),
                    email : Yup.string().email('유효한 이메일이 아닙니다.').required('이메일을 입력해주세요.'),
                    password : Yup.string().min(6, '비밀번호는 6글자 이상 입력해주세요.').required('비밀번호를 입력해주세요.'),
                    confirmPassword : Yup.string().oneOf([Yup.ref('password'), null], '비밀번호는 일치해야합니다.').required('확인 비밀번호를 입력해주세요.')
                })
            }
            onSubmit={(values, { setSubmitting}) => {
                setTimeout(()=>{
                    let body = {
                        email : values.email,
                        password : values.password,
                        name : values.name,
                        lastName : values.lastName,
                        image : imageAvatar,
                    }
                    dispatch(registerUser(body)).then(res => {
                        if(res.payload.success){
                            alert('회원가입에 성공하였습니다.');
                            props.history.push('/login');
                        } else {
                            if(res.payload.message){
                                alert(res.payload.message);
                            } else {
                                alert('회원가입에 실패했습니다. 다시시도해주세요.');
                            }
                        }
                    })
                    setSubmitting(false);
                }, 500)
            }}
        
        >
            {props => {
                return (
                    <RegisterForm {...props} formItemLayout={formItemLayout} tailItemLayout={tailItemLayout} />

                );
            }}

        </Formik>
    );
}
export default RegisterPage;