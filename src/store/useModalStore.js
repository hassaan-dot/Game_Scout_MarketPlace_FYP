import { create } from "zustand";

export const useModalStore = create((set) => ({
  IsRegister: false,
  setIsRegister: (IsRegister) => set({ IsRegister }),

  AiResponse: null,
  setAiResponse: (AiResponse) => set({ AiResponse }),

  allData: null,
  setallData: (allData) => set({ allData }),

  isSearching: false,
  setIsSearching: (isSearching) => set({ isSearching }),

  searchIndex: 1,
  setSearchIndex: (searchIndex) => set({ searchIndex }),

  searchingInput: null,
  setSearchingInput: (searchingInput) => set({ searchingInput }),

  mutateVariable: false,
  setMutateVariable: (mutateVariable) => set({ mutateVariable }),

  editActive: false,
  setEditActive: (editActive) => set({ editActive }),

  editData: "",
  setEditData: (editData) => set({ editData }),

  searchBarActive: false,
  setSearchBarActive: (searchBarActive) => set({ searchBarActive }),
}));
