import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { updateUserInfo } from '../../services/Sockets/socketApi';

import { generateRandomUserName } from '../../utils/random';

import IUser from '../../interfaces/IUser';

interface IUserMap {
    myInfo: IUser;
    userMap: { [key: string]: IUser };
}

const initialState: IUserMap = {
    myInfo: {
        id: '',
        userName: generateRandomUserName()
    },
    userMap: {},
};

export const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {

        setUserMap: (state, action: PayloadAction<IUser[]>) => {

            console.log(action.payload);

            const userMap: { [key: string]: IUser } = {};
            action.payload.forEach((userInfo) => {
                userMap[userInfo.id] = userInfo;
            });
            state.userMap = userMap;
        },

        saveUser: (state, action: PayloadAction<IUser>) => {

            console.log(action.payload);

            const { id } = action.payload;
            state.userMap[id] = action.payload;
        },

        removeUser: (state, action: PayloadAction<string>) => {
            const userId = action.payload;
            if (state.userMap.hasOwnProperty(userId)) {
                delete state.userMap[userId];
                console.log(`user remove: ${userId}`);
            }
        },


        setUserId: (state, action: PayloadAction<string>) => {
            state.myInfo.id = action.payload;
            updateUserInfo(state.myInfo);
            
            console.log(state.myInfo);

        },
        setUserName: (state, action: PayloadAction<string>) => {
            state.myInfo.userName = action.payload;
            updateUserInfo(state.myInfo);

            console.log(state.myInfo);

        },
    }
});


export const { setUserMap, saveUser, removeUser, setUserId, setUserName } = userSlice.actions;

export default userSlice.reducer;