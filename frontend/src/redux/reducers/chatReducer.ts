import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import IChat from '../../interfaces/IChat';
import IMessage from '../../interfaces/IMessage';

interface IChatMap {
    currentChatID: string,
    chatMap: {
        [key: string]: IChat
    }
}

const initialState: IChatMap = {
    currentChatID: 'global',
    chatMap: {
        'global': {
            id: "global",
            messages: []
        }
    }
}

export const chatMap = createSlice({
    name: "chatMap",
    initialState,
    reducers: {
        setCurrentChatID: (state, action: PayloadAction<string>) => {
            state.currentChatID = action.payload;
        },

        createChat: (state, action: PayloadAction<string>) => {

            const userId = action.payload;
            const updatedChatMap = { ...state.chatMap };
            if (!updatedChatMap[userId]) {
                updatedChatMap[userId] = { id: userId, messages: [] };
            }

            state.chatMap = updatedChatMap;
            state.currentChatID = userId;
        },

        addNewMessage: (state, action: PayloadAction<IMessage>) => {

            const chatId = action.payload.recipient;

            const updatedChatMap = { ...state.chatMap };
            if (!updatedChatMap[chatId]) {
                updatedChatMap[chatId] = { id: chatId, messages: [] };
            }

            updatedChatMap[chatId] = {
                ...updatedChatMap[chatId],
                messages: [...updatedChatMap[chatId].messages, action.payload],
            };

            state.chatMap = updatedChatMap;
        }
    }
});

export const { setCurrentChatID, createChat, addNewMessage } = chatMap.actions;

export default chatMap.reducer;