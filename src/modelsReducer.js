import {
    createSlice,
    createSelector,
    createAsyncThunk,
    createEntityAdapter
} from '@reduxjs/toolkit'

import fakeGet from './fakeAPI'
import { getNextVariableId } from './Utility';
import { fetchVariables } from './api';

const modelsAdapter = createEntityAdapter();

const initialState = modelsAdapter.getInitialState({
    status: 'idle',
    selectedModel: 0,
    variables: {status: 'idle', entities: {}},
})

// Thunk functions
export const fetchModels = createAsyncThunk('models/fetchModels', async () => {
    console.log("Loading data from API...");
    // const response = await fakeGet('api/models');
    const response = await fetchVariables(0)
    console.log(response)
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

const modelSlice = createSlice({
    name: 'models',
    initialState,
    reducers: {
        modelAdded: modelsAdapter.addOne,
        modelDeleted: modelsAdapter.removeOne,
        modelEdited: modelsAdapter.upsertOne,
        selectedModelChanged(state, action) {
            state.selectedModel = action.payload;
        },
        variableAdded(state, action) {
            const {model, variable} = action.payload;
            const newId = getNextVariableId(model);
            state.entities[model.id].variables.entities[newId] = {
                ...variable,
                id: newId,
                modelId: model.id
            };
        },
        variableDeleted(state, action) {
            const {model, variable} = action.payload;
            if (model.dashboardLayout) {
                const newList = model.dashboardLayout.layout.filter((layout) => {
                    return !(layout.type == "Variable Graph" && layout.varId == variable.id)
                });
                state.entities[model.id].dashboardLayout.layout = newList;
            }
            delete state.entities[model.id].variables.entities[variable.id];
        },
        variableEdited(state, action) {
            const {model, variable} = action.payload;
            state.entities[model.id].variables.entities[variable.id] = variable
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
    modelEdited,
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
export const selectVariableById = (state, modelId, varId) => {
    return state.models.entities[modelId].variables.entities[varId];
}
export const selectConstants = createSelector(
    selectVariables,
    (variables) => variables.filter((variable) => variable.type == "Constant")
)