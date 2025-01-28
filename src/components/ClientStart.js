import React from 'react'
import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import { BASE_URL } from "../config.js";
import axios from "axios";
import { usernameState } from "../state_vars/username.js";
import { CountdownTimer } from './Timer.js';

import { allquestionsState } from "../state_vars/allquestions.js";
import {useRecoilState} from "recoil";
import { RecoilRoot, useSetRecoilState, useRecoilValue } from 'recoil';



export function Start(props) {

  const username = useRecoilValue(usernameState)
  console.log(username); 

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '90vh',
      paddingInline:'10rem',
      color:'#5C4033'
    }}>
       {/* <h1 >Kon Banega Coder</h1>  */}
      
       {/* <h1>{ `-${username}`}</h1> */}
       
      <AllQuestions/>
      
      <SingleQuestionArea idx = "0" />
            
       

      {/* </body> */}
    </div>
  )
}

function QuestionText(props) {
  return(<div style={{
    display:'flex',
    width:"80vw",
    minHeight:"100px",

    // background: 'linear-gradient(to right, purple, plum) ',rgba(128, 0, 128, 0.5
    backgroundColor: '#5C4033',  // Translucent white
    backdropFilter: 'blur(0.5px)', // Optional: adds a blur effect
    // backgroundColor:'purple',
    borderRadius: '10px',
    fontStyle:"italic",
    alignItems:'center',
    justifyContent:'center',
    textAlign:'center',
    fontSize:'1.5rem',
    color:'white'
    
  }}>
    {
      props.text
    }
     Level:
    {
      props.level
    }
  </div>)
}



function SingleOption(props) {
  
  const username = useRecoilValue(usernameState);//just to use the var
  var handleClick = async()=> {
    const response = await axios.post(`${BASE_URL}/saveanswer`,{text:props.attempted_ans, username:username, qid:props.qid});
    console.log(response.data);//contains only true false as a answer
    // setResult(response.data.result);
    props.onResultChange(response.data.result, props.attempted_ans);
  }
  if (props.result == -1){
  return(<div >
    <button onClick={handleClick} style={{
    width:"20vw",
    minHeight:"100px",
    // background: 'linear-gradient(to right, blue, pruple) ',
    borderRadius: '10px',
    backgroundColor:"#A6674C",
    fontStyle:"italic",
    margin:"5px",
    color:'white',
    fontSize:'1.5rem',
    textAlign:"center"
  }}>{props.text }</button>   
  </div>)
  }

  else if(props.result == 2){
   
    return(<div >
      <button style={{
      width:"20vw",
      minHeight:"100px",
      backgroundColor:"gray",
      borderRadius: '10px',
      fontStyle:"italic",
      margin:"5px",
      textAlign:"center"
    }}>{props.text }</button>   
    </div>)
  }

  else if(props.result){
   
    return(<div >
      <button style={{
      width:"20vw",
      minHeight:"100px",
      backgroundColor:"green",
      fontStyle:"italic",
      borderRadius: '10px',
      margin:"5px",
      textAlign:"center"
    }}>{props.text }</button>   
    </div>)
  }

  else {
    return(<div >
      
      <button style={{
      width:"20vw",
      minHeight:"100px",
      backgroundColor:"red",
      fontStyle:"italic",
      borderRadius: '10px',
      margin:"5px",
      textAlign:"center"
    }}>{props.text }</button>   
    </div>)
  }
}


function QuestionOptions(props) {
 

  return(<div style={{
    padding:"10px"
  

  }}>
    <div style={{
      display:"flex",
      // padding:"10px"
    }}>
    <SingleOption text={props.row["a"]} qid={props.row["id"]} attempted_ans={"a"} result={props.result.a} onResultChange={props.handleResultChange} />
    <SingleOption text={props.row["b"]} qid={props.row["id"]} attempted_ans={"b"} result={props.result.b} onResultChange={props.handleResultChange} />
    </div>
    <div style={{
      display:"flex",
      // padding:"10px"
    }}>
    <SingleOption text={props.row["c"]} qid={props.row["id"]} attempted_ans={"c"} result={props.result.c} onResultChange={props.handleResultChange} />
    <SingleOption text={props.row["d"]} qid={props.row["id"]} attempted_ans={"d"} result={props.result.d} onResultChange={props.handleResultChange} />
  
    </div>
   
  </div>)


}


