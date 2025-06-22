import { create } from "zustand";

export const useModalStore = create((set) => ({
  IsRegister: false,
  setIsRegister: (IsRegister) => set({ IsRegister }),

  AiResponse: null,
  setAiResponse: (AiResponse) => set({ AiResponse }),

  allData: null,
  setallData: (allData) => set({ allData }),

  detailData: "",
  setDetailData: (detailData) => set({ detailData }),

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

  otpModalVisible: false,
  setOtpModalVisible: (otpModalVisible) => set({ otpModalVisible }),

  showComments: false,
  setShowComments: (showComments) => set({ showComments }),

  searchingPending: false,
  setSearchPending: (searchingPending) => set({ searchingPending }),

  tabsSearchingPending: false,
  setTabsSearchingPending: (tabsSearchingPending) =>
    set({ tabsSearchingPending }),

  tabBarActive: false,
  setTabBarActive: (tabBarActive) => set({ tabBarActive }),
}));
