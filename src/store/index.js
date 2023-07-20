import {combineReducers, configureStore} from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import filterSlice from './editFilter'
import memorySlice from './memory'
import searchTextSlice from './searchText'
import storedSelectedPreorder from './storedSelectedPreorder'
import storedSelectedDirectory from './storedSelectedDirectory'

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'

const rootReducer = combineReducers({
  filter: filterSlice,
  memory: memorySlice,
  searchText: searchTextSlice,
  storedSelectedPreorder,
  storedSelectedDirectory
})

const persistConfig = {
  key: 'root',
  storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)
export default store