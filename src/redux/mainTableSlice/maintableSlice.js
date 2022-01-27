import { createSlice } from "@reduxjs/toolkit";

export const maintableSlice = createSlice({

    name: 'maintables',
    initialState: {
        collectedPoints: 0,
        input: "",
        gamemode: 0,
        name1:"",
        name2:"",
        points1: 0,
        points2: 0,
        startflag: false,
        roomName:"",
        name:"",
        turnflag:false,
        reset:false,

    },
    reducers: {
        // METHODS HERE 
        resetPoints: (state) => {
            state.collectedPoints = 0;
            state.points1 = 0;
            state.points2 = 0;
        },
        setTurnFlag: (state, action) => {
            state.turnflag= action.payload;
        },
        setReset: (state, action) => {
            state.reset = action.payload;
        },
        onInputChange: (state, action) => {
            state.input = action.payload;
        },
        selectGamemode: (state, action) => {
            state.gamemode = action.payload;
        },
        addPointsSolo: (state, action) => {
            state.collectedPoints = state.collectedPoints + action.payload;
        },
        addPointsTeam1: (state, action) => {
            state.points1 = state.points1 + action.payload;
        },
        addPointsTeam2: (state, action) => {
            state.points2 = state.points2 + action.payload;
        },
        setStartFlag: (state, action) =>   {
            state.startflag = action.payload;
        },
        setName: (state,action) => {
            state.name = action.payload;
        },
        setName1: (state,action) => {
            state.name1 = action.payload;
        },
        setName2: (state,action) => {
            state.name2 = action.payload;
        },
        setRoomName: (state,action)=>{
            state.roomName = action.payload;
        },
    },

});

export const { setTurnFlag,setReset, setName, setName1, setName2, setRoomName, resetPoints, onInputChange, setStartFlag, selectGamemode, addPointsSolo, addPointsTeam1, addPointsTeam2 } = maintableSlice.actions;
export default maintableSlice.reducer;