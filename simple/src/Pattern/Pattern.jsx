import React, {useEffect} from "react";
import ResultCollapse from "../Components/ResultCollapse";
import {useHistory} from "react-router-dom";
import {message, Tag, Empty} from 'antd';

const Pattern = (props) => {
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

    const result = props.data
        .filter(element => element.model_name === "pattern")
        .sort((a, b) => b.items_i.length - a.items_i.length);
    return (
        <div  style={{width:"80%", margin:"0 auto"}}>
            <div style={{margin: "0 auto", textAlign: "center"}}>
                <img src={require("../Assets/Imgs/answer1.png")} style={{width: '120px'}}/>
                <span className="title">正则匹配结果</span>
            </div>

            <div className="result">
                {result.length ?
                    <div>
                        <div style={{margin:"10px auto 10px 0px", color:"#999", fontSize:"12px"}}>您搜索的关键词是
                            <Tag color="orange" style={{margin:"0 7px"}}>
                                {props.word}
                            </Tag>
                        </div>
                        <ResultCollapse result={result}/>
                    </div>
                    :
                    <Empty className="my_Empty"/>
                }
            </div>
        </div>
    )
}


export default Pattern;