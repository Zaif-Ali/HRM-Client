import { IUserState } from '@/types/redux/user';
import { createSlice } from '@reduxjs/toolkit';

const initialState: IUserState = {
  user: {
    name: 'Huzaifa Majeed',
    email: 'zaifali785@gmail.com',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=3569&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    priority: 1,
  },
};

export const requestSlice = createSlice({
  name: 'request',
  initialState,
  reducers: {},
});

export const requestActions = requestSlice.actions;
export default requestSlice.reducer;
