import {
    createSlice,
    createSelector,
    createAsyncThunk,
    createEntityAdapter
} from '@reduxjs/toolkit'

import fakeGet from '../fakeAPI'
import { getNextVariableId } from '../Utility';
import { fetchVariables, fetchModels, runModel, runModel2 } from '../api';

const modelsAdapter = createEntityAdapter();

const initialState = modelsAdapter.getInitialState({
    status: 'idle',
    selectedModel: 0,
    variables: {status: 'idle', entities: {}},
})

// Thunk functions
export const fetchModelsThunk = createAsyncThunk('models/fetchModels', async () => {
    console.log("Loading data from API...");
    const response = await fetchModels()
        .then(response => response.json())
        .then(data => Object.values(data.models.entities))
    console.log("Data loaded.")
    return response
})

export const runModelsThunk = createAsyncThunk(
    'models/runModel', 
    async (model) => {
        console.log("Running model...");
        const response = await runModel2(model)
        console.log(response)
        console.log("Model Run Complete.");
        return response
    }
)

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
          .addCase(fetchModelsThunk.pending, (state, action) => {
            state.status = 'loading'
          })
          .addCase(fetchModelsThunk.fulfilled, (state, action) => {
            modelsAdapter.setAll(state, action.payload)
            state.status = 'idle'
          })
          .addCase(runModelsThunk.pending, (state, action) => {
            const model = state.entities[state.selectedModel]
            state.entities[model.id] = {
                ...model,
                status: 'Running'
            }
          })
          .addCase(runModelsThunk.fulfilled, (state, action) => {
            state.entities[action.payload.id] = action.payload
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
export const selectVariableById = createSelector(
    [selectVariables, (state, varId, modelId) => (varId, modelId)],
    (variables, varId, modelId) => variables.find(el => el.id == varId && el.modelId == modelId)
);

(state, {varId, modelId}) => {
    console.log(state)
    return state.models.entities[modelId].variables.entities[varId];
}
export const selectConstants = createSelector(
    selectVariables,
    (variables) => variables.filter((variable) => variable.type == "Constant")
)