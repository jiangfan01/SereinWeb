import {Button, Form, Input, Select, Upload, Switch, message, Breadcrumb} from 'antd';
import {PlusOutlined, LoadingOutlined, HomeOutlined, UserOutlined, EditOutlined} from '@ant-design/icons';
import {useNavigate, useParams} from "react-router-dom";
import {fetchUser, updateUser} from "../../src/api/user.js";
import React, {useContext, useEffect, useState} from "react";
import {v4 as uuidv4} from "uuid";
import {uploadToken} from "../../src/api/upload.js";
import {UserContext} from "../../src/context/UserContext.jsx";

const rules = {
    username: [{required: true, message: "请填写用户名!"}],
}

const App = (props) => {
    const navigate = useNavigate();
    const params = useParams();
    const {TextArea} = Input;
    const [formData] = Form.useForm();
    const [imageUrl, setImageUrl] = useState();
    const [sex, setSex] = useState();
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(false);
    const [uploadData, setUploadData] = useState({
        token: "",
        key: ""
    });

    /*
     * @description 初始化用户信息,使用context来进行跨组件更新信息
     */
    const {user, setUser, fetchUserInfo} = useContext(UserContext);

    /**
     * @description 查询单条
     */
    const init = async () => {
        const res = await fetchUser(params.id);
        formData.setFieldsValue({...res.data.user, password: ""});
        setImageUrl(res.data.user.avatar);
        setSex(res.data.user.sex ? "男" : "女");
        setIsAdmin(res.data.user.isAdmin)
    };

    const fetchToken = async () => {
        const tokenRes = await uploadToken();
        setUploadData({
            ...uploadData,
            token: tokenRes.data.uploadToken
        });
        console.log(tokenRes.data.uploadToken,123)
        if (tokenRes.code !== 200) {
            message.error(tokenRes.message)
        }
    }

    /**
     * 上传图片之前
     */
    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
        if (!isJpgOrPng) {
            message.error("你只能上传 JPG/PNG 文件!");
            return false;
        }

        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error("图片必须小于 2MB!");
            return false;
        }

        const ext = file.type.split("/")[1];
        setUploadData({
            ...uploadData,
            key: `${uuidv4()}.${ext}`
        })
    };

    /**
     * 上传状态发生变化
     */
    const handleChange = (info) => {
        if (info.file.status === "uploading") {
            setLoading(true);
            return;
        }
        if (info.file.status === "done") {
            console.log(7777)
            setImageUrl(`http://sdxsx9xbj.hn-bkt.clouddn.com/${info.file.response.key}`)
            setLoading(false);
        }
    }

    /**
     * 上传按钮
     * @type {JSX.Element}
     */
    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined/> : <PlusOutlined/>}
            <div
                style={{
                    marginTop: 8,
                }}
            >
                上传
            </div>
        </div>
    );

    /**
     * 修改管理员状态
     * @param checked
     */
    const handleAdmin = (checked,) => {
        console.log(checked)
        setIsAdmin(checked)
        message.success("修改管理员状态成功").then(res => {
        })
    }

    useEffect(() => {
        if (props.isEdit) {
            init().then()
        }
        fetchToken().then()
    }, [props.isEdit]);

    //提交表单
    const onFinish = async (values) => {
        values = {
            ...values,
            avatar: imageUrl
        }
        const res = await updateUser(params.id, values)
        if (res.code !== 200) {
            return message.error(res.message)
        }
        setUser({...user, avatar: imageUrl, username: values.username}); // 更新用户上下文
        message.success(res.message)
        navigate("/users")

    };


    return (
        <>
            <Breadcrumb
                style={{marginBottom: 15}}
                items={[
                    {
                        href: '/',
                        title: <HomeOutlined/>,
                    },
                    {
                        href: '/users',
                        title: (
                            <>
                                <UserOutlined/>
                                <span>用户列表</span>
                            </>
                        ),
                    },
                    {
                        href: `/users/edit${params.id}`,
                        title: (
                            <>
                                <EditOutlined/>
                                <span>编辑列表</span>
                            </>
                        ),
                    },
                ]}
            />
            <Form
                form={formData}
                name="basic"
                labelCol={{
                    flex: '110px',
                }}
                style={{
                    maxWidth: 900,
                }}
                initialValues={{
                    sort: 1,
                }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                    label="用户名"
                    name="username"
                    rules={rules.username}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="邮箱"
                    name="email"
                >
                    <Input/>
                </Form.Item>


                <Form.Item
                    name="oldPassword"
                    label="原始密码"
                    rules={[
                        {
                            required: true,
                            message: '请输入原始密码!',
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password/>
                </Form.Item>

                {props.isEdit && (
                    <>
                        <Form.Item
                            name="password"
                            label="密码"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入原始密码!',
                                },
                            ]}
                            hasFeedback
                        >
                            <Input.Password/>
                        </Form.Item>
                        <Form.Item
                            name="passwordConfirm"
                            label="确认密码"
                            dependencies={['passwordConfirm']}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: '请输入确认密码',
                                },
                                ({getFieldValue}) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('两次密码不一致'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password/>
                        </Form.Item>
                    </>
                )}


                <Form.Item label="修改头像">
                    <Upload
                        name="file"
                        action="http://up-z2.qiniup.com/"
                        listType="picture-card"
                        showUploadList={false}
                        beforeUpload={beforeUpload}
                        onChange={handleChange}
                        data={uploadData}
                    >
                        {imageUrl ? (
                            <img
                                src={imageUrl}
                                alt="avatar"
                                style={{
                                    width: "100%",
                                    borderRadius: "8px"
                                }}
                            />
                        ) : (
                            uploadButton
                        )}
                    </Upload>
                </Form.Item>

                <Form.Item
                    label="签名"
                    name="signature"
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="公司 学校"
                    name="company"
                >
                    <Input/>
                </Form.Item>

                <Form.Item label="个人介绍" name="introduce">
                    <TextArea rows={4}/>
                </Form.Item>

                <Form.Item name="isAdmin" label="设置管理员" valuePropName="checked">
                    <Switch checked={isAdmin} onChange={handleAdmin}/>
                </Form.Item>

                <Form.Item label="性别" name="sex">
                    <Select className="sex-input" allowClear={true} disabled={false} placeholder={sex}>
                        <Select.Option value={1}>男</Select.Option>
                        <Select.Option value={0}>女</Select.Option>
                    </Select>
                </Form.Item>


                <Form.Item
                    wrapperCol={{
                        offset: 2,
                        span: 10,
                    }}
                >
                    <Button type="primary" htmlType="submit" className={'submit-button'}>
                        更新
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};
export default App;
