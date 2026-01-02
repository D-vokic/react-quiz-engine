import { create } from "zustand";

import { uiSlice } from "./slices/uiSlice";
import { settingsSlice } from "./slices/settingsSlice";
import { quizSlice } from "./slices/quizSlice";
import { statsSlice } from "./slices/statsSlice";

export const useQuizStore = create((set, get) => ({
  ...uiSlice(set, get),
  ...settingsSlice(set, get),
  ...quizSlice(set, get),
  ...statsSlice(set, get),
}));
