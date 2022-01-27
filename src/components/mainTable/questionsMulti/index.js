import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { resetPoints, setReset, setTurnFlag, setName1, setName2, addPointsTeam1, addPointsTeam2, setStartFlag, selectGamemode } from "../../../redux/mainTableSlice/maintableSlice"
import { io } from "socket.io-client";

function QuestionTable() {

    const [jsonData, setjsonData] = useState([]);
    const [answers,setAnswers] = useState([]);
    const [turn, setTurn] = useState(0);
    const [countdown, setCountdown] = useState(3);
    const [turnCount, setTurnCount] = useState(1);
    const [playerFlag, setPlayerFlag] = useState(false); 
    const [questionNum, setQuestionNum] = useState(-1);
    
    const inputRef = useRef();
    const socketRef = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const takenInput = useSelector((state) => state.maintables.input);
    const Name = useSelector((state) => state.maintables.name);
    const roomName = useSelector((state) => state.maintables.roomName);
    const turnFlag = useSelector((state) => state.maintables.turnflag);
    
    var dummyQuestionNum = -1;
    var a = "";
    var dummyBoolean = false;
    var turnCountdown = null;
    var ses1 = 0;
    

    useEffect(() => {
        inputRef.current.style.visibility="hidden";
        socketRef.current=io("http://localhost:8080/");
        connectSocket();
        setCountdown(3);
      return() => {
          dispatch(selectGamemode(0));
          socketRef.current.disconnect();
      }
    },[])

    useEffect (()=> {
        if(questionNum>-1){
            let i = 3;
            getQuestion(questionNum);
            inputRef.current.style.visibility="visible";
            socketRef.current.emit("custom","vallageldi");
            turnCountdown = setInterval(() => {
                i= i-1;
                setCountdown((n) => n-1);
                if(i === 0) {
                    dispatch(setStartFlag(true));
                    clearInterval(turnCountdown);
                    inputRef.current.style.visibility="hidden";
                }
            },1000)
        }
    }, [questionNum])

    useEffect(() => {
        listAnswers(jsonData);
    },[jsonData])

    useEffect(() => {
        console.log("**************turncount:   " + turnCount);
        
        checkAnswer(takenInput);
        if(countdown===0){
            console.log(takenInput);
            checkAnswer(takenInput);
            setTurnCount(turnCount+1);
        }
        if(turnCount===11){
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
    
    const getQuestion = (input)  =>  {
        
        dispatch(resetPoints());
        dispatch(setStartFlag(false));
        axios.get('/api')
            .then((response)=>{
                const data = response.data;     
                resetAll();
                console.log('DATA HAS BEEN RECEIVED');
                    setjsonData(data[input]);
                
                
            })
            .catch(() => {
                 console.log('DATA COULDNT RECEIVED');
            });
        }

        // SOCKET IO
        
    const connectSocket = () => {
        socketRef.current.emit("joinRoom",{roomName , Name});

        socketRef.current.on("newUser", (name) => {

            a=name.a;
            dummyQuestionNum = Math.floor(Math.random()*3);
            dispatch(setName1(a));
            socketRef.current.emit("firstData", {roomName, name});
            dummyBoolean = name.b;
            setPlayerFlag(dummyBoolean);
        });
            socketRef.current.on("timeoutS",()=>{
            // console.log("a Data:", a);
            if(dummyBoolean){
                socketRef.current.emit("nameOneC",{a, dummyQuestionNum});  
              setQuestionNum(dummyQuestionNum);
            }
        })

        socketRef.current.on("newUser2",(name) => {
            dispatch(setTurnFlag(dummyBoolean));
            // console.log("dummybool is", dummyBoolean);
            dispatch(setName2(name.a));
            const timer = setTimeout(() => {
                // console.log("timer");
                socketRef.current.emit("timeoutC",()=>{

                })
              }, 600);

        });
        
        socketRef.current.on("nameOneS", (data) => {
            // console.log("nameone Data:",data);
            // console.log("dummyNum Data:",data.dummyQuestionNum);
            if(!dummyBoolean){
                dispatch(setName1(data.a));
                setQuestionNum(data.dummyQuestionNum);
            }
        });
        
        socketRef.current.on("switchTurnS", (data)=> {
            dispatch(setTurnFlag(true));
            dispatch(setReset(true));
            // console.log("turnSwitched received tag", turnFlag);
        })

        socketRef.current.on("pointsS", (data)=> {
            console.log("points ", data.input);
            console.log(data.playerFlag);
            let a=`point-${data.input+1}`;
            let re = document.getElementById(`${a}`).innerHTML;
            let x = Number(re);
            if(!data.playerFlag){
                dispatch(addPointsTeam2(x));
            }
            else {
                dispatch(addPointsTeam1(x));
            }
            let blocks = document.getElementsByClassName(`block-${data.input+1}`);
            blocks[0].style.visibility = 'visible';
        })

        socketRef.current.on("disconnect", ()=> {
            dispatch(setName1(""));
            dispatch(setName2(""));
            dummyBoolean = false;
            setQuestionNum(-1);
        })

        socketRef.current.on("roomFull",(data) => {
            console.log(data);
                if(socketRef.current.id===data.dummyID){
                    // HERE MAKE THE REDIRECTION
                    console.log(data.dummyRoom, "is full");
                }
        });  
        
    }
    
    const checkAnswer = (input) =>{
        // console.log("switchingTurns sender tag: ", playerFlag);
        socketRef.current.emit("switchTurnC", playerFlag);
        dispatch(setTurnFlag(false));
        let x = input.toUpperCase();        
        if(x !== ""){
            if(answers.includes(x)){
                let i = answers.indexOf(x);
                pointAnswer(i);
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
        console.log("playerflag is" ,playerFlag);
        let re = document.getElementById(`${a}`).innerHTML;
        let x = Number(re);        
        let blocks = document.getElementsByClassName(`block-${input+1}`);
        if(blocks[0].style.visibility === 'hidden'){
            blocks[0].style.visibility = 'visible';
            if(playerFlag){
                socketRef.current.emit("pointsC", {input , playerFlag});
                dispatch(addPointsTeam1(x));
            }
            else{
                socketRef.current.emit("pointsC", {input , playerFlag});
                dispatch(addPointsTeam2(x));
            }
        }   
    }

    const listAnswers = (jsonData) =>{
        setAnswers([jsonData.answer1,jsonData.answer2,jsonData.answer3,jsonData.answer4,jsonData.answer5,jsonData.answer6]);
    }

    return (
        <div className="question">
         <h1 ref={inputRef} className='question-name1'> STARTING IN : {countdown} </h1>
            <h1 className='question-name'>QUESTION : {jsonData.question}</h1>

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