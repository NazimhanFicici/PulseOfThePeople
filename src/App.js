import {Routes, Route} from "react-router-dom";

import './App.css';
import Twoplayer from "./pages/Twoplayer"
import Singleplayer from "./pages/Singleplayer"
import Multiplayer from "./pages/Multiplayer"
import Homepage from './pages/Homepage';
import Gameover from "./pages/Gameoverpage";




function App() {

  return (
      
      <div className="App">
              
          <Routes>
            <Route path='/' element={<Homepage />}/>
            <Route path='/Homepage' element={<Homepage />}/>
            <Route path='/singleplayer' element={<Singleplayer />}/>
            <Route path='/twoplayer' element={<Twoplayer />}/>
            <Route path='/multiplayer' element={<Multiplayer />}/>
            <Route path='/gameover' element={<Gameover /> }></Route>
          </Routes>

      </div>
  );

}

export default App;
