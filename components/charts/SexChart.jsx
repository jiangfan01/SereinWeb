import React, {useEffect} from 'react';
import * as echarts from 'echarts';
import {sexesCharts} from '../../src/api/charts.js';

const SexChart = () => {
    useEffect(() => {
        const initSexChart = async () => {
            const sexRes = await sexesCharts();
            const sexOption = {
                    backgroundColor: '#02172b',
                    title: {
                        left: 'center',
                        top: 20,
                        textStyle: {
                            color: '#ccc'
                        }
                    },
                    tooltip: {
                        trigger: 'item'
                    },
                    series: [
                        {
                            name: '性别统计',
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '50%'],
                            itemStyle: {
                                normal: {
                                    color: function (colors) {
                                        const colorList = ['#93C5FD', '#65A9F5', '#558BF1', '#415B9D', '#2E3A66', '#ffddbb', '#ffbbaa', '#ff99cc']
                                        return colorList[colors.dataIndex];
                                    }
                                },
                            },
                            data: [
                                ...sexRes.data.counts,
                            ].sort(function (a, b) {
                                return a.value - b.value;
                            }),
                            roseType: 'radius',
                            label: {
                                color: '#aaaccc'
                            },
                            labelLine: {
                                lineStyle: {
                                    color: '#aaaccc'
                                },
                                smooth: 0.2,
                                length: 10,
                                length2: 20
                            },
                            animationType: 'scale',
                            animationEasing: 'elasticOut',
                            animationDelay: function (idx) {
                                return Math.random() * 200;
                            }
                        }
                    ]
                };

            const sexChartContainer = document.getElementById('sex-chart');
            const sexChart = echarts.init(sexChartContainer);
            sexOption && sexChart.setOption(sexOption);
        };

        initSexChart().then();
    }, []);

    return <div id="sex-chart" className="sex-charts"></div>;
};

export default SexChart;