import {useForm} from 'react-hook-form';
import React, { useState } from 'react';
// import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import contactImg from "../../assets/img/contact-img.svg";
import 'animate.css';
import TrackVisibility from 'react-on-screen';


export const Signup =  () =>{
    const {register, handleSubmit, formState:{errors}} = useForm();
    const formSubmit = async(data) => {
        const response = await fetch("http://localhost:8080/user/register", {
             method:'POST',
             headers:{
               'content-Type':'application/json'
             },
             body:JSON.stringify(data)
       
           }).then((res)=>{
             console.log("User Created Successfully", data)
           })
         
           return () => {
             response.json()
           }
         }
       
       const [value, setValue] = useState('');

       const changeHandler = ()=>{
        setValue(value)
      }
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
    
    return(
        <>
        <div class="px-4 pb-2">
        <section className="contact" id="connect">
      <Container>
        <Row className="align-items-center">
          <Col size={12} md={6}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
              
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
            <form onSubmit={handleSubmit(formSubmit)}>
              <fieldset class="text-center font-semibold text-base mb-8 font-sans">Sign up with your email<hr class="mt-3 font-" /></fieldset>
              
              <div class="mb-8 font-xl">
              <label>
                <input onChange={changeHandler}  name='name' type={"text"} class="outline outline-2 outline-offset-1 focus:outline-4 outline-blue-400 placeholder:text-black placeholder:text-base rounded-lg w-72 h-10 pl-5 placeholder:font-sans" placeholder='Enter Your Name'
                {...register("name", {required:true})}
                
                />
              </label>
              {errors.name && <p class="text-red-600 font-normal">please check your Full Name!</p>}
              </div>
              
              <div class="mb-8">
              <label>
                <input onChange={changeHandler} name='email' class="w-72  h-10 pl-5 outline outline-2 outline-offset-1 focus:outline-4 outline-blue-400 placeholder:text-black rounded-lg" type={"email"} placeholder='Email'
                {...register("email", {required:true, pattern:/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/})}
                />
              </label>
              {errors.email && <p class="text-red-600 font-normal">Please check your Email!</p>}
              </div>
              <div class="mb-8 ">
              <label>
                <input name='number' onChange={changeHandler} class="w-72  h-10 pl-5 outline outline-2 outline-offset-1 outline-blue-400 placeholder:text-black focus:outline-4 rounded-lg" placeholder='Phone Number'
                {...register("number", {required:true, minLength:10, maxLength:10})}
                ></input>
              </label>
              {errors.number && <p class="text-red-600 font-normal">Please check your phone number!</p>}
              </div>
              <div class="mb-5">
                <label>
                  <input name='password' onChange={changeHandler} class="w-72 focus:outline-4  h-10 pl-5 outline outline-2 outline-offset-1 outline-blue-400 placeholder:text-black rounded-lg" type={"password"} placeholder="Create New Password"
                  {...register("password", {required:true, pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/})}
                  />
                </label>
                {errors.password && <p class="text-red-600 font-normal">Please check your password!</p>}
              </div>
              <div class="mb-5">
                <input type={"checkbox"} 
                {...register("checkbox", {required:true})}
                />
                <label class="font-sans text-sm ml-5">I agree to the <a href="#/" class="text-blue-700 font-semibold">Terms of Service</a> and <a href='#/' class="font-semibold font-sans text-blue-700">Privacy Policy</a></label>
              </div>
              <div class="text-center">
              <button class="bg-blue-600 hover:bg-blue-800 text-white font-semibold text-xl rounded-3xl w-5/6 px-6 py-3" type='submit'>Create account</button>
              </div>
            </form>
          </div>

        </>
    )
}