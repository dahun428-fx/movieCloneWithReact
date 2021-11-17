import React from 'react';
import { Form, Input, Button, Checkbox, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const { Title } = Typography;

function LoginForm(props){

    const { values, touched, errors, 
            RememberMe, isSubmitting, 
            handleRememberMe, handleChange, 
            handleBlur, handleSubmit, 
            formErrorMessage } = props;
    const { email, password } = values;
   
    const checboxOnChangeHanlder = () => {
        handleRememberMe(!RememberMe)
      };

    return(
        <div className="app">
            <Title level={2}>Log In</Title>
            <form style={{width:'350px'}} onSubmit={handleSubmit}>
                <Form.Item required>
                    <Input
                    id="email"
                    prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Enter your email"
                    type="email"
                    value={email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={ errors.email && touched.email ? "text-input error" : "text-input"}
                />
                    { errors.email && touched.email && (
                        <div className="input-feedback">{errors.email}</div>
                    )}
                </Form.Item>
                <Form.Item required>
                    <Input 
                    id="password"
                    prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Enter your password"
                    type="password"
                    values={password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={ errors.password && touched.password ? "text-input error" : "text-input"}
                    />
                    { errors.password && touched.password && (
                        <div className="input-feedback">{errors.password}</div>
                    )}
                </Form.Item>
                {formErrorMessage && (
                <label ><p style={{ color: '#ff0000bf', fontSize: '0.7rem', border: '1px solid', padding: '1rem', borderRadius: '10px' }}>{formErrorMessage}</p></label>
              )}
                <Form.Item>
                    <Checkbox
                    id="rememberMe"
                    checked={RememberMe}
                    onChange={checboxOnChangeHanlder}
                    >Remember me</Checkbox>
                    <a href="#javascript" className="login-form-forgot" style={{float:'right'}}>forgot password</a>
                    <div>
                        <Button type="primary" htmlType="submit" className="login-form-button"
                        disabled={isSubmitting}
                        onSubmit={handleSubmit}
                        style={{minWidth:'100%'}}>Log in</Button>
                    </div>
                    Or <a href="/register">register now</a>
                </Form.Item>
            </form>
        </div>
    )
}
export default LoginForm;