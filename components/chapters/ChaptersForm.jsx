import {
    BarcodeOutlined, EditOutlined,
    FileTextOutlined,
    HomeOutlined, PlusCircleOutlined,
    UploadOutlined,
    UserOutlined,
    YoutubeOutlined
} from '@ant-design/icons';
import React, {useEffect, useState} from 'react';
import {
    Breadcrumb,
    Button,
    Form, Input, InputNumber, message,
    Select,
    Space,
    Upload,
} from 'antd';
import {v4 as uuidv4} from 'uuid';
import {fetchCourseList,} from "../../src/api/courses.js";
import {useNavigate, useParams} from "react-router-dom";
import {uploadToken} from "../../src/api/upload.js";
import {createChapter, fetchChapter, updateChapter} from "../../src/api/chapters.js";

const {Option} = Select;

const App = (props) => {
    const navigate = useNavigate();
    const params = useParams();
    const [loading, setLoading] = useState(false)
    const [videoUrl, setVideoUrl] = useState("");
    const [courses, setCourses] = useState([])
    const [formData] = Form.useForm();
    const [uploadData, setUploadData] = useState({
        token: "",
        key: ""
    });


    /*
    * 初始化分类和老师
    * */
    const init = async () => {
        try {
            const [uploadRes, coursesRes] = await Promise.all([
                uploadToken(),
                fetchCourseList()
            ]);
            if (coursesRes.data && coursesRes.data.courses) {
                setCourses(coursesRes.data.courses);
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
        const res = await fetchChapter(params.id)
        if (res.code !== 200) {
            return message.error(res.message)
        }
        formData.setFieldsValue(res.data.chapter)
    }

    /*
    * 表单提交
    * */
    const onFinish = async (values) => {
        let res
        values = {
            ...values,
            video: videoUrl
        }
        if (props.isEdit) {
            res = await updateChapter(params.id, values)
        } else {
            res = await createChapter(values)
        }
        if (res.code !== 200) {
            return message.error(res.message)
        }
        message.success(res.message)
        navigate("/chapters")
    };


    /*
    * 上传视频之前
    * */
    const beforeUpload = (file) => {
        // Check file type and size
        const isVideo = file.type.startsWith("video/");
        if (!isVideo) {
            message.error("你只能上传视频文件!");
            return false;
        }

        const isLt100M = file.size / 1024 / 1024 < 10000;
        if (!isLt100M) {
            message.error("视频文件必须小于 100MB!");
            return false;
        }

        const ext = file.type.split("/")[1];
        setUploadData({
            ...uploadData,
            key: `${uuidv4()}.${ext}`
        });
    };

    const handleVideoChange = (info) => {
        if (info.file.status === "uploading") {
            setLoading(true);
            return;
        }
        if (info.file.status === "done") {
            setVideoUrl(`http://s49b16nfk.hn-bkt.clouddn.com/${info.file.response.key}`);
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
                    {
                        href: '/chapters',
                        title: (
                            <>
                                <BarcodeOutlined/>
                                <span>章节列表</span>
                            </>
                        ),
                    },
                    props.isEdit ? {
                        href: `/chapters/edit/${params.id}`,
                        title: (
                            <>
                                <EditOutlined/>
                                <span>编辑章节</span>
                            </>
                        ),
                    } : {
                        href: '/chapters/create',
                        title: (
                            <>
                                <PlusCircleOutlined/>
                                <span>新增章节</span>
                            </>
                        ),
                    },
                ]}
            />
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
                    label="章节标题"
                    name="title"
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    name="courseId"
                    label="所属课程"
                >
                    <Select placeholder="选择一个课程！">
                        {courses.map(course => (
                            <Option value={course.id} key={course.id}>{course.name}</Option>
                        ))}
                    </Select>
                </Form.Item>

                {props.isEdit ? null : (
                    <Form.Item
                        label="排序"
                        name="sort"
                    >
                        <InputNumber/>
                    </Form.Item>
                )}


                <Form.Item label="更换视频">
                    <Upload {...props}
                            name="file"
                            className="avatar-uploader"
                            action="https://up-z2.qiniup.com/"
                            beforeUpload={beforeUpload}
                            onChange={handleVideoChange}
                            data={uploadData}>
                        <Button icon={<UploadOutlined/>}>上传视频</Button>
                    </Upload>
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