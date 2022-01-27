import { useSelector } from "react-redux";

function Duopoints() {
   
    const pointsTeam1 = useSelector((state) => state.maintables.points1);
    const pointsTeam2 = useSelector((state) => state.maintables.points2);
   
    return (
        <div>
            <div className="points">
                    <h4>TEAM-1 POINTS : {pointsTeam1}</h4>
                    <h4>TEAM-2 POINTS : {pointsTeam2}</h4>
            </div>  
        </div>
    )
}

export default Duopoints;