function OptionButton(props) {

}

function Num_attempted(props) {
  return(
  <div>
    {/* <CountdownTimer/> */}
    <div className='container my-3'>
    <h1>Level {props.num_attempted}</h1>
    
    {/* <h2>{props.num_attempted}</h2> */}
   
    </div>
   
   
  </div>
  )
}


export function SingleQuestionArea(props) {

  const [num_attempted,setNum_attempted] = useState(0);
  const handleNum_attemptedChange = (num_attempted) => {
      setNum_attempted( num_attempted );
  }


  const username = useRecoilValue(usernameState);//just to use the var

  const [result,setResult] = useState({"a":-1,"b":-1,"c":-1,"d":-1});

  console.log(result);
  const handleResultChange = (newResult,optionidx) => {
    setResult((prevResult) => ({...prevResult, [optionidx]:newResult}));
    console.log(result);
  };

  const handleLifeline50Change = (blockedButtons) => {
    setResult((prevResult) => ({...prevResult, ...blockedButtons}));
    console.log(result);//a":-1,"b":-1,"c":-1,"d":-1   in ...prev result
  };


  const allQuestions = useRecoilValue(allquestionsState);
  const questionsLoading = allQuestions.isLoading;
  const intNumber = parseInt(props.idx, 10);
  const [idx, setIdx] = useState(intNumber);
  if (questionsLoading){ 
    return;
  }
  else{
      // setIdx(intNumber);
      const row = allQuestions.data[idx];
     // console.log(row);
      const columns = Object.keys(allQuestions.data[0]);
      console.log(idx);
      console.log(allQuestions.data[idx]);

      return(
        <div style={{
          display:'flex',
          fontSize:'0.5rem'


        }}>

           <div>
              <Num_attempted num_attempted={num_attempted}/>
            <Lifeline_50 qid={allQuestions.data[idx]["id"]} handleLifeline50Change={handleLifeline50Change}/>
            
           </div>
        <div style={{
                     display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                     justifyContent: 'left',
                    height: '90vh',
                    // paddingInline:'10rem'

        }}>
          
          {/* <CountdownTimer initialTime={initialTime} handleTimerChange={handleTimerChange}/>  */}
         
          <h1>{ `-${username}`}</h1>
          <CountdownTimer/> 
          
         <QuestionText text={allQuestions.data[idx]["question"]} level={allQuestions.data[idx]["level"]}/>
          <QuestionOptions row={row} result={result} handleResultChange={handleResultChange}/> 
          <button style={{
            width:"20vw",
            minHeight:"50px",
            backgroundColor:"#5C4033",
            fontStyle:"italic",
            borderRadius: '10px',
            margin:"5px",
            color:"white",
            fontSize:"1.3rem",
            textAlign:"center"
          }} onClick={async ()=>{
                                const nextIndex= (idx + 1 ) % allQuestions.data.length;
                                // useEffect(() => {
                                     setIdx(nextIndex);
                                     setResult({"a":-1,"b":-1,"c":-1,"d":-1});
                                     const response = axios.get(`${BASE_URL}/num_attempted/${username}`)
                                     const num_attempted= (await response).data.num_attempted;
                                    setNum_attempted(num_attempted);
                                 //}, []);  
                                   }}>Next</button>
                                   
                                   

          </div>
         
        </div>
    
        )
  }

}



export function AllQuestions() {
    //const [allQuestions, setAllQuestions] = useState([]);
    const [allQuestions, setAllQuestions] = useRecoilState(allquestionsState);
    const [columns, setColumns] = useState([]);



    //asynchronous function call(result not comes imediatly)
    const init = async () => { 
      const response = await axios.get(`${BASE_URL}/allQuestions/`);//here we sent http req to server at end point BASE_URL/allQuestions
      const questions = response.data.questions; // Accessing the data correctly
      setAllQuestions({ isLoading:false, data: questions});
      setColumns(Object.keys(questions[0]));
    };
  
    useEffect(() => {
        init();
    }, []);
    //console.log(allQuestions);

        // Extract column headers from data keys
      }

