import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';
//import styled from  'styled-components';

export const NavigationBar = () => {
    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/About">About</Nav.Link>
                    <Nav.Link href="/featureVideos">Feature Videos</Nav.Link>
                </Nav>
                
            </Navbar.Collapse>
            </Navbar>
        </>
    )
}