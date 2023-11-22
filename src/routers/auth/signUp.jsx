import React, {useState, useEffect} from 'react';
import {Form, Input, Button, Checkbox, message} from 'antd';
import {UserOutlined, LockOutlined, MailOutlined, ReadOutlined} from '@ant-design/icons';
import '/src/style/Register.css';
import {Link, useNavigate} from "react-router-dom";
import {emailLogin, sendEmail} from "../../api/auth.js";

const SignUp = () => {
    const [isEmailSent, setIsEmailSent] = useState(false);
    const [countdown, setCountdown] = useState(60);
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const onFinish = async (values) => {
        const {username, password, emailCode, email} = values;

        if (!username || !password || !emailCode || !email) {
            return message.error('请填写完整的注册信息');
        }
        const res = await emailLogin(values)
        if (res.code !== 200) {
            return message.error(res.message);
        }
        message.success(res.message)
        navigate("/login")
    };


    const startCountdown = () => {
        let timer = setInterval(() => {
            setCountdown((prevCount) => prevCount - 1);
        }, 1000);

        setTimeout(() => {
            clearInterval(timer);
            setCountdown(60);
            setIsEmailSent(false);
        }, 60000);
    };

    const onSendEmailClick = async () => {
        try {
            const values = await form.validateFields(['email']);
            const {email} = values;


            if (!email) {
                return message.error('请先填写邮箱或账号');
            }

            const res = await sendEmail({email: email});
            if (res.code !== 200) {
                return message.error(res.message);
            }

            message.success(res.message)
            setIsEmailSent(true);
            startCountdown();
        } catch (error) {
            console.error('Validation failed:', error);
        }
    };

    return (
        <div className="register-container">
            <div className="register-form">
                <h1 style={{textAlign: 'center', marginBottom: '24px'}}>注册</h1>
                <Form
                    form={form}
                    name="normal_login"
                    className="login-form"
                    initialValues={{remember: true}}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[{required: true, message: '请输入账号'}]}
                    >
                        <Input
                            prefix={<UserOutlined className="site-form-item-icon"/>}
                            placeholder="账号"
                        />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        rules={[{required: true, message: '请输入邮箱'}]}
                    >
                        <Input
                            prefix={<MailOutlined className="site-form-item-icon"/>}
                            placeholder="邮箱"
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{required: true, message: '请输入密码'}]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon"/>}
                            type="password"
                            placeholder="密码"
                        />
                    </Form.Item>
                    <Form.Item name="emailCode">
                        <div style={{display: "flex", justifyContent: "space-between"}}>
                            <Input
                                prefix={<ReadOutlined className="site-form-item-icon"/>}
                                type="text"
                                placeholder="邮箱验证码"
                            />
                            <div>
                                <Button type="default" onClick={onSendEmailClick} disabled={isEmailSent}>
                                    {isEmailSent ? `重新发送 (${countdown}s)` : '发送邮件'}
                                </Button>
                            </div>
                        </div>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            注册
                        </Button>
                        或 <Link to={"/login"}>已有账号？去登录!</Link>
                    </Form.Item>
                </Form>

            </div>
        </div>
    );
};

export default SignUp;
