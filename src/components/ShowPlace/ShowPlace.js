import React from 'react';
import { Col } from 'react-bootstrap';
import './ShowPlace.css'

const ShowPlace = (props) => {
    const {title,img,id} = props.place;
    return (
        <Col xs={4}> 
            <div onClick={ ()=> props.showDetails(id)} className="show-place-single"> 
                <img src={img} alt=""/>
                <div className="place-name"> 
                    <h3>{title}</h3>
                </div>
            </div>
        </Col>
    );
};

export default ShowPlace;