import {Collapse} from "antd";
import React from "react";

const {Panel} = Collapse;

const ResultCollapse = (props) => {
    return (
        <Collapse defaultActiveKey={['0']} style={{backgroundColor:"rgba(255,255, 255,0"}} className="site-collapse-custom-collapse">
            {
                props.result.map((item, index) =>
                    <Panel key={index} header={item.class_i} extra = {"共" +(item.items_i.length)+ "项"} className="site-collapse-custom-panel">
                        <ol style={{listStyleType:"none"}}>
                            {
                                item.items_i.map((question, i) =>
                                    <li key={i} className="list_item">
                                        <img className="icon" src={require("../Assets/Imgs/pen.png")} />
                                        {(i+1)+'. '+ question}
                                    </li>)
                            }
                        </ol>
                    </Panel>
                )
            }
        </Collapse>
    );
};

export default ResultCollapse;