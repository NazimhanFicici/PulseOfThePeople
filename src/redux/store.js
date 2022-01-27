// input take from main table=>edit on answer=>
// send the edited version to questions=>
// points from questions to gameoverpage 
//
import { configureStore } from "@reduxjs/toolkit";
import maintableSlice from "./mainTableSlice/maintableSlice"

export const store = configureStore({
    reducer: {
        maintables : maintableSlice,
    },
})