import React, {useEffect} from "react";
import {useHistory} from "react-router-dom";
import {message, Tag, Card, Empty} from 'antd';
import ReactEcharts from 'echarts-for-react';

const { Meta } = Card;


const SearchIndex = (props) => {
    const history = useHistory();
    useEffect(() => {
        if (!props.data.length) {
            message.error('请先搜索疾病再查看，正在为您跳转搜索页面 ......');
            const timeout = setTimeout(() => {
                message.destroy();
                history.push("/");
                props.setActive("home");
            }, 3000);
            return () => {
                clearTimeout(timeout)
            };
        }
    });

    if (!props.data.length) {
        return (
            <>
                <div style={{margin:"0 auto", textAlign:"center"}}>
                    <img src={require("../Assets/Imgs/answer4.png")} style={{width:'120px'}}/>
                    <span className="title">搜索指数</span>
                    <Empty className="my_Empty"/>
                </div>
            </>
        )
    }
    else {
        const result =props.data[props.data.length-1]
        const valuelist = result.index_data

        const datelist = result.date_data

        const getOption = (result) =>{
            return {
                visualMap: [{
                    show: false,
                    type: 'continuous',
                    seriesIndex: 1,
                    min: 0,
                    max: 5000,
                }],
                title: [{

                }],
                tooltip: {
                    trigger: 'axis'
                },
                xAxis: [{
                    data: datelist
                }],
                yAxis: [{
                    splitLine: {show: false}
                }],
                grid: [{
                    top: "10%",
                    left: "5%",
                    right: "5%",
                    bottom: "10%"
                }],
                series: [{
                    type: 'line',
                    showSymbol: false,
                    data: valuelist,
                    markPoint: {
                        data: [
                            {type: 'max', name: '最大值'},
                            {type: 'min', name: '最小值'}
                        ]
                    },
                    markLine: {
                        data: [
                            {type: 'average', name: '平均值'}
                        ]
                    },
                    lineStyle: {
                        width: 3,
                        shadowColor: 'rgba(0,0,0,0.4)',
                        shadowBlur: 10,
                        shadowOffsetY: 10
                    },
                }]
            }
        }
        return (
            <>
                <div style={{margin:"0 auto", textAlign:"center"}}>
                    <img src={require("../Assets/Imgs/answer4.png")} style={{width:'120px'}}/>
                    <span className="title">搜索指数趋势图</span>
                </div>

                <div className="my_card">
                    <div style={{margin:"5px auto 5px 100px", color:"#999", fontSize:"12px", textAlign:"left"}}>您搜索的关键词是
                        <Tag color="orange" style={{margin:"0 7px"}}>
                            {props.word}
                        </Tag>
                    </div>
                    <Card
                        hoverable
                        style={{ width: "1000px",height:"600px", margin:"10px auto 0", position:"relative", padding:"0 20px"}}
                        cover={
                            <ReactEcharts option={getOption(result)} style={{height:"550px",width:"950px",margin:"0 auto"}}/>
                        }
                    >
                        <Meta id="description" description="数据来源百度指数：index.baidu.com"/>

                    </Card>
                </div>
            </>

        )
    }
}


export default SearchIndex;