import {Breadcrumb, Image, message, Space, Switch, Table, Tag, Tooltip} from "antd";
import {HomeOutlined, UserOutlined} from "@ant-design/icons";
import React, {useEffect, useState} from "react";
import CustomTooltip from "../../../components/common/CustomTooltip.jsx";
import formatDate from "../../../utils/formatDate.js";
import {Link} from "react-router-dom";
import DeleteButton from "../../../components/common/DeleteButton.jsx";
import {deleteUser, fetchUserList} from "../../api/user.js";
import SearchBox from "../../../components/common/SearchBox.jsx";
import Pagination from "../../../components/common/Pagination.jsx";

const App = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const [pagination, setPagination] = useState({})
    const [pageParams, setPageParams] = useState({
        currentPage: 1,
        pageSize: 10
    });

    const init = async () => {
        setLoading(true)
        const res = await fetchUserList(pageParams)
        setUsers(res.data.users)
        setPagination(res.data.pagination)
        setLoading(false)
    }

    const confirmDelete = async (id) => {
        await deleteUser(id)
    }

    const handleSearch = async (searchText) => {
        try {
            setLoading(true);
            const res = await fetchUserList({...pageParams, username: searchText});
            setUsers(res.data.users);
            setPagination(res.data.pagination);
            setLoading(false)
        } catch (error) {
            message.error('Search failed. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    const onChange = (page, pageSize) => {
        setPageParams({
            currentPage: page,
            pageSize: pageSize
        })
    }

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
            title: '用户名',
            dataIndex: 'username',
            key: 'username',
            align: 'center',
            render: (username) => {
                const otherTitle = `用户名:${username}`
                if (!username) {
                    return "无";
                }
                return (
                    <CustomTooltip title={otherTitle}>
                        {username}
                    </CustomTooltip>
                );
            },
        },
        {
            title: '头像',
            dataIndex: 'avatar',
            key: 'avatar',
            align: 'center',
            render: (avatar, record) => (
                <Space size={12}>
                    {avatar ? (
                        <Tooltip title="查看">
                            <Image
                                placeholder={true}
                                width={80}
                                height={80}
                                style={{borderRadius: 50}}
                                src={avatar}
                            />
                        </Tooltip>
                    ) : (
                        <Tooltip title="无图片">
                            <Image
                                width={80}
                                height={80}
                                src="error"
                                style={{borderRadius: 50}}
                                fallback="data:image/png;base64,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"
                            />
                        </Tooltip>
                    )}
                </Space>
            ),
        },
        {
            title: '性别',
            dataIndex: 'sex',
            key: 'sex',
            align: 'sex',
            render: (sex) => {
                const genderText = sex === 1 ? '男' : sex === 0 ? '女' : '无';
                const otherTitle = `性别:${genderText}`
                if (!genderText) {
                    return "无";
                }
                return (
                    sex ? <CustomTooltip title={otherTitle}>
                            <Tag bordered={false} color="processing">
                                {genderText}

                            </Tag>
                        </CustomTooltip>
                        : <CustomTooltip title={otherTitle}>
                            <Tag bordered={false} color="error">
                                {genderText}
                            </Tag>
                        </CustomTooltip>
                )
                    ;
            },
        },
        {
            title: '邮箱',
            dataIndex: 'email',
            key: 'email',
            align: 'center',
            render: (email) => {
                const otherTitle = `邮箱地址:${email}`
                if (!email) {
                    return "无";
                }
                return (
                    <CustomTooltip title={otherTitle}>
                        {email}
                    </CustomTooltip>
                );
            },
        },
        {
            title: '公司/学校',
            dataIndex: 'company',
            key: 'company',
            render: (company) => {
                const title = `公司/学校:${company}`
                if (!company) {
                    return "无";
                }
                return (
                    <CustomTooltip title={title}>
                        {company}
                    </CustomTooltip>
                );
            },
            align: 'center',
        },
        {
            title: '个人签名',
            dataIndex: 'signature',
            key: 'signature',
            render: (signature) => {
                const title = `公司/学校:${signature}`
                if (!signature) {
                    return "无";
                }
                return (
                    <CustomTooltip title={title}>
                        {signature}
                    </CustomTooltip>
                );
            },
            align: 'center',
        },
        {
            title: '是否管理员',
            dataIndex: 'isAdmin',
            key: 'isAdmin',
            align: 'center',
            render: (_, record) => (
                <Switch defaultChecked={record.isAdmin || false} disabled={true}/>
            ),
        },
        {
            title: '创建时间',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (createdAt => formatDate(createdAt)),
            align: 'center',
        },
        {
            title: '修改时间',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
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
            },
            align: 'center',
        },
        {
            title: '操作',
            key: 'action',
            align: 'center',
            render: (_, record) => (
                <Space size="middle">
                    <CustomTooltip title={"编辑"}>
                        <Link to={`/users/edit/${record.id}`}>
                            编辑
                        </Link>
                    </CustomTooltip>
                    <DeleteButton onConfirm={confirmDelete} props={{init}} id={record.id}/>
                </Space>
            ),
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
                        href: '/users',
                        title: (
                            <>
                                <UserOutlined/>
                                <span>用户列表</span>
                            </>
                        ),
                    },

                ]}
            />
            <div style={{float: "right"}}>
                <SearchBox onChange={handleSearch} loading={loading}></SearchBox>
            </div>
            <Table columns={columns}
                   dataSource={users.map(user => ({
                       ...user, key: user.id
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