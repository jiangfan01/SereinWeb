import {Link} from "react-router-dom";
import {Button, Col, Image, message, Space, Switch, Table, Tag, Tooltip} from "antd";
import Pagination from "../../../components/common/Pagination.jsx";
import React, {useEffect, useState} from "react";
import formatDate from "../../../utils/formatDate.js";
import DeleteButton from "../../../components/common/DeleteButton.jsx";
import {deleteCourse, fetchCourseList, updateCourse} from "../../../api/courses.js";
import CountUp from "react-countup";
import {LikeOutlined, TeamOutlined} from "@ant-design/icons";

const App = () => {
    const [loading, setLoading] = useState(false)
    const [courses, setCourses] = useState([])
    const [pagination, setPagination] = useState({})
    const [pageParams, setPageParams] = useState({
        currentPage: 1,
        pageSize: 10
    });
    const init = async () => {
        setLoading(true)
        const res = await fetchCourseList(pageParams)
        setCourses(res.data.courses)
        setPagination(res.data.pagination)
        setLoading(false)
        if (res.code !== 200) {
            message.error(res.message)
        }
    }

    const recommendedChange = async (record, e) => {
        const res = await updateCourse(record.id, {
            categoryId: record.categoryId,
            userId: record.userId,
            recommended: e
        })
        if (res.code !== 200) {
            return message.error(res.message)
        }
        message.success(res.message)
        init().then()
    }
    const introductoryChange = async (record, e) => {
        const res = await updateCourse(record.id, {
            categoryId: record.categoryId,
            userId: record.userId,
            introductory: e
        })
        if (res.code !== 200) {
            return message.error(res.message)
        }
        message.success(res.message)
        init().then()
    }

    const confirmDelete = async (id) => {
        return await deleteCourse(id);
    };

    useEffect(() => {
        init().then()
    }, [pageParams])


    const columns = [
        {
            title: '编号',
            dataIndex: 'id',
            key: 'id',
            render: (text) => <a>{text}</a>,
            align: 'center',
        },
        {
            title: '图片',
            dataIndex: 'image',
            key: 'image',
            align: 'center',
            render: (_, record) => (
                <Space size={12}>
                    <Tooltip title="查看">
                        <Image
                            placeholder={true}
                            width={80}
                            height={80}
                            style={{borderRadius: 10}}
                            alt="查看"
                            src={record.image}
                        />
                    </Tooltip>
                </Space>
            ),
        },
        {
            title: '课程名',
            dataIndex: 'name',
            key: 'name',
            align: 'center',
        },
        {
            title: '所属分类',
            dataIndex: 'category',
            key: 'category',
            align: 'center',
            render: (category) => category.name,
        },
        {
            title: '所属老师',
            dataIndex: 'user',
            key: 'user',
            align: 'center',
            render: (user) => (
                <>
                    <TeamOutlined style={{marginRight: 8}}/>
                    {user.username}
                </>
            ),
        },
        {
            title: '推荐',
            dataIndex: 'recommended',
            key: 'recommended',
            align: 'center',
            render: (_, record) => (
                <Switch defaultChecked={record.recommended || false} onChange={(e) => recommendedChange(record, e)}/>
            ),
        },
        {
            title: '人气',
            dataIndex: 'introductory',
            key: 'introductory',
            align: 'center',
            render: (_, record) => (
                <Switch defaultChecked={record.introductory || false} onChange={(e) => introductoryChange(record, e)}/>
            ),
        },
        {
            title: '点赞数',
            dataIndex: 'likesCount',
            key: 'likesCount',
            align: 'center',
            render: (_, record) => (
                <Tag color={"geekblue"} bordered={false}>
                    <Col span={30}
                         style={{
                             width: 60,
                             height: 30,
                             display: "flex",
                             justifyContent: "space-around",
                             alignItems: "center"
                         }}
                    >
                        <LikeOutlined style={{flex: 1}}/>
                        <CountUp end={record.likesCount || 0}
                                 duration={2}
                                 separator=","/>
                    </Col>
                </Tag>
            ),
        },
        {
            title: '创建时间',
            dataIndex: 'createdAt',
            key: 'createdAt',
            align: 'center',
        },
        {
            title: '修改时间',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
            render: (updatedAt) => formatDate(updatedAt),
            align: 'center',
        },
        {
            title: '操作',
            key: 'action',
            align: 'center',
            render: (_, record) => (
                <Space size="middle">
                    <Link to={`/courses/edit/${record.id}`}>
                        编辑
                    </Link>
                    <DeleteButton onConfirm={confirmDelete} props={{init}} id={record.id}/>
                </Space>
            ),
        },
        {
            title: '章节视频',
            key: 'action',
            align: 'center',
            render: (_, record) => (
                <Space size="middle">
                    <Link to={`/courses/edit/${record.id}`}>
                        查看
                    </Link>
                </Space>
            ),
        },
    ];

    return (<>
            <Link to={`/courses/create`}><Button style={{marginBottom: 10}}>新增一篇课程</Button></Link>
            <Table
                columns={columns}
                dataSource={courses.map(course => ({
                    ...course, key: course.id
                }))}
                loading={loading}
                pagination={false}
            >
            </Table>
            <Pagination></Pagination>
        </>
    )
}
export default App