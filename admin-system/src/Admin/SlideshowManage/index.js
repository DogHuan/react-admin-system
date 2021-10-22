import { Carousel } from 'antd';
import { Component } from 'react';
import Custom from './Custom';

export default class SlideshowManage extends Component{
    constructor(props){
        super(props)
    }
    
    render(){
        const contentStyle = {
            height: '160px',
            color: '#fff',
            lineHeight: '160px',
            textAlign: 'center',
            background: '#364d79',
          };
        return(
            <div className="divCarousel">
            <Carousel autoplay>
            <div>
              <h3 style={contentStyle}>1</h3>
            </div>
            <div>
              <h3 style={contentStyle}>2</h3>
            </div>
            <div>
              <h3 style={contentStyle}>3</h3>
            </div>
            <div>
              <h3 style={contentStyle}>4</h3>
            </div>
          </Carousel>
          <div style={{
              height: '160px',
              color: '#fff',
              lineHeight: '160px',
              textAlign: 'center',
              background: '#364d79',
          }}>
              <Custom></Custom>
          </div>
          </div>
          
        )
       
    }
  }