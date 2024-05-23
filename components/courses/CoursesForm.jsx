import {
    EditOutlined,
    FileTextOutlined,
    HomeOutlined,
    LoadingOutlined, PlusCircleOutlined,
    PlusOutlined,
    YoutubeOutlined
} from '@ant-design/icons';
import React, {useEffect, useState} from 'react';
import {
    Breadcrumb,
    Button,
    Form, Input, message,
    Select,
    Space, Switch,
    Upload,
} from 'antd';
import {fetchCategoryList} from "../../src/api/categories.js";
import {v4 as uuidv4} from 'uuid';
import {fetchUserList} from "../../src/api/user.js";
import {createCourse, fetchCourse, updateCourse} from "../../src/api/courses.js";
import {useNavigate, useParams} from "react-router-dom";
import TextArea from "antd/es/input/TextArea.js";
import {uploadToken} from "../../src/api/upload.js";

const {Option} = Select;

const App = (props) => {
    console.log(3213, props)
    const navigate = useNavigate();
    const params = useParams();
    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState([]);
    const [users, setUsers] = useState([]);
    const [imageUrl, setImageUrl] = useState("");
    const [status, setStatus] = useState()
    const [formData] = Form.useForm();
    const rules = {
        title: [{required: true, message: "请填写文章标题!"}],
        content: [{required: true, message: "请填写文章内容!"}]
    }
    const [uploadData, setUploadData] = useState({
        token: "",
        key: ""
    });


    /*
    * 初始化分类和老师
    * */
    const init = async () => {
        try {
            const [userRes, categoryRes, uploadRes] = await Promise.all([
                fetchUserList(),
                fetchCategoryList(),
                uploadToken()
            ]);

            if (userRes.data && userRes.data.users) {
                setUsers(userRes.data.users);
            }

            if (categoryRes.data && categoryRes.data.categories) {
                setCategories(categoryRes.data.categories);
            }

            if (uploadRes.data && uploadRes.data.uploadToken) {
                setUploadData({
                    ...uploadData,
                    token: uploadRes.data.uploadToken
                });
            }
        } catch (error) {
            console.error("错误的数据请求:", error);
        }
    }

    /**
     * 编辑时，读取当前课程
     */
    const fetchData = async () => {
        const res = await fetchCourse(params.id)
        setImageUrl(res.data.course.image)
        if (res.code !== 200) {
            return message.error(res.message)
        }
        formData.setFieldsValue(res.data.course)
    }

    /*
    * 表单提交
    * */
    const onFinish = async (values) => {
        let res
        values = {
            ...values,
            image: imageUrl,
            recommended: values.recommended || false,
            introductory: values.introductory || false,
        }
        if (props.isEdit) {
            res = await updateCourse(params.id, values)
        } else {
            res = await createCourse(values)
        }
        if (res.code !== 200) {
            return message.error(res.message)
        }
        navigate("/courses")
        message.success(res.message)
    };


    /*
    * 上传按钮
    * */
    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined/> : <PlusOutlined/>}
            <div
                style={{
                    marginTop: 8,
                }}
            >
                上传课程图片
            </div>
        </div>
    );

    /*
    * 上传图片之前
    * */
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

    const handleChange = (info) => {
        if (info.file.status === "uploading") {
            setLoading(true);
            return;
        }
        if (info.file.status === "done") {
            setImageUrl(`http://s5ni51avc.hn-bkt.clouddn.com/${info.file.response.key}`)
            setLoading(false);
        }
    };

    useEffect(() => {
        if (props.isEdit) {
            fetchData().then()
        }
        init().then()
    }, [])


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
                        href: '',
                        title: (
                            <>
                                <YoutubeOutlined/>
                                <span>视频管理</span>
                            </>
                        ),
                    },
                    {
                        href: '/courses',
                        title: (
                            <>
                                <FileTextOutlined/>
                                <span>课程列表</span>
                            </>
                        ),
                    },
                    props.isEdit ? {
                        href: `/courses/edit${params.id}`,
                        title: (
                            <>
                                <EditOutlined/>
                                <span>课程编辑</span>
                            </>
                        ),
                    } : {
                        href: `/courses/create`,
                        title: (
                            <>
                                <PlusCircleOutlined/>
                                <span>课程新增</span>
                            </>
                        ),
                    }
                ]}
            >
            </Breadcrumb>
            <Form
                form={formData}
                name="wrap"
                onFinish={onFinish}
                labelCol={{
                    flex: '110px',
                }}
                style={{
                    maxWidth: 900,
                }}
            >

                <Form.Item
                    label="课程名"
                    name="name"
                    rules={rules.name}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    name="categoryId"
                    label="所属分类"
                >
                    <Select placeholder="选择一个分类！">
                        {categories.map(category => (
                            <Option value={category.id} key={category.id}>{category.name}</Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    name="userId"
                    label="所属老师"
                >
                    <Select placeholder="选择一个老师！">
                        {users.map(user => (
                            <Option value={user.id} key={user.id}>{user.username}</Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item label="上传图片">
                    <Upload
                        style={{borderRadius: 10}}
                        name="file"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        action="https://up-z2.qiniup.com/"
                        beforeUpload={beforeUpload}
                        onChange={handleChange}
                        data={uploadData}
                    >
                        {imageUrl ? (
                            <img
                                src={imageUrl}
                                alt="avatar"
                                style={{
                                    width: '100%',
                                }}
                            />
                        ) : (
                            uploadButton
                        )}
                    </Upload>
                </Form.Item>

                {props.isEdit ? null : (
                    <>
                        <Form.Item
                            label="推荐课程"
                            name="recommended"
                            valuePropName="checked"
                        >
                            <Switch/>
                        </Form.Item>

                        <Form.Item
                            label="介绍"
                            name="introductory"
                            valuePropName="checked"
                        >
                            <Switch/>
                        </Form.Item>
                    </>
                )}

                <Form.Item
                    label="内容"
                    name="content"
                    rules={rules.content}
                >
                    <TextArea rows={4}/>
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        span: 6,
                        offset: 3,
                    }}
                >
                    <Space>
                        <Button htmlType="submit">
                            {props.isEdit ? "更新" : "新增"}
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </>
    )
};
export default App;