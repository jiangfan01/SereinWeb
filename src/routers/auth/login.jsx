import React, {useState} from 'react';
import {Form, Input, Button, Checkbox, Row, Col, message} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import {Link, useNavigate} from "react-router-dom";
import {login} from "../../api/auth.js";
import {setToken} from "../../../utils/auth.js";

const Login = () => {
    const [form] = Form.useForm();
    const [rememberMe, setRememberMe] = useState(false);

    const navigate = useNavigate();
    const onFinish = async (values) => {
        const res = await login(values)
        if (res.code !== 200) {
            message.error(res.message)
        }
        setToken(res.data.token, values.remember)
        navigate("/")
    };

    return (
        <Row justify="center" align="middle"
             style={{minHeight: '100vh', background: 'linear-gradient(to right, #348ac7, #7474bf)'}}>
            <Col span={8} style={{background: 'rgba(255, 255, 255, 0.9)', padding: '24px', borderRadius: '8px'}}>
                <h1 style={{textAlign: 'center', marginBottom: '24px'}}>Serein of Class Backstage</h1>
                <Form
                    form={form}
                    name="login-form"
                    initialValues={{remember: rememberMe}}
                    onFinish={onFinish}
                    size="large"
                >
                    <Form.Item
                        name="usernameOrEmail"
                        rules={[{required: true, message: '请输入邮箱或账号'}]}
                    >
                        <Input
                            prefix={<UserOutlined/>}
                            placeholder="邮箱或账号"
                            size="large"
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{required: true, message: '请输入密码'}]}
                    >
                        <Input.Password
                            prefix={<LockOutlined/>}
                            placeholder="密码"
                            size="large"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Checkbox
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                        >
                            记住我
                        </Checkbox>
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                            size="large"
                        >
                            登录
                        </Button>
                    </Form.Item>
                </Form>
                <div style={{textAlign: 'center', marginTop: '16px'}}>
                    还没有账号？<Link to={"/signUp"}>立即注册</Link>
                </div>
            </Col>
        </Row>
    );
};

export default Login;