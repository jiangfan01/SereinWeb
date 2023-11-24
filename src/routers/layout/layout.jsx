// eslint-disable-next-line no-unused-vars
import React, {useState} from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    HomeOutlined,
    AlignCenterOutlined,
    YoutubeOutlined,
    BookOutlined,
    FileTextOutlined, SettingOutlined, UserOutlined,
} from '@ant-design/icons';
import {Layout, Menu, Button, theme} from 'antd';
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import LogOut from "../../../components/layout/LogOut.jsx";

const {Header, Sider, Content} = Layout;
const App = () => {
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();
    const {
        token: {colorBgContainer},
    } = theme.useToken();

    function getItem(label, key, icon, children) {
        return {
            key,
            icon,
            children,
            label,
        };
    }


    // side路由
    const items = [
        getItem('首页', '/', <HomeOutlined/>),
        getItem('文章管理', '/articles', <BookOutlined/>),
        getItem('视频管理', '', <YoutubeOutlined/>, [
            getItem('分类管理', '/categories', <AlignCenterOutlined/>),
            getItem('课程管理', '/courses', <FileTextOutlined/>),
        ]),

        getItem('系统设置', 'user', <SettingOutlined/>, [
            getItem('用户管理', '/users', <UserOutlined/>),
        ]),

    ];
    // 路由跳转
    const onClick = (e) => {
        navigate(e.key);
    };
    return (
        <Layout style={{minHeight: '100vh', display: 'flex'}}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical"/>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} onClick={onClick} items={items}/>
            </Sider>
            <Layout style={{flex: 1}}>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                >
                    <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                fontSize: '16px',
                                width: 64,
                                height: 64,
                            }}
                        />
                        <LogOut />
                    </div>
                </Header>
                <Content
                    style={{
                        margin: '15px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        overflow: 'auto', // 添加overflow属性
                    }}
                >
                    <Outlet/>
                </Content>
            </Layout>
        </Layout>
    );
};
export default App;