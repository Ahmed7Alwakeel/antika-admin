import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IUserData } from "../../types/Interfaces";
import Cookies from "js-cookie";


interface AuthDataState {
    userToken: string | null;
    userData: IUserData;
    currentUserType: string | null;
  }
  const initialState: AuthDataState = {
    userToken: null,
    userData: {
      // Define initial properties inside the object
    },
    currentUserType: null,
  };


  const authDataSlice = createSlice({
    name: 'authData',
    initialState,
    reducers: {
      setUserToken: (state, action: PayloadAction<string | null>) => {
        state.userToken = action.payload;
      },
      setUserData: (state, action: PayloadAction<IUserData>) => {
        state.userData = action.payload;
      },
      setCurrentUserType: (state, action: PayloadAction<string | null>) => {
        state.currentUserType = action.payload;
      },
      handleUnAuthenticated: (state) => {
        state.userToken = null;
        state.userData = {
          // Define initial properties inside the object
        };
        state.currentUserType = null;
      
        // Remove cookies
        const cookies = Cookies.get();
        for (let cookie in cookies) {
          Cookies.remove(cookie);
        }
      },
    },
  });

  export const { setUserToken, setUserData, setCurrentUserType, handleUnAuthenticated } = authDataSlice.actions;
  export default authDataSlice.reducer;