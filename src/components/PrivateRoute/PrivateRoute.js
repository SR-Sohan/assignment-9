import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { UserContext } from '../../App';

const PrivateRoute = ({children,...rest}) => {
  //User Context Api
  const {state1,state2}= useContext(UserContext);
  const[loggedUser,setLoggedUser] = state1;
  
    return (
        <Route
        {...rest}
        render={({ location }) =>
        loggedUser.email || loggedUser.name ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
};

export default PrivateRoute;