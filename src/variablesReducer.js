import {
    createSlice,
    createSelector,
    createAsyncThunk,
    createEntityAdapter,
} from '@reduxjs/toolkit'

import fakeGet from './fakeAPI'

const variablesAdapter = createEntityAdapter();

const initialState = variablesAdapter.getInitialState({
    state: 'idle',
})

// Thunk functions
export const fetchVariables = createAsyncThunk(
    'variables/fetchVariables', 
    async (investmentId) => {
        const response = await fakeGet('api/variables', investmentId);
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

const variablesSlice = createSlice({
    name: 'variables',
    initialState,
    reducers: {
        variableAdded: variablesAdapter.addOne,
        variableDeleted: variablesAdapter.removeOne,
        editVariable(state, action) {
            const variable = action.payload;
            state.entities[variable.id] = variable;
        }
    }
})

export const { variableAdded, variableDeleted, editVariable } = variablesSlice.actions
export default variablesSlice.reducer

// Selectors
export const {
    selectAll: selectVariables,
    selectById: selectVariablesById,
} = investmentsAdapter.getSelectors((state) => state.investments.entities[state.investments.displayInvestment].variables)
export const selectVariableIds = createSelector(
    selectVariables,
    (variables) => variables.map((variable) => variable.id)
)