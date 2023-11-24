import {Avatar, FloatButton, message, Modal, Segmented, Tooltip} from "antd";
import React, {useEffect, useState} from "react";
import {CloseCircleTwoTone, UserOutlined} from "@ant-design/icons";
import {getToken, removeToken} from "../../utils/auth.js";
import {getInfoMe} from "../../src/api/auth.js";
import {useNavigate} from "react-router-dom";

const App = () => {

    const [avatar, setAvatar] = useState("")
    const [username, setUsername] = useState("")
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const showModal = () => {
        setOpen(true);
    };
    const hideModal = () => {
        setOpen(false);
    };

    const logOut = async () => {
        setOpen(false);
        removeToken()
        message.success("退出成功")
        navigate('/login');
    }

    const init = async () => {
        const token = getToken()
        const res = await getInfoMe({token: token})
        if (res.code !== 200) {
            return message.error(res.message)
        }
        setAvatar(res.data.user.avatar)
        setUsername(res.data.user.username)
    }

    useEffect(() => {
        init().then()
    }, [])

    return (
        <>
            <div style={{display: "flex", alignItems: "center"}}>
                <Tooltip title="个人信息">

                    <Segmented
                        size={"small"}
                        style={{
                            marginRight: 20
                        }}
                        options={[
                            {
                                label: (
                                    <div
                                        style={{
                                            padding: 4,
                                        }}
                                    >
                                        {avatar ? <Avatar src={avatar}/> :
                                            <Avatar size="small" icon={<UserOutlined/>}/>}
                                        <div>{username}</div>
                                    </div>
                                ),
                                value: 'user1',
                            },
                        ]}/>
                </Tooltip>


                <FloatButton
                    icon={<CloseCircleTwoTone/>}
                    type="primary"
                    tooltip={"退出登录"}
                    style={{
                        bottom: 54,
                        right: 20,
                        width: 45,
                        height: 45
                    }}
                    onClick={showModal}
                >
                </FloatButton>
                <Modal
                    title="提示"
                    open={open}
                    onOk={logOut}
                    centered={true}
                    onCancel={hideModal}
                    okText="确认"
                    cancelText="取消"
                    keyboard={true}
                    width={300}
                >
                    <p>确认退出？</p>
                </Modal>
            </div>
        </>
    )
}
export default App