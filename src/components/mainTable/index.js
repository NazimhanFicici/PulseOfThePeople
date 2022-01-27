import QuestionsSolo from "./questionsSolo";
import QuestionsDuo from "./questionsDuo";
import QuestionsMulti from "./questionsMulti"
import Answer from "./answers";
import Singlepoints from "./pointsSolo";
import Duopoints from "./pointsDuo";
import Multipoints from "./pointsMulti"
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {setStartFlag} from "../../redux/mainTableSlice/maintableSlice";

function Maintable() {

  const dispatch = useDispatch();
  const gameCode = useSelector((state)=> state.maintables.gamemode);
  const navigate = useNavigate();

  const resetTurnFlag = () =>{
    dispatch(setStartFlag(false));
  }

  switch(gameCode){
    case 0: 
      navigate('/Homepage');
    break;
    case 1:
      console.log("case1");
      return (
        <div>
          <QuestionsSolo />
          <Answer />
          <Singlepoints />
          <Link to="/gameover">Give Up</Link>
        </div>
    );
    case 2:
      return (
        <div>
          <QuestionsDuo />
          <Answer />
          <Duopoints />
          <Link to="/gameover" onClick={resetTurnFlag}>Give Up(2p)</Link>
        </div>
    );
    case 3:
      return (
        <div>
          <QuestionsMulti />
          <Answer />
          <Multipoints />
          <Link to="/gameover" onClick={resetTurnFlag}>Give Up(2p)</Link>
        </div>
      )
    default:
      console.log("boom");
      return null;
  
  }
  
}

export default Maintable;