import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    error: null,
    loading: false
  }


  const userSclice = createSlice({
    name:'user',
    initialState,
    reducers: {
        signInStart:  (state) => {
            state.loading = true;
            state.error = null;
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        signInFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
  });

  export const { signInStart, signInFailure, signInSuccess } = userSclice.actions;

  export default userSclice.reducer;