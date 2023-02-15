import { useState, useEffect } from "react";
import { Navbar, Nav, Container, Row, Col } from "react-bootstrap";
// import logo from '../assets/img/logo.svg';
import navIcon1 from '../assets/img/nav-icon1.svg';
import navIcon2 from '../assets/img/nav-icon2.svg';
import navIcon3 from '../assets/img/nav-icon3.svg';
import TrackVisibility from 'react-on-screen';
import contactImg from "../assets/img/contact-img.svg";
// import { HashLink } from 'react-router-hash-link';

import Login from "./Authentication/Login";
import { Signup } from "./Authentication/Signup";
import {Tab} from '@headlessui/react'
import Modal from 'react-modal'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
// import {
//   BrowserRouter as Router
// } from "react-router-dom";



export const NavBar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  function openModal(){
    setIsModalOpen(true)
  }

  function closeModal(){
    setIsModalOpen(false)
  }

  const [activeLink, setActiveLink] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  const formInitialDetails = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  }
  const [formDetails, setFormDetails] = useState(formInitialDetails);
  const [buttonText, setButtonText] = useState('Send');
  const [status, setStatus] = useState({});

  const onFormUpdate = (category, value) => {
      setFormDetails({
        ...formDetails,
        [category]: value
      })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonText("Sending...");
    let response = await fetch("http://localhost:8080/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(formDetails),
    });
    setButtonText("Send");
    let result = await response.json();
    setFormDetails(formInitialDetails);
    if (result.code === 200) {
      setStatus({ succes: true, message: 'Message sent successfully'});
    } else {
      setStatus({ succes: false, message: 'Something went wrong, please try again later.'});
    }
  };


  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [])

  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
  }

  return (
    // <Router>
      <Navbar expand="md" className={scrolled ? "scrolled": ""}>
        <Container>
          <Navbar.Brand href="/">
            <h1 className="logo">EDP</h1>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav">
            <span className="navbar-toggler-icon"></span>
          </Navbar.Toggle>
          <Navbar.Collapse className="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#home" className={activeLink === 'home' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('home')}>Home</Nav.Link>
              <Nav.Link href="#about" className={activeLink === 'skills' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('skills')}>About</Nav.Link>
              <Nav.Link href="#alumni" className={activeLink === 'projects' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('projects')}>Alumni</Nav.Link>
            </Nav>
            <span className="navbar-text">
              <div className="social-icon">
                <a href="https://www.linkedin.com/company/entrepreneurship-development-program-edp/about/?viewAsMember=true"><img src={navIcon1} alt="" /></a>
                <a href="https://www.facebook.com/profile.php?id=100088423380102"><img src={navIcon2} alt="" /></a>
                <a href="#"><img src={navIcon3} alt="" /></a>
              </div>
              {/* <HashLink > */}
                <button className="vvd" onClick={openModal}><span>Let’s Connect</span></button>
                <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        // style={customStyles}
        className="200"
        >
          
          <button onClick={closeModal} className="float-right relative left-4 bottom-4 z-50"><XMarkIcon className="block h-6 w-6 bg-white text-blue-800 text-end" aria-hidden="true" /></button>
          <Tab.Group>
    <Tab.List className="flex flex-row space-x-1 justify-center rounded-xl p-1 text-sm bg-blue-900/20 mb-3">
      <Tab className="w-full text-blue-700  focus:bg-white py-2.5 font-medium leading-5 rounded-lg focus:shadow default:select-all  ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400  focus:outline-none focus:ring-2">Signup</Tab>
      <Tab className="text-blue-700 w-full focus:bg-white py-2.5 focus:shadow rounded-lg leading-5 font-medium ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2">Login</Tab>
    </Tab.List>
    <Tab.Panels>
    <Tab.Panel className="xl:text-center">
      <Signup />
    </Tab.Panel>
    <Tab.Panel className="xl:text-center">
      <Login />
    </Tab.Panel>
    </Tab.Panels>
  </Tab.Group>
  <div className='text-center font-medium text-black mb-2 text-xl'>Or</div>
  <form className='' p-10 action="http://localhost:8080/auth/google">
          <button type="submit" className="flex flex-row gap-5 mx-auto bg-white text-blue-600 shadow-2xl border-2 border-blue-400 px-4 py-3 rounded-3xl font-bold">
            <span className="google-button__icon">
              <svg viewBox="0 0 366 372" className="h-7 w-7" xmlns="http://www.w3.org/2000/svg"><path d="M125.9 10.2c40.2-13.9 85.3-13.6 125.3 1.1 22.2 8.2 42.5 21 59.9 37.1-5.8 6.3-12.1 12.2-18.1 18.3l-34.2 34.2c-11.3-10.8-25.1-19-40.1-23.6-17.6-5.3-36.6-6.1-54.6-2.2-21 4.5-40.5 15.5-55.6 30.9-12.2 12.3-21.4 27.5-27 43.9-20.3-15.8-40.6-31.5-61-47.3 21.5-43 60.1-76.9 105.4-92.4z" id="Shape" fill="#EA4335"/><path d="M20.6 102.4c20.3 15.8 40.6 31.5 61 47.3-8 23.3-8 49.2 0 72.4-20.3 15.8-40.6 31.6-60.9 47.3C1.9 232.7-3.8 189.6 4.4 149.2c3.3-16.2 8.7-32 16.2-46.8z" id="Shape" fill="#FBBC05"/><path d="M361.7 151.1c5.8 32.7 4.5 66.8-4.7 98.8-8.5 29.3-24.6 56.5-47.1 77.2l-59.1-45.9c19.5-13.1 33.3-34.3 37.2-57.5H186.6c.1-24.2.1-48.4.1-72.6h175z" id="Shape" fill="#4285F4"/><path d="M81.4 222.2c7.8 22.9 22.8 43.2 42.6 57.1 12.4 8.7 26.6 14.9 41.4 17.9 14.6 3 29.7 2.6 44.4.1 14.6-2.6 28.7-7.9 41-16.2l59.1 45.9c-21.3 19.7-48 33.1-76.2 39.6-31.2 7.1-64.2 7.3-95.2-1-24.6-6.5-47.7-18.2-67.6-34.1-20.9-16.6-38.3-38-50.4-62 20.3-15.7 40.6-31.5 60.9-47.3z" fill="#34A853"/></svg>
            </span>
            <span className="google-button__text">sign in with Google</span>
          </button>
        </form>

        </Modal>
              {/* </HashLink> */}
            </span>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    // </Router>
  )
}
