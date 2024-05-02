import {configureStore} from '@reduxjs/toolkit'
import rootReducer from './reducers/root-reducer'
import { socketMiddleware } from './middlewares/socketMiddleware';


const wsActions = {
    wsConnection: 'orderState/setWebsocketConnection',
    wsOffline: 'orderState/setWebsocketOffline',
    wsOpen: 'orderState/setWebsocketOpen',
    wsError: 'orderState/setWebsocketConnectionError',
    wsMessage: 'orderState/setWebsocketGetOrders',
    wsClose: 'orderState/setWebsocketClose',
}

const store = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(socketMiddleware(wsActions)),
    });
}

export default store;