import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'

const TopNav = (props) => {

    console.log(props, "props from TopNav")

    const user_id = props.user_id

    const signin_button = (
        <Nav.Link href="/users/sign_in">Sign in</Nav.Link>
    )

    const signout_button = (
        <Nav.Link href="/users/sign_out" data-method="delete" data-confirm="Are you sure you want to sign out?">Sign out</Nav.Link>
    )

    return(
        <>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home">Chris' Blog</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <NavDropdown title="Posts" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/posts">All posts</NavDropdown.Item>
                        {user_id != "not_signed_in" ? <NavDropdown.Item href="/posts/new">Create new post</NavDropdown.Item> : nil}
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown>

                    <NavDropdown title="Categories" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/categories">All Categories</NavDropdown.Item>
                        {user_id != "not_signed_in" ? <NavDropdown.Item href="/categories/new">Create new category</NavDropdown.Item> : nil}
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link href="/">About</Nav.Link>
                    <Nav.Link href="/">Contact</Nav.Link>
                    {user_id != "not_signed_in" ? signout_button : signin_button}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>            
        </>
    )

}

export default TopNav