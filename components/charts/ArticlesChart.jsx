import * as echarts from 'echarts/core';
import React, {useEffect,} from 'react';
import {articlesCharts} from '../../src/api/charts.js';

const App = () => {
    useEffect(() => {
        const initArticleChart = async () => {
            const articleRes = await articlesCharts()
            const articleOption = {
                title: {
                },
                xAxis: {
                    type: 'category',
                    data: articleRes.data.months
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
                        data: articleRes.data.counts,
                        type: 'line',
                        smooth: true
                    }
                ]
            };
            const article = echarts.init(document.getElementById("article-chart"));
            article.setOption(articleOption);
        };

        initArticleChart().then(r => {
        });
    }, []);

    return <div id="article-chart" className="article-charts"></div>;
};

export default App;