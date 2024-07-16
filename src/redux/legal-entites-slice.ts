import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { LegalEntitiesServices } from '@/services/legal-entities-services/legal-entities-service';
import { ILegalEntitiesItem } from '@/modules/settings/legal-entities/models';

export interface LegalEntiteData {
  Id: number;
  Voen: number;
  Name: string;
  Address: string;
  Mobile: string;
  Phone: string;
  Email: string;
  Token: string;
  StatusId: number;
  StatusName: string;
  CreatedAt: string;
}

interface SettingState {
  data: ILegalEntitiesItem[] | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: any;
}

const initialState: SettingState = {
  data: null,
  status: 'idle',
  error: null
};

// Async thunk for fetching legalEntities data
export const fetchLegalEntitiesData = createAsyncThunk(
  'setting/fetchLegalEntitiesData',
  async () => {
    const response = await LegalEntitiesServices.getInstance().legalEntities();
    return response?.Data;
  }
);

const legalEntitesSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    setSetting: (state, action: PayloadAction<LegalEntiteData[]>) => {
      state.data = action.payload;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchLegalEntitiesData.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchLegalEntitiesData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchLegalEntitiesData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error;
      });
  }
});

// Export the reducer and actions
export const { setSetting } = legalEntitesSlice.actions;
export default legalEntitesSlice.reducer;
