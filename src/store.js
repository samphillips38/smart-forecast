import { configureStore } from '@reduxjs/toolkit'

import investmentsReducer from './investmentsReducer'

const store = configureStore({
  reducer: {
    investments: investmentsReducer
  }
})

export default store