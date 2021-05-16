import { createSlice } from '@reduxjs/toolkit';
import { removeUserFromLocalStorage } from 'utilities/utilities';



export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
    },
    reducers: {
        authenticate: (state) => {
            state.isLoggedIn = true;
        },
        logout: (state) => {
            state.isLoggedIn = false;
        }
    }

})

const { actions, reducer } = authSlice;

export const { authenticate, logout } = actions;

export const logOutAction = () => {
    return (dispatch) => {
        removeUserFromLocalStorage();
        dispatch(logout());
    }
}


export default reducer;
