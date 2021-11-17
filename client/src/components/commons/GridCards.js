import React from 'react';
import { Col } from 'antd';

function GridCards(props){

    const { image, title, href, onClick } = props;

    return (
        <Col lg={6} md={8} xs={24} onClick={onClick && onClick}>
            <div style={{ position:'relative'}}>
                <a href={href}>
                    <img
                    style={{width:'100%', height:'320px'}}
                    alt={title} src={image} loading="lazy"/>
                </a>
            </div>
        </Col>
    )
}
export default GridCards;