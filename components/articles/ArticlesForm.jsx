import React, {useEffect} from 'react';
import {Breadcrumb, Button, Form, Input, message} from 'antd';
import {createArticle, fetchArticle, updateArticle} from "../../src/api/articles.js";
import {useNavigate, useParams} from "react-router-dom";
import {BookOutlined, EditOutlined, HomeOutlined, PlusCircleOutlined, UserOutlined} from "@ant-design/icons";

const rules = {
    title: [{required: true, message: "请填写文章标题!"}],
    content: [{required: true, message: "请填写内容!"}]
}

const App = (props) => {
    const params = useParams();
    const navigate = useNavigate();
    const [formData] = Form.useForm();
    const {id} = useParams();
    const init = async () => {
        const res = await fetchArticle(params.id)
        formData.setFieldsValue(res.data.article)
    }

    useEffect(() => {
        if (props.isEdit) {
            init().then()
        }
    }, [id])


    const onFinish = async (v) => {
        let res
        if (props.isEdit) {
            res = await updateArticle(params.id, v)
        } else {
            res = await createArticle(v)
        }
        if (res.code !== 200) {
            return message.error(res.message)
        }
        message.success(res.message)
        navigate("/articles")
    }

    return (<>
        <Breadcrumb
            style={{marginBottom: 15}}
            items={[
                {
                    href: '/',
                    title: <HomeOutlined/>,

                },
                {
                    href: '/articles',
                    title: (
                        <>
                            <BookOutlined/>
                            <span>文章列表</span>
                        </>
                    ),
                },
                props.isEdit ?
                    {
                        href: `/articles/edit/${params.id}`,
                        title: (
                            <>
                                <EditOutlined />
                                <span>文章编辑</span>
                            </>
                        ),
                    } : {
                        href: '/articles/create',
                        title: (
                            <>
                                <PlusCircleOutlined />
                                <span>文章新增</span>
                            </>
                        ),
                    }
            ]}
        />
        <Form
            form={formData}
            name="wrap"
            labelCol={{
                flex: '110px',
            }}
            labelAlign="right"
            labelWrap={true}
            wrapperCol={{
                flex: 1,
            }}
            colon={false}
            style={{
                maxWidth: 900,
            }}
            onFinish={onFinish}
        >
            <Form.Item
                label="文章标题"
                name="title"
                rules={rules.title}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                label="文章内容"
                name="content"
                rules={rules.content}
            >
                <Input/>
            </Form.Item>

            <Form.Item label=" "
            >
                <Button htmlType="submit">
                    {props.isEdit ? "更新" : "新增"}
                </Button>
            </Form.Item>
        </Form>
    </>)

};
export default App