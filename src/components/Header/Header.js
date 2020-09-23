import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react';
import {  Container, Form, FormControl, Nav, Navbar } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../../App';
import './Header.css'
const Header = () => {
    //User Context Api
    const {state1,state2} = useContext(UserContext);
    const [loggedUser,setLoggedUser] = state1;

    //History Function
    const history = useHistory();

    return (
        <div>
           <Container> 
            <Navbar  collapseOnSelect expand="lg"  variant="dark">
                <Navbar.Brand >
                    <Link to="/"> 
                        <img src={require('../../images/Logo.png')} alt=""/>
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Form inline className='mr-auto'>
                        <FormControl type="text" placeholder="Search your Destination . . ." className="mr-sm-2" />
                        <FontAwesomeIcon icon={faSearch}/>
                    </Form>
                    <Nav>
                        <Link to="/home">Home</Link>
                        <Link to="/hotelroom">Hotel Room</Link>
                        <span style={{color: '#F9A51A',margin:' 8px 25px'}}>{loggedUser.name || loggedUser.displayName}</span>
                        <>
                            {loggedUser.email || loggedUser.name ? <span onClick={()=> setLoggedUser({})} className="login">Logout</span> :<span onClick={ ()=> history.push('/login')}
                            className="login"
                            >Login
                            </span>}
                        </>
                    </Nav>
                </Navbar.Collapse>
                </Navbar>
           </Container>
        </div>
    );
};

export default Header;