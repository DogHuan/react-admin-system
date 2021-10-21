import React,{Component} from "react";
import { Row, Col, Card } from 'antd';
export default class ChartManage extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
        <div className="gutter-example">
        <Row gutter={16}>
            <Col className="gutter-row" md={24}>
                <div className="gutter-box">
                    <Card title="区域图" bordered={false}>
                      
                    </Card>
                </div>
            </Col>
        </Row>
        <Row gutter={16}>
            <Col className="gutter-row" md={12}>
                <div className="gutter-box">
                    <Card title="关系图" bordered={false}>
                        {/*<EchartsGraphnpm />*/}
                      
                    </Card>
                </div>
            </Col>
            <Col className="gutter-row" md={12}>
                <div className="gutter-box">
                    <Card title="饼图" bordered={false}>
                  
                    </Card>
                </div>
            </Col>
        </Row>
        <Row gutter={16}>
            <Col className="gutter-row" md={24}>
                <div className="gutter-box">
                    <Card title="散点图" bordered={false}>
                      
                    </Card>
                </div>
            </Col>
        </Row>
    </div>
    )
  }
}