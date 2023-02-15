import React, {useState} from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
// import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import contactImg from "../../assets/img/contact-img.svg";
import 'animate.css';
import TrackVisibility from 'react-on-screen';


 

 

export default function Login({setToken}){
    const {register, handleSubmit, formState:{errors}} = useForm();
    // const [authenticated, setAuthenticated] = useState(localStorage.getItem("authenticated") || false);
    
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

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
  
    const handleSubmits = async (e) => {
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
  

    // const credentials = {email, password}

    async function loginUser(credentials) {
      console.log(credentials)
      return fetch('http://localhost:3000/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      })
        .then(data => data.json())
     }
    

  const formSubmit = async e => {

    e.preventDefault();
    const token = await loginUser({
      email,
      password
    });
    console.log(token)
    setToken(token);
  }


  return (
    <>
    <div class="p-2 pb-2">
    <form onSubmit={formSubmit}>
    <section className="contact" id="connect">
      <Container>
        <Row className="align-items-center">
          
          <Col size={12} md={6}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                {/* <h2>Get In Touch</h2> */}
                <form onSubmit={handleSubmits}>
                  <Row>
                    <Col size={12} sm={6} className="px-1">
                      <input type="text" value={formDetails.firstName} placeholder="First Name" onChange={(e) => onFormUpdate('firstName', e.target.value)} />
                    </Col>
                    <Col size={12} sm={6} className="px-1">
                      <input type="text" value={formDetails.lasttName} placeholder="Last Name" onChange={(e) => onFormUpdate('lastName', e.target.value)}/>
                    </Col>
                    <Col size={12} sm={6} className="px-1">
                      <input type="email" value={formDetails.email} placeholder="Email Address" onChange={(e) => onFormUpdate('email', e.target.value)} />
                    </Col>
                    <Col size={12} sm={6} className="px-1">
                      <input type="tel" value={formDetails.phone} placeholder="Phone No." onChange={(e) => onFormUpdate('phone', e.target.value)}/>
                    </Col>
                    <Col size={12} className="px-1">
                      <textarea rows="6" value={formDetails.message} placeholder="Message" onChange={(e) => onFormUpdate('message', e.target.value)}></textarea>
                      <button type="submit"><span>{buttonText}</span></button>
                    </Col>
                    {
                      status.message &&
                      <Col>
                        <p className={status.success === false ? "danger" : "success"}>{status.message}</p>
                      </Col>
                    }
                  </Row>
                </form>
              </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
      <fieldset  class="text-center font-semibold text-base new-email-bx input mb-8">Login with email</fieldset>
      <div class="mb-8">
              <label>
                <input onChange={(e)=>setEmail(e.target.value)}  name='email' class="outline outline-2 outline-offset-1 outline-blue-400 focus:outline-4 placeholder:text-black rounded-lg w-72 h-10 pl-5 placeholder:font-sans"  type={"email"} placeholder='Email'
                // {...register("email",{required:true})}
                />
              </label>
              {/* {errors.email && <p>Please user correct email</p>} */}
              </div>
              <div class="mb-8">
              <label>
                <input onChange={(e)=>setPassword(e.target.value)} name='password'  class="outline outline-2 outline-offset-1 outline-blue-400 focus:outline-4 placeholder:text-black rounded-lg w-72 h-10 pl-5 placeholder:font-sans" type={"password"} placeholder='Enter Your Password'
                // {...register("password", {required:true})}
                />
              </label>
              {/* {errors.password && <p>Please use correct password!</p>} */}
              </div>
              <div class="text-center">
              <button class="bg-blue-600 hover:bg-blue-800 text-white font-semibold text-xl px-6 py-3 w-5/6 rounded-3xl" type='submit'>Login</button>
              </div>
    </form>
    </div>

    </>
  )
}


Login.propTypes = {
  setToken: PropTypes.func.isRequired
}