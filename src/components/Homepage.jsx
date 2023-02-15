// import React from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavBar } from "./NavBar";
import { Banner } from "./Banner";
import { Skills } from "./Skills";
import { Projects } from "./Projects";
import { Guests } from './Guests';
import { Contact } from "./Contact";
import { Footer } from "./Footer";
 import styles from '../index.css';
 import '../App.css';

export const Homepage = () => {
  return (
    <div className="">
    <NavBar />
    <Banner />
    <Skills />
    <Projects />
    <Guests />
    <Contact />
    <Footer />
    </div>
  )
}
