import React, { createContext, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './components/Home/Home';
import NotFound from './components/NotFound/NotFound';
import Booking from './components/Booking/Booking';
import HotelRoom from './components/HotemRoom/HotelRoom';
import Login from './components/Login/Login';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const UserContext = createContext();

function App() {
  const [loggedUser,setLoggedUser] = useState([]);
  const [userOrigin,setUserOrigin] = useState([]);
  return (
    <UserContext.Provider
     value={{
       state1: [loggedUser,setLoggedUser],
       state2: [userOrigin,setUserOrigin]

     }}>
      <Router> 
        <Switch> 
          <Route exact path="/"> 
              <Home/>
          </Route>
          <Route path='/home'> 
            <Home/>
          </Route>
          <Route exact path='/booking/:bookingId'> 
            <Booking/>
          </Route>
          <PrivateRoute path='/hotelroom'> 
            <HotelRoom/>
          </PrivateRoute>
          <Route path="/login"> 
            <Login/>
          </Route>
          <Route path="*"> 
              <NotFound/>
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
