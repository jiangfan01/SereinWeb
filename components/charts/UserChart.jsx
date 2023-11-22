import React, {useEffect} from "react";
import {usersCharts} from "../../src/api/charts.js";
import * as echarts from 'echarts/core';

const App = () => {
    useEffect(() => {
        const initUserChart = async () => {
            const userRes = await usersCharts()
            const userOption = {
                title: {},
                xAxis: {
                    type: 'category',
                    data: userRes.data.months
                },
                yAxis: {
                    type: 'value'
                },
                toolbox: {
                    show: true,
                    feature: {
                        dataZoom: {
                            yAxisIndex: 'none'
                        },
                        dataView: {
                            title: {
                                zoom: '放大',
                                back: '返回'
                            },
                        },
                        magicType: {
                            type: ['line', 'bar'],
                            title: {
                                line: '切换线性',
                                bar: '切换柱状'
                            }
                        },
                        restore: {
                            title: '恢复'
                        },
                        saveAsImage: {
                            title: '保存echarts'
                        }
                    }
                },
                series: [
                    {
                        data: userRes.data.counts,
                        type: 'line',
                        smooth: true
                    }
                ]
            };
            const user = echarts.init(document.getElementById("user-chart"));
            user.setOption(userOption);
        };

        initUserChart().then(r => {
        });
    }, []);

    return <div id="user-chart" className="user-charts"></div>;
}
export default App