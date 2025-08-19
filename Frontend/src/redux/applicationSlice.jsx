import { createSlice } from "@reduxjs/toolkit";

const applicationSlice=createSlice({
    name:"application",
    initialState:{
        // loading:false,
        applicants:[]
    },
    reducers:{
        setAllApplicants:(state,action) =>{
            state.applicants =action.payload;
        },
        // setUser:(state,action)=>{
        //     state.user=action.payload
        // }
    }
})

export const {setAllApplicants} =applicationSlice.actions;

export default applicationSlice.reducer;