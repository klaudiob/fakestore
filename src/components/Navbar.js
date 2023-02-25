import React from 'react';
import '../App.css';
import {Container,Navbar,Nav} from 'react-bootstrap';
const MyNavbar = () => {
    return(

        <Navbar bg="dark" variant="dark" sticky="top" >
        <Container>
          <Navbar.Brand href="/">MyStore</Navbar.Brand>
          {/* <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav> */}
        </Container>
      </Navbar>
    )
}

export default MyNavbar