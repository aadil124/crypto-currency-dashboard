import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = "https://api.coingecko.com/api/v3";

export const fetchCryptoData = createAsyncThunk(
  "crypto/fetchCryptoData",
  async (cryptoId) => {
    const [current, historical, overview] = await Promise.all([
      axios.get(
        `${API_BASE_URL}/simple/price?ids=${cryptoId}&vs_currencies=usd&include_24hr_change=true`
      ),
      axios.get(
        `${API_BASE_URL}/coins/${cryptoId}/market_chart?vs_currency=usd&days=7`
      ),
      axios.get(`${API_BASE_URL}/coins/${cryptoId}`),
    ]);
    return {
      current: current.data[cryptoId],
      historical: historical.data.prices,
      overview: overview.data,
    };
  }
);

const cryptoSlice = createSlice({
  name: "crypto",
  initialState: {
    selectedCrypto: "bitcoin",
    currentData: null,
    historicalData: [],
    overviewData: null,
    status: "idle",
  },
  reducers: {
    setSelectedCrypto: (state, action) => {
      state.selectedCrypto = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCryptoData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCryptoData.fulfilled, (state, action) => {
        state.currentData = action.payload.current;
        state.historicalData = action.payload.historical;
        state.overviewData = action.payload.overview;
        state.status = "succeeded";
      })
      .addCase(fetchCryptoData.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { setSelectedCrypto } = cryptoSlice.actions;
export default cryptoSlice.reducer;
