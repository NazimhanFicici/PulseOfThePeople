import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Gameoverpage = () => {

    const finalPoints = useSelector((state) => state.maintables.collectedPoints);

    return(
        <section>
            <h1> Game Over</h1>
            <h1> Total Points : {finalPoints} </h1>
            <br />
            <br />
            <br />
                <h3><Link to="/">Return to Home Page</Link></h3>
            
        </section>
    );
};

export default Gameoverpage;