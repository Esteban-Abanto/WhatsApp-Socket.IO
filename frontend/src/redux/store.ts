import { configureStore } from '@reduxjs/toolkit';

import chatReducer from './reducers/chatReducer';
import userReducer from './reducers/userReducer';

export const store = configureStore({
    reducer: {
        userReducer,
        chatReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;