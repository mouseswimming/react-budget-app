import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type Budget = {
  id: string;
  name: string;
  max: number;
};

type InitialState = {
  budgets: Budget[];
};

const jsonValue = localStorage.getItem("budgets");
const saveBudgetToLocalStorage = (budgets: Budget[]) => {
  localStorage.setItem("budgets", JSON.stringify(budgets));
};

const initialState: InitialState = {
  budgets: jsonValue ? JSON.parse(jsonValue) : [],
};

const budgetSlice = createSlice({
  name: "budgets",
  initialState,
  reducers: {
    addBudget: (state, action: PayloadAction<Budget>) => {
      const newBudget = action.payload;

      const budget = state.budgets.find(
        (budget) => budget.name.toLowerCase() === newBudget.name.toLowerCase()
      );

      if (budget) {
        state.budgets = state.budgets.map((budget) => {
          if (budget.name.toLowerCase() === newBudget.name.toLowerCase()) {
            return { ...budget, max: newBudget.max };
          } else {
            return budget;
          }
        });
      } else {
        state.budgets = [...state.budgets, newBudget];
      }

      saveBudgetToLocalStorage(state.budgets);
    },
    removeBudget: (state, action: PayloadAction<string>) => {
      const budgetId = action.payload;

      // uncategoried budget can't be eleted
      state.budgets = state.budgets.filter((budget) => budget.id !== budgetId);
      saveBudgetToLocalStorage(state.budgets);
    },
  },
});

export default budgetSlice;
export const { addBudget, removeBudget } = budgetSlice.actions;
export const UNCATEGORIZED_BUDGET_ID = "Uncategorized";
