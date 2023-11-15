import React, {useEffect, useState} from 'react';
import {Button, message, Popconfirm, Space, Table,} from 'antd';
import {deleteArticle, fetchArticleList} from "../../../api/articles.js";
import formatDate from "../../../utils/formatDate.js";
import {Link} from "react-router-dom";
import Pagination from "../../../components/layout/Pagination.jsx";
import DeleteButton from "../../../components/common/DeleteButton.jsx";

const App = () => {
    const [pagination, setPagination] = useState({});
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pageParams, setPageParams] = useState({
        currentPage: 1,
        pageSize: 10,
    });

    const init = async () => {
        setLoading(true);
        const res = await fetchArticleList(pageParams);
        setArticles(res.data.articles);
        setPagination(res.data.pagination);
        setLoading(false);
    };

    useEffect(() => {
        init().then();
    }, [pageParams]);

    //页面发生变化
    const onChange = (page, pageSize) => {
        setPageParams({
            currentPage: page,
            pageSize: pageSize,
        });
    };

    const confirmDelete = async (id) => {
        return await deleteArticle(id);
    };


    const columns = [
        {
            title: '编号',
            dataIndex: 'id',
            key: 'id',
            render: (text) => <a>{text}</a>,
            align: 'center',
        },
        {
            title: '文章标题',
            dataIndex: 'title',
            key: 'title',
            align: 'center',
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
                    <Link to={`/articles/edit/${record.id}`}>
                        编辑
                    </Link>
                    <DeleteButton onConfirm={confirmDelete} props={{ init }} id={record.id} />
                </Space>
            ),
        },
    ];


    return (<>
            <Link to={`/articles/create`}><Button style={{marginBottom: 10}}>新增一篇文章</Button></Link>
            <Table columns={columns}
                   dataSource={articles.map(article => ({
                       ...article, key: article.id
                   }))}
                   loading={loading}
                   pagination={false}
            >
            </Table>
            <Pagination total={pagination.total} onChange={onChange}></Pagination>
        </>
    )
}
export default App;