import React from 'react'
import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import { BASE_URL } from "../config.js";
import axios from "axios";

import { allquestionsState } from "../state_vars/allquestions.js";
import { usernameState } from "../state_vars/username.js";
import {useRecoilState} from "recoil";
import { RecoilRoot, useSetRecoilState, useRecoilValue } from 'recoil';
import { SingleQuestionArea,AllQuestions } from './ClientStart.js';


export function Main(props) {
const [username,setUsername] = useRecoilState(usernameState)
console.log(username);
const navigate = useNavigate(); 

const createtable = async() =>{
  const response = await axios.post(`${BASE_URL}/createtable/`,{username:username});//here we sent http req to server at end point BASE_URL/allQuestions
  alert(response.data.mssg);
}


  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '90vh',
      paddingInline:'10rem'
    }}>

      <h1 style={{
        fontSize: '4rem',
        textShadow: '10px 10px 5px rgba(1, 1, 1, 1)',
        color: '#FFD700'
      }}>KBC</h1>

        <h1 style={{
        fontSize: '4rem', // Larger font size
        color: '#FFFFFF', // White text color
        textShadow: '10px 10px 5px rgba(1, 1, 1, 1)', // Subtle shadow
      }}>Enter Your Username</h1>
        <input
        type="text"
        // value={}
        onChange={(e)=>{
         // const timestampInSeconds = Math.floor(Date.now() / 1000).toString();
          var userid = e.target.value ; //+ timestampInSeconds
          
          setUsername(userid);
        } }
        placeholder="Enter username..."
        style={{
          padding: '1rem', // Add padding to input field
          borderRadius: '4px', // Rounded corners
          border: '1px solid #ccc', // Add a border
          marginBottom: '1rem', // Space below input
          boxShadow:'10px 10px 5px rgba(1, 1, 1, 1)'
        }}
      />
      
        <button style={{
          boxShadow:'10px 10px 5px rgba(1, 1, 1, 1)'
        }} type="button" className="btn btn-dark" onClick={()=>{
          createtable();
          navigate("/start");         

        }}>next</button>
        {/* </div> */}
    {/* <AllQuestions/>
    <SingleQuestionArea idx = "0" /> */}
    </div>
  )
}

export function InitUser(){ 
  const [user,setUser] = useRecoilState(usernameState)

useEffect(() => {
  const usernames = ["blackcoffee","darkknight","pinkpanther","vinnicandy","MCrougue","firecrackers"]; 
  var username= null;
    const randomIndex = Math.floor(Math.random() * usernames.length);
   var username = usernames[randomIndex];
    const timestampInSeconds = Math.floor(Date.now() / 1000).toString();
   console.log('Current timestamp (seconds):', timestampInSeconds);
    username = username + timestampInSeconds;
    setUser(username);
}, []);
}
 
