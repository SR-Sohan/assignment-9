import React, { useContext } from 'react';
import { Container } from 'react-bootstrap';
import fakeData from '../../fakeData';
import Header from '../Header/Header';
import SingleRoom from '../SingleRoom/SingleRoom';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import './HotelRoom.css'
import { UserContext } from '../../App';

const HotelRoom = (props) => {
    // User Context Api
    const {state1,state2} = useContext(UserContext);
    const [useOrigin,setOrigin] = state2;

    // Filter FakeData category of room
    const rooms = fakeData.filter( room => room.category === 'room');
    
    return (
        <div className="hotelroom-area"> 
        <Header/>
            <Container> 
                <div className="hotelroom-content row"> 
                    <div className="single-rooms col-lg-6"> 
                        <span>252 Stays | {useOrigin.start} - {useOrigin.end} | 3 guests</span>
                         <h3>Stay in <span>{useOrigin.destination}</span></h3>
                        {rooms.map ( room => <SingleRoom 
                        key={room.id}
                        room={room}
                        ></SingleRoom>)}
                    </div>
                    <div className="google-map col-lg-6"> 
                        <Map google={props.google} zoom={14}>
    
                                <Marker position={{
                            lat: 23.3813964,
                            lng: 92.2861862 
                        }} />
                        </Map>
                    </div>
                </div>
            </Container>
        </div>
    );
};
export default GoogleApiWrapper({
    apiKey: ("AIzaSyC_fS48vLuvzFOSa_FYBVejSeMq6e--vFQ")
  })(HotelRoom)