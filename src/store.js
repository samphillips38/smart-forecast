import { configureStore } from '@reduxjs/toolkit'

import modelsReducer from './Reducers/modelsReducer'
import variablesReducer from './Reducers/variablesReducer'
import userReducer from './Reducers/userReducer'

const store = configureStore({
  reducer: {
    user: userReducer,
    models: modelsReducer,
    variables: variablesReducer
  }
})

export default store