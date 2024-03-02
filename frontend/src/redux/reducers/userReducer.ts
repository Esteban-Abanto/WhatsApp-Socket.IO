import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { updateUserInfo } from '../../services/Sockets/socketApi';

import { generateRandomImageId, generateRandomUserName } from '../../utils/random';

import IUser from '../../interfaces/IUser';

interface IUserMap {
    myInfo: IUser;
    userMap: { [key: string]: IUser };
}

const initialState: IUserMap = {
    myInfo: {
        id: '',
        imgId: generateRandomImageId(),
        userName: generateRandomUserName()
    },
    userMap: {},
};

export const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {

        setUserMap: (state, action: PayloadAction<IUser[]>) => {
            const userMap: { [key: string]: IUser } = {};
            action.payload.forEach((userInfo) => {
                userMap[userInfo.id] = userInfo;
            });
            state.userMap = userMap;
        },

        saveUser: (state, action: PayloadAction<IUser>) => {
            const { id } = action.payload;
            state.userMap[id] = action.payload;
        },

        removeUser: (state, action: PayloadAction<string>) => {
            const userId = action.payload;
            if (state.userMap.hasOwnProperty(userId)) {
                delete state.userMap[userId];
            }
        },


        setUserId: (state, action: PayloadAction<string>) => {
            state.myInfo.id = action.payload;
            updateUserInfo(state.myInfo);
        },
        setUserImgId: (state, action: PayloadAction<number>) => {
            console.log(action.payload);
            
            state.myInfo.imgId = action.payload;
            updateUserInfo(state.myInfo);
        },
        setUserName: (state, action: PayloadAction<string>) => {
            state.myInfo.userName = action.payload;
            updateUserInfo(state.myInfo);
        },
    }
});


export const { setUserMap, saveUser, removeUser, setUserId, setUserImgId, setUserName } = userSlice.actions;

export default userSlice.reducer;