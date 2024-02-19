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
            unreadMessages: 0,
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
                updatedChatMap[userId] = { id: userId, unreadMessages: 0, messages: [] };
            }

            state.chatMap = updatedChatMap;
            state.currentChatID = userId;
        },

        addNewMessage: (state, action: PayloadAction<IMessage>) => {

            const chatId = action.payload.recipient;
            const newChatMap = { ...state.chatMap };

            // Verifica si el chat existe sino lo crea
            if (!newChatMap[chatId]) {
                newChatMap[chatId] = { id: chatId, unreadMessages: 0, messages: [] };
            }

            // Agregar el mensaje al chat
            newChatMap[chatId].messages.push(action.payload);

            // Incrementar el contador de mensajes no leídos si el chat no es el actual
            if (state.currentChatID !== chatId) {
                newChatMap[chatId] = {
                    ...newChatMap[chatId],
                    unreadMessages: newChatMap[chatId].unreadMessages + 1,
                };
            }

            // Mover el chat al principio del chatMap
            const currentChat = newChatMap[chatId];
            const globalChat = newChatMap['global'];
            delete newChatMap[chatId];
            delete newChatMap['global'];
            const updatedChatMap = { ['global']: globalChat, [chatId]: currentChat, ...newChatMap };

            // Actualizar el chatMap
            state.chatMap = updatedChatMap;
        },


        resetUnreadMessages: (state, action: PayloadAction<string>) => {
            const chatId = action.payload;

            const updatedChatMap = { ...state.chatMap };
            if (!updatedChatMap[chatId]) return;

            updatedChatMap[chatId] = {
                ...updatedChatMap[chatId],
                unreadMessages: 0
            }

            state.chatMap = updatedChatMap;
        }
    }
});

export const { setCurrentChatID, createChat, addNewMessage, resetUnreadMessages } = chatMap.actions;

export default chatMap.reducer;