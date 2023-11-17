import {Link} from "react-router-dom";
import {Button, Col, Image, message, Space, Switch, Table, Tag, Tooltip} from "antd";
import Pagination from "../../../components/common/Pagination.jsx";
import React, {useEffect, useState} from "react";
import formatDate from "../../../utils/formatDate.js";
import DeleteButton from "../../../components/common/DeleteButton.jsx";
import {deleteCourse, fetchCourseList, updateCourse} from "../../api/courses.js";
import CountUp from "react-countup";
import {LikeOutlined, TeamOutlined} from "@ant-design/icons";
import CustomTooltip from "../../../components/common/CustomTooltip.jsx";

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

    //页面发生变化
    const onChange = (page, pageSize) => {
        setPageParams({
            currentPage: page,
            pageSize: pageSize
        })
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
            render: (id) => {
                const title = `ID:${id}`
                if (!id) {
                    return <a>0</a>;
                }
                return (
                    <CustomTooltip title={title}>
                        <a>{id}</a>
                    </CustomTooltip>
                );
            },
            align: 'center',
        },
        {
            title: '图片',
            dataIndex: 'image',
            key: 'image',
            align: 'center',
            render: (image, record) => (
                <Space size={12}>
                    {image ? (
                        <Tooltip title="查看">
                            <Image
                                placeholder={true}
                                width={80}
                                height={80}
                                style={{borderRadius: 10}}
                                src={image}
                            />
                        </Tooltip>
                    ) : (
                        <Tooltip title="无图片">
                            <Image
                                width={80}
                                height={80}
                                src="error"
                                fallback="data:image/png;base64,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"
                            />
                        </Tooltip>
                    )}
                </Space>
            ),
        },
        {
            title: '课程名',
            dataIndex: 'name',
            key: 'name',
            align: 'center',
            render: (name) => {
                const title = `所属分类:${name}`
                if (!name) {
                    return "无";
                }
                return (
                    <CustomTooltip title={title}>
                        {name}
                    </CustomTooltip>
                );
            },
        },
        {
            title: '所属分类',
            dataIndex: 'category',
            key: 'category',
            align: 'center',
            render: (category) => {
                const title = `所属分类:${category.name}`
                if (!category) {
                    return "无";
                }
                return (
                    <CustomTooltip title={title}>
                        {category.name}
                    </CustomTooltip>
                );
            },
        },
        {
            title: '所属老师',
            dataIndex: 'user',
            key: 'user',
            align: 'center',
            render: (user) => {
                const title = `所属老师:${user.username}`
                if (!user) {
                    return "无";
                }
                return (
                    <CustomTooltip title={title}>
                        <TeamOutlined style={{marginRight: 8}}/> {user.username}
                    </CustomTooltip>
                );
            },
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
            render: (_, record) => {
                const likesCount = record.likesCount || 0;
                const title = `点赞数: ${likesCount}`;
                return (
                    <CustomTooltip title={title}>
                        <Tag color={"geekblue"} bordered={false}>
                            <Col
                                span={30}
                                style={{
                                    width: 60,
                                    height: 30,
                                    display: "flex",
                                    justifyContent: "space-around",
                                    alignItems: "center"
                                }}
                            >
                                <LikeOutlined style={{flex: 1}}/>
                                <CountUp end={likesCount} duration={2} separator=","/>
                            </Col>
                        </Tag>
                    </CustomTooltip>
                );
            }
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
            align: 'center',
            render: (updatedAt) => {
                if (!updatedAt) {
                    return "无";
                }
                const formattedDate = formatDate(updatedAt);
                return (
                    <Tooltip title={`修改时间: ${formattedDate}`}>
                        {formattedDate}
                    </Tooltip>
                );
            }
        },
        {
            title: '操作',
            key: 'action',
            align: 'center',
            render: (_, record) => (
                <Space size="middle">
                    <Tooltip title={"编辑课程"}>
                        <Link to={`/courses/edit/${record.id}`}>
                            编辑
                        </Link>
                    </Tooltip>
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
                    <Tooltip title="查看章节视频">
                        <Link to={`/chapters?courseId=${record.id}`}>
                            查看
                        </Link>
                    </Tooltip>
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
            <Pagination total={pagination.total} onChange={onChange}></Pagination>
        </>
    )
}
export default App