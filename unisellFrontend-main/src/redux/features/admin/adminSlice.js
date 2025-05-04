import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../api";

// Policy Management Thunks
export const fetchPolicies = createAsyncThunk(
  "admin/fetchPolicies",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/admin/policies");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updatePolicy = createAsyncThunk(
  "admin/updatePolicy",
  async ({ policyId, data }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/admin/policies/${policyId}`, data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Violation Management Thunks
export const fetchViolations = createAsyncThunk(
  "admin/fetchViolations",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/admin/violations");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const resolveViolation = createAsyncThunk(
  "admin/resolveViolation",
  async ({ violationId, action }, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `/admin/violations/${violationId}/action`,
        { action }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Report Management Thunks
export const fetchReports = createAsyncThunk(
  "admin/fetchReports",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/admin/reports");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const resolveReport = createAsyncThunk(
  "admin/resolveReport",
  async ({ reportId, action }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/admin/reports/${reportId}/resolve`, {
        action,
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Product Approval Thunks
export const fetchPendingProducts = createAsyncThunk(
  "admin/fetchPendingProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/admin/products/pending");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const approveProduct = createAsyncThunk(
  "admin/approveProduct",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await api.put(`/admin/products/${productId}/approve`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const rejectProduct = createAsyncThunk(
  "admin/rejectProduct",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await api.put(`/admin/products/${productId}/reject`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    policies: [],
    violations: [],
    reports: [],
    pendingProducts: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Policy Cases
      .addCase(fetchPolicies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPolicies.fulfilled, (state, action) => {
        state.loading = false;
        state.policies = action.payload;
      })
      .addCase(fetchPolicies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updatePolicy.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePolicy.fulfilled, (state, action) => {
        state.loading = false;
        state.policies = state.policies.map((policy) =>
          policy._id === action.payload._id ? action.payload : policy
        );
      })
      .addCase(updatePolicy.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Violation Cases
      .addCase(fetchViolations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchViolations.fulfilled, (state, action) => {
        state.loading = false;
        state.violations = action.payload;
      })
      .addCase(fetchViolations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(resolveViolation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resolveViolation.fulfilled, (state, action) => {
        state.loading = false;
        state.violations = state.violations.filter(
          (violation) => violation._id !== action.payload._id
        );
      })
      .addCase(resolveViolation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Product Approval Cases
      .addCase(fetchPendingProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPendingProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.pendingProducts = action.payload;
      })
      .addCase(fetchPendingProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(approveProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(approveProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.pendingProducts = state.pendingProducts.filter(
          (product) => product._id !== action.payload._id
        );
      })
      .addCase(approveProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(rejectProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(rejectProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.pendingProducts = state.pendingProducts.filter(
          (product) => product._id !== action.payload._id
        );
      })
      .addCase(rejectProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Report Cases
      .addCase(fetchReports.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReports.fulfilled, (state, action) => {
        state.loading = false;
        state.reports = action.payload;
      })
      .addCase(fetchReports.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(resolveReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resolveReport.fulfilled, (state, action) => {
        state.loading = false;
        state.reports = state.reports.filter(
          (report) => report._id !== action.payload._id
        );
      })
      .addCase(resolveReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default adminSlice.reducer;
