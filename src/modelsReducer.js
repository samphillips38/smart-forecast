import {
    createSlice,
    createSelector,
    createAsyncThunk,
    createEntityAdapter,
} from '@reduxjs/toolkit'

import fakeGet from './fakeAPI'

const modelsAdapter = createEntityAdapter();

const initialState = modelsAdapter.getInitialState({
    status: 'idle',
    selectedModel: 0,
    variables: {status: 'idle', entities: {}},
})

// Thunk functions
export const fetchModels = createAsyncThunk('models/fetchModels', async () => {
    console.log("Loading data from API...");
    const response = await fakeGet('api/models');
    console.log("Data loaded.");
    return response
})

// export const saveNewModel = createAsyncThunk(
//     'model/saveNewModel',
//     async (text) => {
//         const initialTodo = { text }
//         const response = await client.post('/fakeApi/todos', { todo: initialTodo })
//         return response.todo
//     }
// )
const getNextVariableId = (state) => {
    const variables = Object.values(state.entities[state.selectedModel].variables.entities);
    return variables.reduce((acc, variable) => acc > variable.id ? acc : variable.id) + 1
}
const modelSlice = createSlice({
    name: 'models',
    initialState,
    reducers: {
        modelAdded: modelsAdapter.addOne,
        modelDeleted: modelsAdapter.removeOne,
        selectedModelChanged(state, action) {
            state.selectedModel = action.payload;
        },
        variableAdded(state, action) {
            const variable = action.payload;
            const newId = getNextVariableId(state);
            state.entities[state.selectedModel].variables.entities[newId] = {
                ...variable,
                id: newId,
                modelId: state.selectedModel
            }
        },
        variableDeleted(state, action) {
            const variableId = action.payload;
            delete state.entities[state.selectedModel].variables.entities[variableId]
        },
        variableEdited(state, action) {
            const variable = action.payload;
            state.entities[state.selectedModel].variables.entities[variable.id] = variable
        },
        variableDisplayStatusUpdated: {
            reducer(state, action) {
                const { variableId, displayStatus } = action.payload;
                const variable = state.entities[state.selectedModel].variables.entities[variableId];
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
          .addCase(fetchModels.pending, (state, action) => {
            state.status = 'loading'
          })
          .addCase(fetchModels.fulfilled, (state, action) => {
            modelsAdapter.setAll(state, action.payload)
            state.status = 'idle'
          })
        //   .addCase(saveNewTodo.fulfilled, (state, action) => {
        //     const todo = action.payload
        //     state.entities[todo.id] = todo
        //   })
      }
})

export const { 
    modelAdded, 
    modelDeleted,
    selectedModelChanged,
    variableAdded,
    variableDeleted,
    variableEdited,
    variableDisplayStatusUpdated,
 } = modelSlice.actions
export default modelSlice.reducer

// Selectors
export const {
    selectAll: selectModels,
    selectById: selectModelById,
} = modelsAdapter.getSelectors((state) => state.models)
export const selectModelIds = createSelector(
    selectModels,
    (models) => models.map((model) => model.id)
)
export const selectSelectedModel = (state) => selectModelById(state, state.models.selectedModel);
export const selectVariables = createSelector(
    selectSelectedModel,
    (selectedModel) => {
        if (selectedModel) {
            return Object.values(selectedModel.variables.entities);
        }
        return [];
    }
)
export const selectVariableIds = createSelector(
    selectVariables,
    (variables) => variables.map((variable) => variable.id)
)
export const selectConstants = createSelector(
    selectVariables,
    (variables) => variables.filter((variable) => variable.type == "Constant")
)