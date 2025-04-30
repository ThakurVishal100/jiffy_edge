// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// import { toast } from "react-toastify";
// import {jwtDecode} from "jwt-decode";


// export const fetchUsers = createAsyncThunk("users/fetchUsers", async (_, { rejectWithValue }) => {
//   try {
//     const token = localStorage.getItem("token"); 
//     if (!token) {
//       toast.error("Unauthorized! No token found.");
//       return rejectWithValue("Unauthorized! No token found.");  
//     }
//     console.log("Decoded Token:", decodedToken);

//     if (decodedToken.role !== "SYSTEM") {
//       toast.error("Access denied! Only SYSTEM users can fetch users.");
//       return rejectWithValue("Access denied! Only SYSTEM users can fetch users.");
//     }

//     const response = await axios.get("http://localhost:8080/api/v1/auth/users", {
//       headers: { Authorization: `Bearer ${token}` }, 
//     });

//     // console.log("API Response:", response.data); 

//     const formattedUsers = response.data.users.map((user) => ({
//       userId: user.userId,
//       name: user.name,
//       email: user.email,
//       userCategory: user.userCategory,
//       userStatus: user.status,
//     }));

//     return formattedUsers;
//   } catch (error) {
//     toast.error("Failed to fetch users!");
//     return rejectWithValue(error.message);
//   }
// });



// const userSlice = createSlice({
//   name: "users",
//   initialState: {
//     users: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     updateUserStatus: (state, action) => {
//       const { userId, newStatus } = action.payload;
//       const user = state.users.find((user) => user.userId === userId);
//       if (user) {
//         user.userStatus = newStatus;
//       }
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchUsers.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchUsers.fulfilled, (state, action) => {
//         state.loading = false;
//         state.users = action.payload;
//       })
//       .addCase(fetchUsers.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       });
//   },
// });

// export const { updateUserStatus } = userSlice.actions;
// export default userSlice.reducer;







import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  loading: false,
  error: null,
  activeContent: 'activity',
  dashboard: {
    totalUsers: 0,
    activeSessions: 0,
    totalActivities: 0,
    reportsGenerated: 0
  },
  reports: {
    generatedReports: [],
    lastGenerated: null
  },
  settings: {
    systemName: '',
    timeZone: 'UTC',
    twoFactorEnabled: false,
    autoLogout: false
  }
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setActiveContent: (state, action) => {
      state.activeContent = action.payload;
    },
    setDashboardData: (state, action) => {
      state.dashboard = { ...state.dashboard, ...action.payload };
    },
    setReportsData: (state, action) => {
      state.reports = { ...state.reports, ...action.payload };
    },
    setSettingsData: (state, action) => {
      state.settings = { ...state.settings, ...action.payload };
    },
    logout:()=> initialState,
  }
});

export const { 
  setUsers, 
  setLoading, 
  setError, 
  setActiveContent,
  setDashboardData,
  setReportsData,
  setSettingsData ,
  logout
} = userSlice.actions;

export default userSlice.reducer;