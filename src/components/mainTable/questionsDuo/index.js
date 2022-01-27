import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { resetPoints, addPointsTeam1, addPointsTeam2, setStartFlag, selectGamemode } from "../../../redux/mainTableSlice/maintableSlice"


function QuestionTable() {

    const [jsonData, setjsonData] = useState([]);
    const [answers,setAnswers] = useState([]);
    const [turn, setTurn] = useState(0);
    const [countdown, setCountdown] = useState(3);
    const [turnCount, setTurnCount] = useState(1);
    
    const inputRef = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const takenInput = useSelector((state) => state.maintables.input);

    var turnCountdown = null;

    useEffect(() => {
      getQuestion();
      setCountdown(3);
      let i = 3;
      inputRef.current.focus();
      inputRef.current.addEventListener('keypress', (event) =>{
        
        if(event.key==='a'){
            console.log("teamleft");
            inputRef.current.style.visibility= "hidden";
            
            setTurn(1);
            turnCountdown = setInterval(() => {
                i= i-1;
                setCountdown((n) => n-1);
                if(i === 0) {
                    dispatch(setStartFlag(true));
                    clearInterval(turnCountdown);
                }
            },1000)
            
        }
        
        if(event.key==='l'){
            console.log("teamright");
            inputRef.current.style.visibility= "hidden";

            setTurn(2);
            turnCountdown = setInterval(() => {
                i= i-1;
                setCountdown((n) => n-1);
                if(i === 0) {
                    dispatch(setStartFlag(true));
                    clearInterval(turnCountdown);
                }
            },1000)
        }
        else{
           console.log(event);    
        }
 
          
      })
      return() => {
          clearInterval(turnCountdown);
          dispatch(selectGamemode(0));
      }
    },[])

    useEffect(() => {
        listAnswers(jsonData);
    },[jsonData])

    useEffect(() => {
        console.log("**************turncount:   " + turnCount);
        
        if(countdown===0){
            console.log(takenInput);
            checkAnswer(takenInput);
            setTurnCount(turnCount+1);
        }
        if(turnCount===6){
            let i = 1;
            let dummyInterval = setInterval(()=>{
                i=i-1;
                if(i===0){
                    clearInterval(dummyInterval);
                    navigate('/gameover');
                }
            },1000)
        }
    },[takenInput])

    const getQuestion = ()  =>  {
        
        dispatch(resetPoints());
        dispatch(setStartFlag(false));
        axios.get('/api')
            .then((response)=>{
                const data = response.data;     
                resetAll();
                console.log('DATA HAS BEEN RECEIVED');
                setjsonData(data[Math.floor(Math.random()*data.length)]);
            })
            .catch(() => {
                 console.log('DATA COULDNT RECEIVED');
            });
        }

    const checkAnswer = (input) =>{
        setTurn(turn+1);
        console.log(turn%2);
        let x = input.toUpperCase();
        if(x !== ""){

            if(answers.includes(x)){
                let i = answers.indexOf(x);
                pointAnswer(i);
            }
            else{
              
            }
        }

        

    }

    const resetAll = () => {
        for(let i =0 ; i<6 ; i++){
            let blocks = document.getElementsByClassName(`block-${i+1}`);
            blocks[0].style.visibility = 'hidden';
        }    
    }

    const pointAnswer=(input) =>{
        let a=`point-${input+1}`;
        console.log(a);
        let re = document.getElementById(`${a}`).innerHTML;
        let x = Number(re);
        if(turn%2===0){
            dispatch(addPointsTeam1(x));
        }
        else{
            dispatch(addPointsTeam2(x));
        }
        let blocks = document.getElementsByClassName(`block-${input+1}`);
        blocks[0].style.visibility = 'visible';
    }

    const listAnswers = (jsonData) =>{
        setAnswers([jsonData.answer1,jsonData.answer2,jsonData.answer3,jsonData.answer4,jsonData.answer5,jsonData.answer6]);
    }


    return (
        <div className="question">
         <button id="1" ref= {inputRef}> LEFT TEAM</button>
         <h1 className='question-name'>  countdown: {countdown} </h1>
            <h1 className='question-name1'>QUESTION : {jsonData.question}</h1>

            <div className="questions">

                <div className="questions-1">

                    <div className ="block-1 answerblock">
                       <h4>{jsonData.answer1}</h4>
                        <h4 id ="point-1">{jsonData.points1}</h4>
                    </div>
                                   
                    <div className ="block-2 answerblock">
                       <h4>{jsonData.answer2}</h4>
                        <h4 id ="point-2">{jsonData.points2}</h4>
                    </div>

                    <div className ="block-3 answerblock">
                       <h4>{jsonData.answer3}</h4>
                        <h4 id ="point-3">{jsonData.points3}</h4>
                    </div>
                </div>

                <div className="questions-2">

                    <div className ="block-4 answerblock">
                       <h4>{jsonData.answer4}</h4>
                        <h4 id ="point-4">{jsonData.points4}</h4>
                    </div>

                    <div className ="block-5 answerblock">
                       <h4>{jsonData.answer5}</h4>
                        <h4 id ="point-5">{jsonData.points5}</h4>
                    </div>

                    <div className ="block-6 answerblock">
                       <h4>{jsonData.answer6}</h4>
                        <h4 id ="point-6">{jsonData.points6}</h4>
                    </div>
                </div>   
            </div>
        </div>
    )
    
}

export default QuestionTable