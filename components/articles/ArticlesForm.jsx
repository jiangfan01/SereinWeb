import React, {useEffect, useState} from 'react';
import {Breadcrumb, Button, Form, Input, message} from 'antd';
import {createArticle, fetchArticle, updateArticle} from "../../src/api/articles.js";
import {Link, useNavigate, useParams} from "react-router-dom";
import {BookOutlined, EditOutlined, HomeOutlined, PlusCircleOutlined,} from "@ant-design/icons";
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import MarkdownIt from 'markdown-it';

const rules = {
    title: [{required: true, message: "请填写文章标题!"}],
    content: [{required: true, message: "请填写内容!"}]
}

const App = (props) => {
    const params = useParams();
    const navigate = useNavigate();
    const [formData] = Form.useForm();
    const {id} = useParams();
    const [contentHtml, setContentHtml] = useState("")
    const [content, setContent] = useState("")
    const init = async () => {
        const res = await fetchArticle(params.id)
        setContent(res.data.article.content)
        formData.setFieldsValue(res.data.article)
    }

    const onFinish = async (v) => {
        let res
        v = {
            ...v,
            content,
            contentHtml
        }
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

    const mdParser = new MarkdownIt(/* Markdown-it options */);

    const handleEditorChange = ({html, text}) => {
        setContentHtml(html)
        setContent(text)
    }

    const renderHTML = (text) => {
        // 模拟异步渲染Markdown
        return new Promise((resolve) => {
            resolve(mdParser.render(text))
        })
    }

    useEffect(() => {
        if (props.isEdit) {
            init().then()
        }
    }, [id])

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
                                <EditOutlined/>
                                <span>文章编辑</span>
                            </>
                        ),
                    } : {
                        href: '/articles/create',
                        title: (
                            <>
                                <PlusCircleOutlined/>
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

            <Form.Item
                label="文章内容"
                wrapperCol={{
                    // span: 6,
                    offset: 1,
                }}
            >
                <MdEditor value={content} style={{height: '400px', marginLeft: "0"}} renderHTML={renderHTML}
                          onChange={handleEditorChange}
                />
            </Form.Item>

            <Form.Item
                wrapperCol={{
                    span: 6,
                    offset: 3,
                }}
            >
                <Link to={`/show_article/${params.id}`}>
                    <Button size="large">查看HTML页面</Button>
                </Link>
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