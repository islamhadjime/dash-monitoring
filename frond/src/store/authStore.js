import { create } from 'zustand'

export const useAuthStore = create((set) => ({
  isAuth: !!window.localStorage.getItem('token'),
  infog:{},
  loading: true,
  setIsAuth: (value) => set({ isAuth: value }),
  setInfog: (value) => set({ infog: value }),
  setLoading: (value) => set({ loading: value }),
}))