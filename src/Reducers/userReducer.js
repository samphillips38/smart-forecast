import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';

// Async thunk to load user
export const fetchUser = createAsyncThunk('user/fetch', async (userId) => {
  const response = await fetch(`/user?user=${userId}`);
  return response.json();
});

const userInitialState = {id:0, models: [0, 1, 2]}

export const userSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    selectUser: (state, action) => {
      state.selectedUserId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
        state = action.payload
    });
  },
});

export const { selectUser } = userSlice.actions;

export default userSlice.reducer;
