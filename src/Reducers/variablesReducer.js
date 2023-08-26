import {
    createSlice,
    createSelector,
    createAsyncThunk,
    createEntityAdapter
} from '@reduxjs/toolkit'

import { modelEdited, selectSelectedModel } from './modelsReducer';
import { fetchModelWithVariables } from './modelsReducer';

const variableAdapter = createEntityAdapter(); // This automatically adds some reducers and selectors for normalised data

const initialState = variableAdapter.getInitialState({
    status: 'idle',
    ids: [],
    entities: {}
})

// Thunk functions
export const createVariable = createAsyncThunk('variables/create', async (newVariable, { getState }) => {
    const state = getState();
    const modelId = state.models.selectedModelId; // Assuming you want to associate with the selected model
    const response = await fetch('/variables', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...newVariable, modelId: modelId }),
    });
    return response.json();
});
export const deleteVariable = createAsyncThunk('variables/delete', async (variableId, { getState }) => {
    const response = await fetch(`/variables/${variable.id}`, {
        method: 'DELETE',
    });
    return response.json();
});
export const editVariable = createAsyncThunk('variables/edit', async (updatedVariable) => {
    const response = await fetch(`/variables/${updatedVariable.id}`, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedVariable),
    });
    return response.json();
});

export const fetchVariablesForModelId = createAsyncThunk('variables/fetchForModelId', async (modelId, { getState }) => {
    const response = await fetch(`http://127.0.0.1:80/models/${modelId}/variables`)
                            .then(response => response.json())
                            .catch(reason => {
                                console.log(`Failed to fetch variables for model ${modelId}: ${reason}`)
                            })
    return response;
});
export const fetchVariablesForSelectedModel = createAsyncThunk('variables/fetchForSelectedModel', async (_, { getState }) => {
    const state = getState();
    const selectedModelId = state.models.selectedModelId; // Assuming you have selectedModelId in the model slice
    return fetchVariablesForModelId(selectedModelId)
});
export const fetchVariablesThunk = createAsyncThunk('variables/fetch', async (modelId) => {
    console.log("Loading data from API...");
    const response = await fetchModels()
        .then(response => response.json())
        .then(data => Object.values(data.models.entities))
    console.log("Data loaded.")
    return response
});


export const variableSlice = createSlice({
    name: 'variables',
    initialState: initialState,
    reducers: {
        variableAdded: variableAdapter.addOne,
        variableDeleted: variableAdapter.removeOne,
        variableEdited: variableAdapter.upsertOne,
        variableDisplayStatusUpdated(state, action) {
            const { variableId, displayStatus } = action.payload;
            state.entities[variableId] = {...state.entities[variableId], displayOnDashboard: displayStatus}
        }
    },
    extraReducers: builder => {
        builder.addCase(createVariable.fulfilled, (state, action) => {
            console.log('createVariable.fulfilled')
            variableAdapter.addOne(action.payload.variable);
            modelEdited(action.payload.model); // Need to update the model to include variable
        });
        builder.addCase(deleteVariable.fulfilled, (state, action) => {
            console.log('deleteVariable.fulfilled')
            variableDeleted(state, action.payload.variableId);
            modelEdited(action.payload.model)
        });
        builder.addCase(editVariable.fulfilled, (state, action) => {
            console.log('editVariable.fulfilled')
            variableAdapter.updateOne(state, {
                id: action.payload.id,
                changes: action.payload,
            });
            // variableEdited(action.payload.variable)
        });
        // builder.addCase(fetchVariablesForSelectedModel.fulfilled, (state, action) => {
        //     variableAdapter.setAll(state, action.payload);
        // });
        builder.addCase(fetchModelWithVariables.fulfilled, (state, action) => {
            console.log('fetchModelWithVariables')
            variableAdapter.setAll(state, action.payload.variables);
            state.status = 'idle'
        });
        builder.addCase(fetchVariablesForModelId.fulfilled, (state, action) => {
            console.log('fetchVariablesForModelId')
            variableAdapter.setAll(state, action.payload);
        });
          
    }
})

export const {
    variableAdded,
    variableDeleted,
    variableEdited,
    variableDisplayStatusUpdated,
 } = variableSlice.actions

// Selectors
export const {
    selectAll: selectAllVariables,
    selectById: selectVariableById,
} = variableAdapter.getSelectors((state) => state.variables)

export const selectVariablesByModelId = createSelector(
    (state) => state.variables.entities,
    (state, modelId) => modelId,
    (variables, modelId) => Object.values(variables).filter(variable => variable.modelId === modelId)
);
export const selectVariablesForSelectedModel = createSelector(
    (state) => state,
    (state) => state.models.selectedModelId,
    (state, selectedModelId) => selectVariablesByModelId(state, selectedModelId)
)

export const selectVariableIds = createSelector(
    selectAllVariables,
    (variables) => variables.map((variable) => variable.id)
)

export default variableSlice.reducer;