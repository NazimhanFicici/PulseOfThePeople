import { useSelector } from "react-redux";

function Singlepoints() {
   
    const pointsCollected = useSelector((state) => state.maintables.collectedPoints);
   
    return (
        <div>
            <div className="points">
                    <h4>POINTS : {pointsCollected}</h4>
            </div>  
        </div>
    )
}

export default Singlepoints;