function Lifeline_50(props){
 
  const [bgColor, setBgColor] = useState('#A6674C');

  const handleClick1 = () => {
    setBgColor('grey');
  };
  const [bg2Color, setBg2Color] = useState('#A6674C');

  const handleClick2 = () => {
    setBg2Color('grey');
  };
 
    return(
      <div>
      <div className='container my-3' style={{
        display: 'flex', 
        justifyContent: 'flex-end',
        float: 'left',
        display:'flex',
      justifyContent:'center',
      alignItems: 'center',
      flexDirection: 'column'
   }}>
    
    <h2 className='container my-3' style={{
        fontSize:'1.3rem',
    }}>Lifelines</h2>
    <button style ={{
        //  padding: '0.7rem 1.5rem',
         border: '#5C4033 5px solid',
         borderRadius: '5px',
        //  backgroundColor: '#77899',
        //  color: '#333',
         fontSize: '1.2rem',
         cursor: 'pointer',
         transition: 'background-color 0.3s ease',
        backgroundColor: '#A6674C',
        color: 'white',
       // padding: '10px 20px',
        // fontSize: '10px',
        display:'flexDirection',
        textAlign: 'center',
        justifyContent: 'center',
         alignItems: 'center',
        width:'150px',
        height:'70px',

        // Add other styles as needed
    }}
   // onClick={handleClick}
    
    onClick={async()=>{
      const response = await axios.get(`${BASE_URL}/getcorrectanswer/${props.qid}`,{});//here we sent http req to server at end point BASE_URL/allQuestions
      var correct_ans = response.data.mssg;
      
      var optionSet = new Set(["a", "b", "c", "d"]);
      optionSet.delete(correct_ans);
      const optionArray = [...optionSet];
      const randomElement = optionArray[Math.floor(Math.random() * optionArray.length)];
      optionSet.delete(randomElement);

      
        const blockedButtons = {};
        for (const element of optionSet) {
          blockedButtons[element] = 2;
        }
      props.handleLifeline50Change(blockedButtons);
      console.log(blockedButtons);
      

    }}>50:50</button>
    </div>
       <div className='container my-3'>
       <button onClick={handleClick2} style ={{
        //  padding: '0.7rem 1.5rem',
         border: '#5C4033 5px solid',
         borderRadius: '5px',
        //  backgroundColor: '#77899',
        //  color: '#333',
         fontSize: '1.2rem',
         cursor: 'pointer',
         transition: 'background-color 0.3s ease',
        backgroundColor: bg2Color,
        color: 'white',
       // padding: '10px 20px',
        // fontSize: '10px',
        display:'flexDirection',
        textAlign: 'center',
        justifyContent: 'center',
         alignItems: 'center',
        width:'150px',
        height:'70px',

        // Add other styles as needed
    }}>Phone a friend</button>
           </div>
           <div className='container my-3'>
           <button onClick={handleClick1}  style ={{
        //  padding: '0.7rem 1.5rem',
         border: '#5C4033 5px solid',
         borderRadius: '5px',
        //  backgroundColor: '#77899',
        //  color: '#333',
         fontSize: '1.2rem',
         cursor: 'pointer',
         transition: 'background-color 0.3s ease',
         backgroundColor: bgColor,
        color: 'white',
       // padding: '10px 20px',
        // fontSize: '10px',
        display:'flexDirection',
        textAlign: 'center',
        justifyContent: 'center',
         alignItems: 'center',
        width:'150px',
        height:'70px',

        // Add other styles as needed
    }}>Audience Poll</button>
           </div>
             </div>
    )
}

function Lifeline_area(){
  return(
   
    <div>
      
      <Lifeline_50/>
    </div>
 
  
   
  )
}

