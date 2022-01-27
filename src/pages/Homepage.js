import { Link } from "react-router-dom";

const Homepage = () => {    

    return(
        <section>
            <h1> Welcome To The Pulse of The People</h1>
            <h3> <br></br><br></br>In the Pulse of the People , we surveyed people asked 100 different people same question
                 and collected the 6 popular answers.<br></br> Here in the pulse of the people you are meant to
                 find the most popular answers and collect points.<br></br><br></br><br></br> You can Measure the Pulse of The People
                 <br></br><br></br>
                 <Link to="/singleplayer"> By Yourself, </Link> <br></br><br></br>
                 <Link to="/twoplayer"> With Your Friends Locally</Link> <br></br>or<br></br>
                <Link to="/multiplayer">You Can Measure It Online With a Friend</Link>
            </h3>
        </section>
    );
};

export default Homepage;
