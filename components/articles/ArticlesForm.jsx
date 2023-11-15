import React, {useEffect} from 'react';
import {Button, Form, Input, message} from 'antd';
import {createArticle, fetchArticle, updateArticle} from "../../api/articles.js";
import {useNavigate, useParams} from "react-router-dom";

const rules = {
    title: [{required: true, message: "请填写文章标题!"}],
    content: [{required: true, message: "请填写内容!"}]
}
const App = (props) => {
    const navigate = useNavigate();
    const params = useParams();
    const [formData] = Form.useForm();
    const init = async () => {
        const res = await fetchArticle(params.id)
        formData.setFieldsValue(res.data.article)
    }

    useEffect(() => {
        if (props.isEdit) {
            init().then()
        }
    }, [])


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
export default App;