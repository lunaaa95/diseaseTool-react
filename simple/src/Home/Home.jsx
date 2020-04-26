import React, {useState} from "react";
import {Input, Spin} from 'antd';
import API from "../Config";
import Axios from "axios";
import {useHistory} from "react-router-dom";
import Particles from "react-particles-js";

const {Search} = Input;

const Home = (props) => {
    const [input, setInput] = useState("");
    const [haveSearch, setHaveSearch] = useState(0)
    const history = useHistory();

    const handleSearch = () => {
        if (!input)
            return;
        setHaveSearch(1)
        Axios.post(API.query, {keyWord: input})
            .then(res => {
                props.setData(res.data);
                history.push("/pattern");
                props.setActive("pattern");
                props.setWord(input);
                setHaveSearch(0)
            })
    };
    return (
        <>
        <Particles height={"calc(100% - 50px)"} style={particlesStyle} params={particlesParams}/>
            <div className="search_img">
                <img src={require("../Assets/Imgs/search.png")} style={{width: '200px'}}/>
            </div>
            <h1 className="title">疾病搜索统计小工具</h1>
            {
                haveSearch ?
                    <div style={{textAlign: "center"}}>
                        <Spin size="large" tip="Loading..."/>
                    </div>
                    :
                    <div style={inputStyle}>
                        <Search placeholder="请输入疾病名称"
                                enterButton="开始搜索" size="large"
                                value={input}
                                onChange={(e) => {
                                    setInput(e.target.value)
                                }}
                                onSearch={handleSearch}/>
                    </div>
            }
        </>
    );
};

const inputStyle = {
    width: "600px",
    margin: "0 auto"
};

const particlesStyle = {
    position: "fixed",
    zIndex: "-1",
    top: "49px"
};

const particlesParams = {
    "particles": {
        "number": {
            "value": 160,
            "density": {
                "enable": false
            }
        },
        color: {"value": "#4169E1"},
        "size": {
            "value": 3,
            "random": true,
            "anim": {
                "speed": 4,
                "size_min": 0.3
            }
        },
        "line_linked": {
            "enable": false
        },
        "move": {
            "random": true,
            "speed": 1,
            "direction": "top",
            "out_mode": "out"
        }
    },
    "interactivity": {
        "events": {
            "onhover": {
                "enable": true,
                "mode": "bubble"
            },
            "onclick": {
                "enable": true,
                "mode": "repulse"
            }
        },
        "modes": {
            "bubble": {
                "distance": 250,
                "duration": 2,
                "size": 0,
                "opacity": 0
            },
            "repulse": {
                "distance": 400,
                "duration": 4
            }
        }
    }
};

export default Home;