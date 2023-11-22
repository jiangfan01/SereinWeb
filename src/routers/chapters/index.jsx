import React, {useEffect, useState} from 'react';
import {Breadcrumb, Button, InputNumber, message, Space, Table,} from 'antd';
import DeleteButton from "../../../components/common/DeleteButton.jsx";
import {Link, useParams, useSearchParams} from "react-router-dom";
import {deleteChapter, fetchChapterList, updateChapter} from "../../api/chapters.js";
import Pagination from "../../../components/common/Pagination.jsx";
import CustomTooltip from "../../../components/common/CustomTooltip.jsx";
import formatDate from "../../../utils/formatDate.js";
import SearchBox from "../../../components/common/SearchBox.jsx";
import {BarcodeOutlined, FileTextOutlined, HomeOutlined, YoutubeOutlined} from "@ant-design/icons";


const App = () => {
    const params = useParams()
    const [loading, setLoading] = useState(false)
    const [searchParams] = useSearchParams();
    const [chapters, setChapters] = useState([])
    const [pagination, setPagination] = useState({})
    const courseId = searchParams.get("courseId")
    const [pageParams, setPageParams] = useState({
        courseId,
        pageSize: 10,
        page: 1
    });

    const init = async () => {
        setLoading(true)
        const res = await fetchChapterList(pageParams)
        if (res.code !== 200) {
            return message.error(res.message)
        }
        setChapters(res.data.chapters)
        setPagination(res.data.pagination)
        setLoading(false)
    }

    const sortChange = async (value, e) => {
        const sort = e.target.value
        try {
            const res = await updateChapter(value.id, {sort});
            if (res.code !== 200) {
                return message.error(res.message)
            }
            message.success(res.message);
            await init();
        } catch (error) {
            message.error('排序更新失败');
        }
    }

    const onChange = (page, pageSize) => {
        setPageParams({
            ...pageParams,
            courseId,
            currentPage: page,
            pageSize
        })
    }

    const handleSearch = async (searchText) => {
        try {
            setLoading(true);
            const res = await fetchChapterList({...pageParams, title: searchText});
            setChapters(res.data.chapters);
            setPagination(res.data.pagination);
            setLoading(false)
        } catch (error) {
            message.error('Search failed. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    const confirmDelete = async (id) => {
        return await deleteChapter(id);
    };

    useEffect(() => {
        init().then()
    }, [pageParams])

    const columns = [
        {
            title: '编号',
            dataIndex: 'id',
            key: 'id',
            align: 'center',
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
        },
        {
            title: '章节标题',
            dataIndex: 'title',
            key: 'title',
            align: 'center',
            render: (title) => {
                const otherTitle = `章节标题:${title}`
                if (!title) {
                    return "无";
                }
                return (
                    <CustomTooltip title={otherTitle}>
                        {title}
                    </CustomTooltip>
                );
            },
        },
        {
            title: '视频地址',
            dataIndex: 'video',
            key: 'video',
            align: 'center',
            render: (video) => {
                const title = `视频地址:${video}`

                if (!video) {
                    return "无";
                }
                return (
                    <CustomTooltip title={title}>
                        <span className="custom-tooltip" >{video}</span>
                    </CustomTooltip>
                );
            },
        },
        {
            title: '排序',
            dataIndex: 'sort',
            key: 'sort',
            align: 'center',
            render: (sort, record) => (
                <InputNumber
                    min={1}
                    max={999}
                    defaultValue={sort}
                    size={"small"}
                    onPressEnter={(e) => sortChange(record, e)}
                />
            ),
        },
        {
            title: '所属课程',
            dataIndex: 'course',
            key: 'course',
            align: 'center',
            render: (course) => {
                if (!course || !course.name) {
                    return "无";
                }

                const title = `所属课程: ${course.name}`;
                return (
                    <CustomTooltip title={title}>
                        {course.name}
                    </CustomTooltip>
                );
            },
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
                    <CustomTooltip title={`修改时间: ${formattedDate}`}>
                        {formattedDate}
                    </CustomTooltip>
                );
            }
        },
        {
            title: '操作',
            key: 'action',
            align: 'center',
            render: (_, record) => {
                return (
                    <>
                        <Space size="middle">
                            <CustomTooltip title={"编辑"}>
                                <Link to={`/chapters/edit/${record.id}`}> 编辑</Link>
                            </CustomTooltip>
                            <DeleteButton onConfirm={confirmDelete} props={{init}} id={record.id}/>
                        </Space>
                    </>
                )
            },
        },
    ];

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
                ]}
            />
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <Link to={`/chapters/create`}><Button style={{marginBottom: 10}}>新增一篇章节</Button></Link>
                <SearchBox onChange={handleSearch} loading={loading}/>
            </div>
            <Table columns={columns}
                   dataSource={chapters.map(chapter => ({
                       ...chapter, key: chapter.id
                   }))}
                   loading={loading}
                   pagination={false}
            />
            <Pagination total={pagination.total} onChange={onChange}></Pagination>
        </>
    )
}
export default App;