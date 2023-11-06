import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UNCATEGORIZED_BUDGET_ID } from "./BudgetSlice";

type Expense = {
  id: string;
  budgetId: string;
  amount: number;
  description: string;
};

type InitialState = {
  expenses: Expense[];
};

const jsonValue = localStorage.getItem("expenses");
const saveExpenseToLocalStorage = (expenses: Expense[]) => {
  localStorage.setItem("expenses", JSON.stringify(expenses));
};

const initialState: InitialState = {
  expenses: jsonValue ? JSON.parse(jsonValue) : [],
};

const expenseSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    addExpense: (state, action: PayloadAction<Expense>) => {
      const expense = action.payload;
      state.expenses = [...state.expenses, expense];

      saveExpenseToLocalStorage(state.expenses);
    },
    removeExpense: (state, action: PayloadAction<string>) => {
      state.expenses = state.expenses.filter(
        (expense) => expense.id !== action.payload
      );
      saveExpenseToLocalStorage(state.expenses);
    },
    removeCategoriedExpense: (state, action: PayloadAction<string>) => {
      const budgetId = action.payload;

      state.expenses = state.expenses.map((expense) => {
        if (expense.budgetId !== budgetId) {
          return expense;
        } else {
          return { ...expense, budgetId: UNCATEGORIZED_BUDGET_ID };
        }
      });
      saveExpenseToLocalStorage(state.expenses);
    },
  },
});

export default expenseSlice;
export const { addExpense, removeExpense, removeCategoriedExpense } =
  expenseSlice.actions;
