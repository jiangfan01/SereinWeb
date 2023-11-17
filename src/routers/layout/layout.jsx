// eslint-disable-next-line no-unused-vars
import React, {useState} from 'react';
import {
    FileOutlined,
    TeamOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    HomeOutlined,
    AlignCenterOutlined,
    YoutubeOutlined,
    BookOutlined,
    FileTextOutlined,
} from '@ant-design/icons';
import {Layout, Menu, Button, theme} from 'antd';
import {Outlet, useLocation, useNavigate} from "react-router-dom";

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
        getItem('Team', 'sub2', <TeamOutlined/>, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
        getItem('Files', '9', <FileOutlined/>),
    ];
    // 路由跳转
    const onClick = (e) => {
        navigate(e.key);
    };
    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical"/>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    onClick={onClick}
                    items={items}
                />
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                >
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
                </Header>
                <Content
                    style={{
                        margin: '15px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                    }}
                >
                    {/*路由出口*/}
                    <Outlet/>
                </Content>
            </Layout>
        </Layout>
    );
};
export default App;