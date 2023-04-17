import { configureStore } from '@reduxjs/toolkit'

import modelsReducer from './modelsReducer'

const store = configureStore({
  reducer: {
    models: modelsReducer
  }
})

export default store