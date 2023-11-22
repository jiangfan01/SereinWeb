import SexChart from "../../../components/charts/SexChart.jsx";
import CourseChart from "../../../components/charts/CourseChart.jsx";
import {Breadcrumb, Card} from "antd";
import {HomeOutlined} from "@ant-design/icons";
import React from "react";
import ArticlesChart from "../../../components/charts/ArticlesChart.jsx";
import UserChart from "../../../components/charts/UserChart.jsx";

const App = () => {

    return (
        <>
            <Breadcrumb
                style={{marginBottom: 15}}
                items={[
                    {
                        href: '/',
                        title: <HomeOutlined/>,
                    },
                ]}
            />
            <div className="charts" style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <Card title="性别统计" bordered={true} style={{width: 600}}>
                    <SexChart/>
                </Card>
                <Card title="课程发布统计" bordered={true} style={{width: 600}}>
                    <CourseChart/>
                </Card>
            </div>
            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <Card title="文章统计" bordered={true} style={{width: 600}}>
                    <ArticlesChart/>
                </Card>
                <Card title="用户数量统计" bordered={true} style={{width: 600}}>
                    <UserChart/>
                </Card>
            </div>
        </>
    )
}
export default App