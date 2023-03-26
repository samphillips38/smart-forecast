import {
    createSlice,
    createSelector,
    createAsyncThunk,
    createEntityAdapter,
} from '@reduxjs/toolkit'

import fakeGet from './fakeAPI'

const investmentsAdapter = createEntityAdapter();

const initialState = investmentsAdapter.getInitialState({
    status: 'idle',
    displayInvestment: 0,
    variables: {status: 'idle', entities: {}},
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
        investmentDeleted: investmentsAdapter.removeOne,
        // variables: variablesReducer(state.)
        variableAdded(state, action) {
            const variable = action.payload;
            state.entities[state.displayInvestment].variables.entities[variable.id] = variable
        },
        variableDeleted(state, action) {
            const variableId = action.payload;
            delete state.entities[state.displayInvestment].variables.entities[variableId]
        },
        variableDisplayStatusUpdated: {
            reducer(state, action) {
                const { variableId, displayStatus } = action.payload;
                const variable = state.entities[state.displayInvestment].variables.entities[variableId];
                variable.displayOnDashboard = displayStatus;
            },
            prepare(variableId, displayStatus) {
                return {
                    payload: { variableId, displayStatus }
                }
            }
        }
        
    },
    extraReducers: builder => {
        builder
          .addCase(fetchInvestments.pending, (state, action) => {
            state.status = 'loading'
          })
          .addCase(fetchInvestments.fulfilled, (state, action) => {
            investmentsAdapter.setAll(state, action.payload)
            state.status = 'idle'
          })
        //   .addCase(saveNewTodo.fulfilled, (state, action) => {
        //     const todo = action.payload
        //     state.entities[todo.id] = todo
        //   })
      }
})

export const { investmentAdded, investmentDeleted, variableAdded, variableDeleted, variableDisplayStatusUpdated } = investmentSlice.actions
export default investmentSlice.reducer

// Selectors
export const {
    selectAll: selectInvestments,
    selectById: selectInvestmentsById,
} = investmentsAdapter.getSelectors((state) => state.investments)
export const selectInvestmentIds = createSelector(
    selectInvestments,
    (investments) => investments.map((investment) => investment.id)
)
export const selectDisplayingInvestment = (state) => selectInvestmentsById(state, state.investments.displayInvestment);
export const selectVariables = createSelector(
    selectDisplayingInvestment,
    (displayInvestment) => {
        if (displayInvestment) {
            return Object.values(displayInvestment.variables.entities);
        }
        return [];
    }
)
export const selectVariableIds = createSelector(
    selectVariables,
    (variables) => variables.map((variable) => variable.id)
)