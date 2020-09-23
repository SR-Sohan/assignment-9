import React, { useContext } from 'react';
import { Container } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { UserContext } from '../../App';
import fakeData from '../../fakeData';
import Header from '../Header/Header';
import './Booking.css'

const Booking = () => {
    //User Context api
    const {state1,state2} = useContext(UserContext);
    const [useOrigin,setOrigin] = state2;

    // Use Params for booking id
    const {bookingId} = useParams();

    //Find bookingId 
    let bookingDetails = fakeData.find( place => place.id == bookingId);

    //React hook form useForm
    const { register, handleSubmit, watch, errors } = useForm();

    //History and On Submit 
    const history = useHistory();
     const onSubmit = data => {
         setOrigin(data)
            history.push('/hotelroom')
     };
     
    return (
        <div className="booking-area background-img">
            <Header/>
            <Container> 
                <div className="booking-content"> 
                    <div className="booking-details"> 
                        <h2>{bookingDetails.title}</h2>
                        <p>{bookingDetails.discription}</p>
                    </div>
                    <div className="booking-form"> 
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <label htmlFor="origin">Origin</label>
                            <input name="origin"  ref={register({required: true})} />
                            {errors.origin && <span className="error">Please selected your origin</span>}
                            <br/>

                            <label htmlFor="destination">Destination</label>
                            <input name="destination" defaultValue={bookingDetails.title} ref={register({ required: true })} />
                            {errors.destination && <span className="error">Please selected your destination</span>}
                            
                            <div className="date-picker"> 
                                <div className="strart-date"> 
                                    <label htmlFor="start">Form</label>
                                    <input type="date" name="start" id="start" ref={register({ required: true })}/>
                                    {errors.start && <span className="error">Please selected your form date</span>}
                                </div>
                                <div className="end-date"> 
                                    <label htmlFor="end">To</label>
                                    <input type="date" name="end" id="end" ref={register({ required: true })}/>
                                    {errors.end && <span className="error">Please selected your to date</span>}
                                </div>
                            </div>
                            <input className="submit-btn" type="submit"  value="Start Booking"/>
                        </form>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Booking;