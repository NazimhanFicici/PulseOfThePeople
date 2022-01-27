import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { resetPoints, addPointsSolo, selectGamemode, setStartFlag } from "../../../redux/mainTableSlice/maintableSlice"
import { io } from "socket.io-client";

function QuestionTable() {

    const [jsonData, setjsonData] = useState([]);
    const [lives, setLives] = useState(0);
    const [answers,setAnswers] = useState([]);
    const [countdown, setCountdown] = useState(3);
    const takenInput = useSelector((state) => state.maintables.input);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    var turnCountdown = null;

    useEffect(() => {
      getQuestion();
      connectSocket();
      let i = 3;
      turnCountdown = setInterval(() => {
        i= i-1;
        setCountdown((n) => n-1);

        if(i === 0) {
            dispatch(setStartFlag(true));
            clearInterval(turnCountdown);
        }
        },1000)

      return()=> {
        clearInterval(turnCountdown);
        dispatch(selectGamemode(0));
    }
    },[])

    useEffect(() => {
        listAnswers(jsonData);
    },[jsonData])

    useEffect(() => {
        if(countdown===0){
            checkAnswer(takenInput);    
        }
    },[takenInput])
  
    useEffect(()=> {
        console.log(lives);
        if(lives<3){
            checkGame();
        }
        else{         
            gameOver();
        }
    },[lives])

    const gameOver = () => {
        navigate('/gameover');
    }
    const connectSocket = () => {
        const socket = io("http://localhost:8080/rooms");
        console.log("sese123");
        socket.on("connect", ()=> {
            socket.emit("custom_event", { name : "Alex", age: 25});
        })
        
    }
    const getQuestion = ()  =>  {
        
        dispatch(resetPoints());
        axios.get('/api')
            .then((response)=>{
                const data = response.data;     
                setLives(0);
                resetAll();
                console.log('DATA HAS BEEN RECEIVED');
                setjsonData(data[Math.floor(Math.random()*data.length)]);
            })
            .catch(() => {
                 console.log('DATA COULDNT RECEIVED');
            });
        }

    const checkAnswer = (input) =>{
        let x = input.toUpperCase();
        if(x !== ""){

            if(answers.includes(x)){
                let i = answers.indexOf(x);
                pointAnswer(i);
            }
            else{
                setLives(lives+1);
            }
        }
    }

    const checkGame = () => {
        
        if(lives !== 0){

            let remaining = document.getElementsByClassName(`x${lives}`);
            remaining[0].style.visibility ='visible';
        }  
        
    }

    const resetAll = () => {

        for(let i =0 ; i<6 ; i++){
            if (i <3){
                let remaining = document.getElementsByClassName(`x${i+1}`);
                remaining[0].style.visibility ='hidden';
            }
            let blocks = document.getElementsByClassName(`block-${i+1}`);
            blocks[0].style.visibility = 'hidden';
        }    

    }

    const pointAnswer=(input) =>{
        let a=`point-${input+1}`;
        console.log(a);
        let re = document.getElementById(`${a}`).innerHTML;
        let x = Number(re);
        dispatch(addPointsSolo(x));
        let blocks = document.getElementsByClassName(`block-${input+1}`);
        blocks[0].style.visibility = 'visible';
    }

    const listAnswers = (jsonData) =>{
        setAnswers([jsonData.answer1,jsonData.answer2,jsonData.answer3,jsonData.answer4,jsonData.answer5,jsonData.answer6]);
   }


    return (
        <div className="question">
         
            <h1 className='question-name'>QUESTION : {jsonData.question}</h1>
            <h2 className='question-name1'>STARTING IN {countdown}</h2>
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

            <div className="lives">
                <div className="x1">  
                    <h4>X</h4>
                </div>
                <div className="x2">
                    <h4>X</h4>
                </div>
                <div className="x3">
                    <h4>X</h4>
                </div>      
    
            </div>           
        </div>
    )
}

export default QuestionTable