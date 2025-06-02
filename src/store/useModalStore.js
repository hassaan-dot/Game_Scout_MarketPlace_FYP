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
}));
