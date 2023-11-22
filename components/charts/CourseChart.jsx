import React, {useEffect} from 'react';
import * as echarts from 'echarts';
import {courseCharts} from '../../src/api/charts.js';

const CourseChart = () => {
    useEffect(() => {
        const initCourseChart = async () => {
            const courseRes = await courseCharts();
            const courseOption = {
                title: {
                },
                xAxis: {
                    type: 'category',
                    data: courseRes.data.months
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
                            // readOnly: false,
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
                                // 添加其他需要更改的工具的标题
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
                        data: courseRes.data.counts,
                        type: 'line',
                        smooth: true
                    }
                ]
            };

            const courseChartContainer = document.getElementById('course-chart');
            const courseChart = echarts.init(courseChartContainer);
            courseOption && courseChart.setOption(courseOption);
        };

        initCourseChart().then();
    }, []);

    return <div id="course-chart" className="course-charts"></div>;
};

export default CourseChart;