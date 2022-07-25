import { createSlice } from "@reduxjs/toolkit";
import { useDispatch } from 'react-redux';
const initialState = {
    staffs:[],
    activeStaff:[],
}



export const staffSlice = createSlice({
    name:"staffState",
    initialState,
    reducers:{
        getStaff: (state) => {
            
        },
        creatStaff: (state, action) => {
            console.log(action)
            state.staffs.push(action.payload)

        },
        updateStaff:(state) => {

        },
        deleteStaff: (state) => {

        },
        storeActiveStaff: (state) => {

        }
    }
})
export const {getStaff, creatStaff, updateStaff, storeActiveStaff} = staffSlice.actions
export default staffSlice.reducer