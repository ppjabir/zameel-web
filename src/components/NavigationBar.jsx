import React from 'react';
import {Navbar, Nav, Container, NavItem} from 'react-bootstrap';
import { Link } from "react-router-dom";
import logo from '../logo.jpg';
import Styled from "styled-components";

export const NavigationBar = () => {
    return (
        <Styles>
            <Navbar collapseOnSelect expand="lg" bg="secondary" variant="light">
                <Container>
                
                    <Navbar.Brand>
                            <Link to="/">
                                <img width="100" src={logo} alt="Logo" />
                                Zameel
                            </Link>
                           </Navbar.Brand>  
                    
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="ml-auto">
                            <NavItem><Link to="/about">About</Link></NavItem>
                            <NavItem><Link to="/featureVideos">Feature Videos</Link></NavItem>
                            <NavItem><Link to="/audioList">Latest Audio</Link></NavItem>
                        </Nav>
                        
                    </Navbar.Collapse>
                </Container>
            </Navbar>
                
        </Styles>
    )
}
const Styles = Styled.div`
    .navbar-light .navbar-nav .nav-item {
        
        a{
            color: white;
            &:hover {
                text-decoration: none;
            }
        }
        @media screen and (min-width: 992px) {
            margin: 0 10px;
        }
    }
    .navbar-brand {
        a {
            color: white !important;
            img {
                display: inline-block;
                margin-right: 15px;
            }
            &:hover {
                text-decoration: none;
            }
        }
    }
    .navbar-light .navbar-toggler {
        background-color: #fff;
    }
    .navbar-collapse {
        padding: 20px;
    }
`