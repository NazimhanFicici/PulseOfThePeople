import {useState, useEffect, useRef} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import { onInputChange, setReset, setTurnFlag, setStartFlag } from "../../../redux/mainTableSlice/maintableSlice"

function Answers(){

    const [answer, setAnswer] = useState("");
    const [counter, setCounter] = useState(12);
    const [resetBool,setResetBool] = useState(false);
    const inputRef = useRef();
    const dispatch = useDispatch();
    const startFlag = useSelector((state) => state.maintables.startflag);
    const gameMode = useSelector((state) => state.maintables.gamemode);
    const turnFlag = useSelector((state) => state.maintables.turnflag);
    const resetRedux = useSelector((state) => state.maintables.reset);

    var myInterval = null;

        useEffect(() => {  
            return () => {
                clearInterval(myInterval);
            }
        }, [])
        useEffect(()=>{
            if(resetRedux){
                setCounter(12);
                dispatch(setReset(false));
            }
            if(counter <0){
                let x = Math.floor(Math.random()*9);
                let y = Math.floor(Math.random()*9);
                let z = `${x}${y}123`;
                dispatch(onInputChange(z));
                setCounter(12);
             }
        },[counter])
        useEffect(() => {
            if(startFlag){
                myInterval = setInterval(() => {
                    setCounter((n) => n-1);
                },1000);
            }
            else if(!startFlag){
                clearInterval(myInterval);
            }
            return() => {
                clearInterval(myInterval);
            }
        }, [startFlag])

    const handleChange = (e) => {
        e.preventDefault();
        const data = e.target.value;
        setAnswer(data);
        
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if(gameMode===3){
            if(turnFlag){
                // console.log("turnflag is", turnFlag);
                dispatch(onInputChange(answer));
                setCounter(12);
            }
        }
        else{
            dispatch(onInputChange(answer));
            setCounter(12);
        }
        e.target.reset();
              
    }
        return (
            <div>
                <h4> REMAINING TIME : {counter}</h4>
                <form onSubmit={handleSubmit}>
                <input ref={inputRef} placeholder="Enter Answer" onChange={handleChange} />
                </form>
            </div>
        )
}

export default Answers;
