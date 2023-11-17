import React, {useEffect, useState} from 'react';
import {Button, Input, InputNumber, message, Popconfirm, Space, Table,} from 'antd';
import {deleteCategory, fetchCategoryList, updateCategory} from "../../../api/categories.js";
import formatDate from "../../../utils/formatDate.js";
import {Link} from "react-router-dom";
import Pagination from "../../../components/common/Pagination.jsx";
import DeleteButton from "../../../components/common/DeleteButton.jsx";
import {deleteArticle} from "../../../api/articles.js";

const App = () => {
    const [pagination, setPagination] = useState({});
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pageParams, setPageParams] = useState({
        currentPage: 1,
        pageSize: 10
    });

    const init = async () => {
        setLoading(true)
        const res = await fetchCategoryList(pageParams)
        setCategories(res.data.categories)
        setPagination(res.data.pagination)
        setLoading(false)
        if (res.code !== 200) {
            message.error(res.message)
        }
    }

    //页面发生变化
    const onChange = (page, pageSize) => {
        setPageParams({
            currentPage: page,
            pageSize: pageSize
        })
    }

    const confirmDelete = async (id) => {
        return await deleteCategory(id);
    };

    const sortChange = async (id, e) => {
        const sort = e.target.value;
        try {
            const res = await updateCategory(id, {sort});
            message.success(res.message);
            await init();
        } catch (error) {
            message.error('排序更新失败');
        }
    }

    const nameChange = async (id, e) => {
        const name = e.target.value;
        try {
            const res = await updateCategory(id, {name});
            message.success(res.message);
            await init();
        } catch (error) {
            message.error('排序更新失败');
        }
    }

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
            title: '分类名',
            dataIndex: 'name',
            key: 'name',
            align: 'center',
            render: (sort, record) => (
                <Input
                    min={1}
                    max={999}
                    defaultValue={sort}
                    onPressEnter={(e) => nameChange(record.id, e)}
                />
            ),
        },
        {
            title: '排序',
            dataIndex: 'sort',
            key: 'sort',
            render: (sort, record) => (
                <InputNumber
                    min={1}
                    max={999}
                    defaultValue={sort}
                    size={"small"}
                    onPressEnter={(e) => sortChange(record.id, e)}
                />
            ),
            align: 'center',
        },
        {
            title: '创建时间',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (createdAt) => formatDate(createdAt),
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
                    <DeleteButton onConfirm={confirmDelete} props={{init}} id={record.id}></DeleteButton>
                </Space>
            ),
        },
    ];


    return (<>
            <Link to={`/categories/create`}><Button style={{marginBottom: 10}}>新增一个分类</Button></Link>
            <Table columns={columns}
                   dataSource={categories.map(category => ({
                       ...category, key: category.id
                   }))}
                   loading={loading}
                   pagination={false}>
            </Table>
            <Pagination total={pagination.total} onChange={onChange}></Pagination>
        </>
    )
}
export default App;