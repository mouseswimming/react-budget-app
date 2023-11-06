import { configureStore } from "@reduxjs/toolkit";
import budgetSlice from "./BudgetSlice";
import expenseSlice from "./ExpenseSlice";

const store = configureStore({
  reducer: {
    budgets: budgetSlice.reducer,
    expenses: expenseSlice.reducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
