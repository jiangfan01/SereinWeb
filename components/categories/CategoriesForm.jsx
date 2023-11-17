import React, {useEffect} from 'react';
import {Button, Form, Input, message} from 'antd';
import {createCategory, fetchCategory, updateCategory} from "../../src/api/categories.js";
import {useNavigate, useParams} from "react-router-dom";

const rules = {
    name: [{required: true, message: "请填写分类名!"}],
    sort: [{required: true, message: "请填写排序!"}],
}
const App = (props) => {
    const navigate = useNavigate();
    const params = useParams();
    const [formData] = Form.useForm();
    const init = async () => {
        const res = await fetchCategory(params.id)
        formData.setFieldsValue(res.data.category)
    }

    useEffect(() => {
        if (props.isEdit) {
            init().then()
        }
    }, [])


    const onFinish = async (v) => {
        let res
        if (props.isEdit) {
            res = await updateCategory(params.id, v)
        } else {
            res = await createCategory(v)
        }
        if (res.code !== 200) {
            return message.error(res.message)
        }
        message.success(res.message)
        navigate("/categories")
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
                label="分类名"
                name="name"
                rules={rules.name}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                label="排序"
                name="sort"
                rules={rules.sort}
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