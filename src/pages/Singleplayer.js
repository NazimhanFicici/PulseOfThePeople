import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { selectGamemode } from "../redux/mainTableSlice/maintableSlice";
import Maintable from "../components/mainTable"

const Singleplayer = () => {

    const [startBool, setstartBool] = useState(false);

    const dispatch = useDispatch();
    dispatch(selectGamemode(1));
    
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
                    <h1> HOW TO PLAY AS SINGLE PLAYER</h1>
                    <h3>In the Singleplayer version, you have to answer the questions with your best.<br></br>
                        You need to type your answer to the block that is under the questions.<br></br>
                        You have three lives when you fail three times or after you give all popular answers<br>
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

export default Singleplayer;
