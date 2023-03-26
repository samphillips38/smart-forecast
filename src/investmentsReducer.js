import {
    createSlice,
    createSelector,
    createAsyncThunk,
    createEntityAdapter,
} from '@reduxjs/toolkit'

import fakeGet from './fakeAPI'
import variablesReducer from './variablesReducer';

const investmentsAdapter = createEntityAdapter();

const initialState = investmentsAdapter.getInitialState({
    status: 'idle',
})

// Thunk functions
export const fetchInvestments = createAsyncThunk('investments/fetchInvestments', async () => {
    const response = await fakeGet('api/investments')
    return response
})

// export const saveNewInvestment = createAsyncThunk(
//     'investments/saveNewInvestment',
//     async (text) => {
//         const initialTodo = { text }
//         const response = await client.post('/fakeApi/todos', { todo: initialTodo })
//         return response.todo
//     }
// )

const investmentSlice = createSlice({
    name: 'investments',
    initialState,
    reducers: {
        investmentAdded: investmentsAdapter.addOne,
        invetsmentDeleted: investmentsAdapter.removeOne,
        variables: variablesReducer
    },
    extraReducers: builder => {
        builder
          .addCase(fetchInvestments.pending, (state, action) => {
            state.status = 'loading'
          })
          .addCase(fetchInvestments.fulfilled, (state, action) => {
            const newEntities = {}
            action.payload.forEach(investment => {
              newEntities[investment.id] = investment
            })
            state.entities = newEntities
            state.status = 'idle'
          })
        //   .addCase(saveNewTodo.fulfilled, (state, action) => {
        //     const todo = action.payload
        //     state.entities[todo.id] = todo
        //   })
      }
})

export const { investmentAdded, invetsmentDeleted } = investmentSlice.actions
export default investmentSlice.reducer