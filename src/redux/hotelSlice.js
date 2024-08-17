import { createSlice } from "@reduxjs/toolkit";

const hotelSlice = createSlice( {
    name: "hotels",
    initialState: {
        hotels: {
            hotel: null,
            isFetching: false,
            error: false
        },

    },
    reducers: {
        hotelsStart: (state) => {
            state.hotels.isFetching = true;
        },
        hotelsSuccess: (state,action) => {
            state.hotels.isFetching = false;
            state.hotels.hotel = action.payload;
            state.hotels.error = false
        },
        hotelsFailed: (state) => {
            state.hotels.isFetching = false;
            state.hotels.error = true;
        },
 
    }
});
export const {
  hotelsFailed,hotelsStart,hotelsSuccess
} = hotelSlice.actions;

export default hotelSlice.reducer