import React, {useEffect,useState,} from "react";
import {useHistory} from "react-router-dom";
import {message, Input, Collapse, Tag, Empty} from 'antd';
import API from "../Config"
import Axios from "axios";

const {Panel} = Collapse;
const {Search} = Input;


const LDA = (props) => {
    const history = useHistory();
    const [input, setInput] = useState("");

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

    const handleSearch = () => {
        if (!input)
            return;
        Axios.post(API.cluster, {model:"lda", number:input})
            .then(res => {
                props.setLdaData(res.data);
            })
    }

    let result
    if (!props.ldaData.length){
        result = props.data
            .filter(element => element.model_name === "lda")
            .sort((a,b)=> b.items_i.length - a.items_i.length);
    }
    else
    {
        result = props.ldaData
            .filter(element => element.model_name === "lda")
            .sort((a,b)=> b.items_i.length - a.items_i.length);
    }
    return (
        <>
            <div style={{margin:"0 auto", textAlign:"center"}}>
                <img src={require("../Assets/Imgs/answer2.png")} style={{width:'120px'}}/>
                <span className="title">LDA结果</span>
            </div>


            <div className="result">
                {result.length ?
                    <div style={{width: "80%", margin: "0 auto"}}>
                        <div style={{margin: "10px auto 10px 0px", color: "#999", fontSize: "12px"}}>您搜索的关键词是
                            <Tag color="orange" style={{margin: "0 7px"}}>
                                {props.word}
                            </Tag>
                        </div>
                        <Collapse defaultActiveKey={['0']} className="site-collapse-custom-collapse">
                            {
                                result.map((item, index) =>
                                    <Panel key={index} header={"类别 " + (index + 1)}
                                           extra={"共" + (item.items_i.length) + "项"}
                                           className="site-collapse-custom-panel">
                                        <ol style={{listStyleType: "none"}}>
                                            {
                                                item.items_i.map((question, i) =>
                                                    <li key={i} className="list_item">
                                                        <img className="icon" src={require("../Assets/Imgs/pen.png")}/>
                                                        {(i + 1) + '. ' + question}
                                                    </li>)
                                            }
                                        </ol>
                                    </Panel>
                                )
                            }
                        </Collapse>
                        <div style={{width: "600px", margin: "20px auto 20px 0",}}>
                            <Search placeholder="重设聚类数目"
                                    value={input}
                                    onChange={(e) => {
                                        setInput(e.target.value)
                                    }}
                                    onSearch={handleSearch}/>
                        </div>
                    </div>
                    :
                        <Empty className="my_Empty"/>
                }
            </div>
        </>
    );
};

export default LDA;