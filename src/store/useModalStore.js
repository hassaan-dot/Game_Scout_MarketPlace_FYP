import { create } from "zustand";

export const useModalStore = create((set) => ({
  IsRegister: false,
  setIsRegister: (IsRegister) => set({ IsRegister }),

  AiResponse: "",
  setAiResponse: (AiResponse) => set({ AiResponse }),

  allData: "",
  setallData: (allData) => set({ allData }),
}));
