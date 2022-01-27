import { Link } from "react-router-dom";
import { useState, useEffect, useRef} from "react";
import { useDispatch} from "react-redux";
import { selectGamemode,setName,setRoomName } from "../redux/mainTableSlice/maintableSlice";

import Maintable from "../components/mainTable";



const Multiplayer = () => {

    const [startFlag, setstartFlag] = useState(0);
    const [dummyName,setDummyName] = useState("");
    const [dummyRoomName, setDummyRoomName] = useState("");
    const roomRef = useRef();
    const nameRef = useRef();
    

    const dispatch = useDispatch();
    dispatch(selectGamemode(3));

    useEffect(()=>{
        console.log("mounted the multiplayer")
        return() => {
            console.log("unmounted the multipage")
            setstartFlag(0);
        }    
    },[])

    const startGame= () => {
        if(dummyName && dummyRoomName){
            if("" === dummyRoomName){
                setstartFlag(1);
            }
            else{
                dispatch(setName(dummyName));
                dispatch(setRoomName(dummyRoomName));
                // console.log(dummyName,dummyRoomName);
                setstartFlag(2);
            }
         
        }
    }

    const handleRoom = (e) => {
        e.preventDefault();
        setDummyRoomName(e.target.value);
    }
    const handleName = (e) => {
        e.preventDefault();
        setDummyName(e.target.value);
    }
    const resetPage = () => {
        setstartFlag(0);
    }
    switch(startFlag){
        case 0: 
            return(
                <section>
                    <h1> HOW TO PLAY AS 2 PLAYER</h1>
                    <h3>In the Multiplayer version, you have to answer the questions with your best.<br></br>
                        In order to play with your friend both of you have to enter the same RoomID <br></br>
                        Game only starts if there are 2 players and <br></br>
                        The starting player is always the one who creates the Lobby<br></br>
                        You need to type your answer to the block that is under the questions.<br></br>
                        You have three lives when you fail three times or after you give all popular answers<br>
                        </br> the game is over.
                    </h3>
                    <Link to="/">Return to Home Page</Link>
                    <br />
                    <br />
                    <form>
                        <input ref= {nameRef} placeholder="Enter Your Name" onChange={handleName}></input>
                        <input ref= {roomRef} placeholder="Enter The Room Name" onChange={handleRoom}></input>
                    </form>
                    <button onClick={startGame}>Start the Game</button>
                    <br /> 
                </section>
            )
        case 1:
            return(
                <section>
                    <alert onClick={resetPage}>The Room is Full</alert>
                </section>
            )
        case 2:
            
          return (
            <div>
              <Maintable />
            </div>
        );
        default:
          return null;
      
      }
};

export default Multiplayer;
