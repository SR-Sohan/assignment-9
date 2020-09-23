import React, { useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import Header from '../Header/Header';
import fakeData from '../../fakeData'
import './Banner.css'
import ShowPlace from '../ShowPlace/ShowPlace';
import { useHistory } from 'react-router-dom';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Banner = () => {
    // Filter fakedata for place
    const placeData = fakeData.filter( item => item.category === 'place');
    const [showPlace, setShowPlace] = useState(placeData);

    //Handle onClick Show Details 
    const [showDetails,setShowDetails] = useState({});
    const handleShowDetails = id => {
        const placeDetails = fakeData.find( place => place.id === id);
        setShowDetails(placeDetails)
    }

    // Handle onClick Booking button
    const history = useHistory();
    const handleBookingBtn = placeId =>{
        let manageId = placeId ? placeId : 1;
        history.push('/booking/' + manageId)
    }
    return (
        <div className="banner-area background-img">
            <Header></Header>
            <Container> 
                <div className="banner-content"> 
                    <div className="place-details">
                        <h1>{showDetails.title ? showDetails.title : "Cox's Bazar"}</h1>
                        <p>{ showDetails.shortDiscription ? showDetails.shortDiscription : "Cox's Bazar is a city, fishing port, tourism centre and district headquarters in southeastern Bangladesh. It is famous mostly for its long natural sandy beach, and it ..."}</p>
                        <button onClick={ ()=> handleBookingBtn(showDetails.id)} >Booking <FontAwesomeIcon icon={faArrowRight} /></button>
                    </div>
                    <div className="show-place"> 
                        <Row> 
                            {showPlace.map( place => <ShowPlace 
                            showDetails={handleShowDetails}
                            key={place.id} place={place}
                            ></ShowPlace>)}
                        </Row>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Banner;