import { Link } from "react-router-dom";
import { useState, useEffect} from "react";
import { useDispatch} from "react-redux";
import { selectGamemode } from "../redux/mainTableSlice/maintableSlice";

import Maintable from "../components/mainTable";



const Twoplayer = () => {

    const [startBool, setstartBool] = useState(false);
    
    const dispatch = useDispatch();
    dispatch(selectGamemode(2));

    useEffect(()=>{
        return setstartBool(false);
    },[])

    const startGame= () => {
        setstartBool(true)
    }

    switch(startBool){
        case false: 
            return(
                <section>
                    <h1> HOW TO PLAY AS 2 PLAYER</h1>
                    <h3>In the Twoplayer version, you have to answer the questions with your best.<br></br>
                        To start the game first you have to click the button at the top of the screen and<br></br>
                        Press either 'A' or 'L' button to select the one who is the starting team,<br></br>
                        The first one to press button starts answering first<br></br>
                        You need to type your answer to the block that is under the questions.<br></br>
                        After giving an answer the turn passes to the other team<br></br>
                        Both of you have three lives when one of you fails three times or <br></br>
                        After all the popular answers are given the game is over<br>
                        </br> the game is over.
                    </h3>
                    <Link to="/">Return to Home Page</Link>
                    <br />
                    <br />
                    <button onClick={startGame}>Start the Game</button>
                    <br /> 
                </section>
            )
        case true:
          return (
            <div>
              <Maintable />
            </div>
        );
        default:
          return null;
      
      }
};

export default Twoplayer;
