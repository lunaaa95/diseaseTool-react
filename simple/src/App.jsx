import React, {useState} from 'react';
import {Menu, message} from "antd";
import {HashRouter as Router, Link, Route} from 'react-router-dom';
import Home from "./Home/Home";
import Pattern from "./Pattern/Pattern";
import LDA from "./LDA/LDA";
import Word2vec from "./Word2vec/Word2vec";
import SearchIndex from "./SearchIndex/SearchIndex";


const App = () => {
    const hash = window.location.hash.slice(2);
    const [active, setActive] = useState(hash === "" ? "home" : hash);
    const [data, setData] = useState([]);
    const [ldaData, setLdaData] = useState([]);
    const [w2vData, setW2vData] = useState([]);
    const [word, setWord] = useState("");

    const handleClick = (e) => {
        setActive(e.key);
        message.destroy();
    };

    return (
        <Router>
            <Menu theme="dark" onClick={handleClick} selectedKeys={[active]} mode="horizontal"
                  style={{paddingLeft: "20px",}}>
                <Menu.Item key="home" style={{dfontSize: "15px"}}>
                    首页
                    <Link to="/"/>
                </Menu.Item>
                <Menu.Item key="pattern" style={{fontSize: "15px"}}>
                    正则匹配
                    <Link to="/pattern"/>
                </Menu.Item>
                <Menu.Item key="lda" style={{fontSize: "15px"}}>
                    LDA
                    <Link to="/lda"/>
                </Menu.Item>
                <Menu.Item key="word2vec" style={{fontSize: "15px"}}>
                    Word2vec
                    <Link to="/word2vec"/>
                </Menu.Item>
                <Menu.Item key="searchIndex" style={{fontSize: "15px"}}>
                    搜索指数
                    <Link to="/searchIndex"/>
                </Menu.Item>
            </Menu>
            <Route exact path="/" >
                <div className="content1">
                    <Home setWord={setWord} data={data} setData={setData} setActive={setActive}/>
                </div>
            </Route>
            <Route exact path="/pattern">
                <div className="content2">
                    <div className="inner_content">
                        <Pattern word={word} data={data} setActive={setActive}/>
                    </div>
                </div>
            </Route>
            <Route exact path="/lda">
                <div className="content2">
                    <div className="inner_content">
                        <LDA word={word} data={data} setActive={setActive} setLdaData={setLdaData} ldaData={ldaData}/>
                    </div>
                </div>
            </Route>
            <Route exact path="/word2vec">
                <div className="content2">
                    <div className="inner_content">
                        <Word2vec word={word} data={data} setActive={setActive} setW2vData={setW2vData} w2vData={w2vData}/>
                    </div>
                </div>
            </Route>
            <Route exact path="/searchIndex">
                <div className="content2">
                    <div className="inner_content">
                        <SearchIndex word={word} data={data} setActive={setActive}/>
                    </div>
                </div>
            </Route>
        </Router>
    );
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
        color: {"value": "#FF4500"},
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

export default App;