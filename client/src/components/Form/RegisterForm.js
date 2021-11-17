import React from 'react';
import { Form, Input, Button } from 'antd';

function RegisterForm(props){

    const {
        values,
        touched,
        errors,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit,
        tailItemLayout,
        formItemLayout
      } = props;
    const { name, email, password, lastName, confirmPassword } = values;

    return (
        <div className="app">
            <h2>Sign Up</h2>
            <Form style={{minWidth:'375px'}} {...formItemLayout} onSubmit={handleSubmit}>
                <Form.Item required label="Name">
                    <Input 
                        id="name"
                        placeholder="이름을 입력해주세요."
                        value={name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="text"
                        className={
                            errors.name && touched.name ? 'text-input error' : 'text-input'
                        }
                    />
                    {errors.name && touched.name && (
                        <div className="input-feedback">{errors.name}</div>
                    )}
                </Form.Item>
                <Form.Item required label="Last Name">
                    <Input
                        id="lastName"
                        placeholder="성을 입력해주세요."
                        type="text"
                        value={lastName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                            errors.lastName && touched.lastName ? 'text-input error' : 'text-input'
                        }
                    />
                    {errors.lastName && touched.lastName && (
                        <div className="input-feedback">{errors.lastName}</div>
                    )}
                </Form.Item>
                <Form.Item required label="Email" hasFeedback 
                            validateStatus={errors.email && touched.email ? 'error' : 'success' }>
                    <Input 
                        id="email"
                        placeholder="이메일을 입력해주세요."
                        type="email"
                        value={email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                            errors.email && touched.email ? 'text-input error' : 'text-input'
                        }
                    />
                    {errors.email && touched.email && (
                        <div className="input-feedback">{errors.email}</div>
                    )}
                </Form.Item>
                <Form.Item required label="Password" hasFeedback 
                            validateStatus={errors.password && touched.password ? 'error' : 'success' }>
                    <Input 
                        id="password"
                        placeholder="비밀번호를 입력해주세요."
                        type="password"
                        value={password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                            errors.password && touched.password ? 'text-input error' : 'text-input'
                        }
                    />
                    {errors.password && touched.password && (
                        <div className="input-feedback">{errors.password}</div>
                    )}
                </Form.Item>
                <Form.Item required label="Confirm" hasFeedback>
                    <Input 
                        id="confirmPassword"
                        placeholder="비밀번호를 한번 더 입력해주세요."
                        type="password"
                        value={confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                            errors.confirmPassword && touched.confirmPassword ? 'text-input error' : 'text-input'
                        }
                    />
                    {errors.confirmPassword && touched.confirmPassword && (
                        <div className="input-feedback">{errors.confirmPassword}</div>
                    )}
                </Form.Item>
                <Form.Item {...tailItemLayout}>
                    <Button onClick={handleSubmit} disabled={isSubmitting} type="primary">Submit</Button>
                </Form.Item>
            </Form>
        </div>
    );
}
export default RegisterForm;