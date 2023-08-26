import { 
    createSlice, 
    createAsyncThunk, 
    createEntityAdapter 
} from '@reduxjs/toolkit';

import { fetchModels } from '../api';
import { fetchVariablesForModelId } from './variablesReducer';

// Async thunk to load models
export const fetchModelsThunk = createAsyncThunk('models/fetch', async (userId) => {
    const response = await fetch(`http://127.0.0.1:80/models?user=${userId}`)
                            .then(response => response.json())
                            .catch(reason => {
                                console.log(`Model Fetch Failed: ${reason}`)
                            })
    return response
});
export const fetchModelWithVariables = createAsyncThunk(
    'models/fetchWithVariables', 
    async (modelId, { dispatch, getState }) => {
        const response = await fetch(`http://127.0.0.1:80/models/${modelId}`);
        return response.json();
});
export const selectModelAndLoadVariables = createAsyncThunk(
    'models/selectAndLoadVariables',
    async (modelId, { dispatch, getState }) => {
        const modelResponse = await dispatch(fetchModelWithVariables(modelId));
        if (fetchModelWithVariables.fulfilled.match(modelResponse)) {
            dispatch(selectModel(modelId));
        }
    }
);
export const runModel = createAsyncThunk('models/runModel', async (modelId) => {
    const response = await fetch(`/models/${modelId}/run`);
    return response.json();
});
  
const modelAdapter = createEntityAdapter();

export const modelSlice = createSlice({
    name: 'models',
    initialState: modelAdapter.getInitialState({ selectedModelId: null }),
    reducers: {
        modelAdded: modelAdapter.addOne,
        modelDeleted: modelAdapter.removeOne,
        modelEdited: modelAdapter.upsertOne,
        selectModel(state, action) {
            state.selectedModelId = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchModelsThunk.pending, (state, action) => {
            state.status = 'loading'
        })
        .addCase(fetchModelsThunk.fulfilled, (state, action) => {
            const models = action.payload
            modelAdapter.setAll(state, Object.values(models.entities))
            state.status = 'idle'
        });
        builder.addCase(fetchModelWithVariables.pending, (state, action) => {
            state.status = 'loading'
        })
        .addCase(fetchModelWithVariables.fulfilled, (state, action) => {
            modelAdapter.upsertOne(state, action.payload.model);
            state.status = 'idle'
        });
        builder.addCase(runModel.pending, (state, action) => {
            state.status = 'Running'
        })
        .addCase(runModel.fulfilled, (state, action) => {
            modelAdapter.upsertOne(state, action.payload.model);
            state.status = 'idle'
        });
        },
});

export const { 
    modelAdded, 
    modelDeleted,
    modelEdited,
    selectModel } = modelSlice.actions;

export const {
  selectAll: selectAllModels,
  selectById: selectModelById,
  selectIds: selectModelIds,
} = modelAdapter.getSelectors((state) => state.models);

export const selectSelectedModel = (state) => selectModelById(state, state.models.selectedModelId);

export default modelSlice.reducer;
